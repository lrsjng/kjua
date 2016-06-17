const win = window; // eslint-disable-line no-undef
const doc = win.document;
const dpr = win.devicePixelRatio || 1;
const create = name => doc.createElement(name);
const getAttr = (el, key) => el.getAttribute(key);
const setAttr = (el, key, value) => el.setAttribute(key, value);

const createCanvas = (size, ratio) => {
    const canvas = create('canvas');
    setAttr(canvas, 'width', size * ratio);
    setAttr(canvas, 'height', size * ratio);
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    return canvas;
};

const canvasToImg = canvas => {
    const img = create('img');
    setAttr(img, 'crossorigin', 'anonymous');
    setAttr(img, 'src', canvas.toDataURL('image/png'));
    setAttr(img, 'width', getAttr(canvas, 'width'));
    setAttr(img, 'height', getAttr(canvas, 'height'));
    img.style.width = canvas.style.width;
    img.style.height = canvas.style.height;
    return img;
};

module.exports = {
    createCanvas,
    canvasToImg,
    dpr
};
