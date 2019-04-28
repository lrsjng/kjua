const {test, assert} = require('scar');
const WIN = global.window;
const kjua = WIN.kjua;

test('global access', () => {
    assert.equal(kjua, global.kjua);
    assert.equal(kjua, WIN.kjua);
    assert.equal(typeof kjua, 'function');
});

test('returns image element', () => {
    const res = kjua();
    assert.ok(res instanceof WIN.HTMLElement);
    assert.equal(res.tagName.toUpperCase(), 'IMG');
});

test('returns canvas element', () => {
    const res = kjua({render: 'canvas'});
    assert.ok(res instanceof WIN.HTMLElement);
    assert.equal(res.tagName.toUpperCase(), 'CANVAS');
});

test.cli();
