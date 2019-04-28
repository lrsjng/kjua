const {resolve, join} = require('path');
const {ghu, jszip, mapfn, pug, read, remove, uglify, webpack, wrap, write} = require('ghu');

const NAME = 'kjua';

const ROOT = resolve(__dirname);
const SRC = join(ROOT, 'src');
const BUILD = join(ROOT, 'build');
const DIST = join(ROOT, 'dist');

ghu.defaults('release');

ghu.before(runtime => {
    runtime.pkg = Object.assign({}, require('./package.json'));
    runtime.comment = `${NAME} v${runtime.pkg.version} - ${runtime.pkg.homepage}`;
    runtime.commentJs = `/*! ${runtime.comment} */\n`;
    console.log(runtime.comment);
});

ghu.task('clean', () => {
    return remove(`${BUILD}, ${DIST}`);
});

ghu.task('build:script', runtime => {
    return read(`${SRC}/${NAME}.js`)
        .then(webpack(webpack.cfg_umd(NAME, [SRC])))
        .then(uglify())
        .then(wrap(runtime.commentJs))
        .then(write(`${DIST}/${NAME}.min.js`, {overwrite: true}))
        .then(write(`${BUILD}/${NAME}-${runtime.pkg.version}.min.js`, {overwrite: true}));
});

ghu.task('build:other', runtime => {
    const mapper = mapfn.p(SRC, BUILD).s('.pug', '');
    return Promise.all([
        read(`${ROOT}/*.md`)
            .then(write(mapfn.p(ROOT, BUILD), {overwrite: true})),

        read(`${SRC}/demo/*.pug`)
            .then(pug({pkg: runtime.pkg}))
            .then(write(mapper, {overwrite: true})),
        read(`${SRC}/demo: *, !*.pug`)
            .then(write(mapper, {overwrite: true})),

        read(`${SRC}/test/*.pug`)
            .then(pug({pkg: runtime.pkg}))
            .then(write(mapper, {overwrite: true})),
        read(`${SRC}/test/*.js`)
            .then(webpack(webpack.cfg([SRC])))
            .then(write(mapper, {overwrite: true}))
    ]);
});

ghu.task('build', ['build:script', 'build:other']);

ghu.task('zip', ['build'], runtime => {
    return read(`${BUILD}/**`)
        .then(jszip({dir: BUILD, level: 9}))
        .then(write(`${BUILD}/${NAME}-${runtime.pkg.version}.zip`, {overwrite: true}));
});

ghu.task('release', ['clean', 'zip']);
