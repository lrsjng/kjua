const win = window; // eslint-disable-line no-undef
const doc = win.document;
const dpr = win.devicePixelRatio || 1;

const SVG_NS = 'http://www.w3.org/2000/svg';

const get_attr = (el, key) => el.getAttribute(key);
const set_attrs = (el, obj) => {
    Object.keys(obj || {}).forEach(key => {
        el.setAttribute(key, obj[key]);
    });
    return el;
};

const create_el = (name, obj) => set_attrs(doc.createElement(name), obj);
const create_svg_el = (name, obj) => set_attrs(doc.createElementNS(SVG_NS, name), obj);

const create_canvas = (size, ratio) => {
    const canvas = create_el('canvas', {
        width: size * ratio,
        height: size * ratio
    });
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    return canvas;
};

const canvas_to_img = canvas => {
    const img = create_el('img', {
        crossOrigin: 'anonymous',
        src: canvas.toDataURL('image/png'),
        width: get_attr(canvas, 'width'),
        height: get_attr(canvas, 'height')
    });
    img.style.width = canvas.style.width;
    img.style.height = canvas.style.height;
    return img;
};

module.exports = {
    dpr,
    SVG_NS,
    get_attr,
    create_el,
    create_svg_el,
    create_canvas,
    canvas_to_img
};
