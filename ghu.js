const {resolve, join} = require('path');
const {ghu, includeit, jszip, mapfn, pug, read, remove, uglify, webpack, wrap, write} = require('ghu');

const NAME = 'kjua';

const ROOT = resolve(__dirname);
const SRC = join(ROOT, 'src');
const DEMO = join(SRC, 'demo');
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
    const webpackConfig = {
        mode: 'none',
        output: {
            library: NAME,
            libraryTarget: 'umd',
            umdNamedDefine: true,
            globalObject: '(typeof self !== \'undefined\' ? self : this)'
        },
        module: {
            rules: [
                {
                    include: [SRC],
                    loader: 'babel-loader',
                    query: {
                        cacheDirectory: true,
                        presets: ['@babel/preset-env']
                    }
                }
            ]
        }
    };

    return read(`${SRC}/${NAME}.js`)
        .then(webpack(webpackConfig, {showStats: false}))
        .then(includeit())
        .then(uglify())
        .then(wrap(runtime.commentJs))
        .then(write(`${DIST}/${NAME}.min.js`, {overwrite: true}))
        .then(write(`${BUILD}/${NAME}-${runtime.pkg.version}.min.js`, {overwrite: true}));
});

ghu.task('build:copy', () => {
    return read(`${ROOT}/*.md`)
        .then(write(mapfn.p(ROOT, BUILD), {overwrite: true}));
});

ghu.task('build:demo', runtime => {
    return Promise.all([
        read(`${DEMO}/*.pug`)
            .then(pug({pkg: runtime.pkg}))
            .then(write(mapfn.p(SRC, BUILD).s('.pug', ''), {overwrite: true})),
        read(`${DEMO}: *, !*.pug`)
            .then(write(mapfn.p(SRC, BUILD), {overwrite: true}))
    ]);
});

ghu.task('build', ['build:script', 'build:copy', 'build:demo']);

ghu.task('zip', ['build'], runtime => {
    return read(`${BUILD}/**`)
        .then(jszip({dir: BUILD, level: 9}))
        .then(write(`${BUILD}/${NAME}-${runtime.pkg.version}.zip`, {overwrite: true}));
});

ghu.task('release', ['clean', 'zip']);
