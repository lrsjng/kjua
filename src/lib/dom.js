const win = global.window;
const doc = win.document;
const dpr = win.devicePixelRatio || 1;
const get_attr = (el, key) => el.getAttribute(key);
const set_attr = (el, key, value) => el.setAttribute(key, value);

const create_canvas = (settings) => {
    const ratio = settings.ratio || dpr;
    const canvas = doc.createElement('canvas');
    set_attr(canvas, 'width', settings.size * ratio);
    set_attr(canvas, 'height', settings.size * ratio);
    canvas.style.width = `${settings.size}px`;
    canvas.style.height = `${settings.size}px`;
    const context = canvas.getContext('2d');
    context.scale(ratio, ratio);
    return context;
};

const canvas_to_img = (canvas, settings) => {
    const img = doc.createElement('img');
    set_attr(img, 'crossorigin', 'anonymous');
    set_attr(img, 'src', canvas.toDataURL('image/png'));
    set_attr(img, 'width', get_attr(canvas, 'width'));
    set_attr(img, 'height', get_attr(canvas, 'height'));
    set_attr(img, 'alt', settings.text);
    img.style.width = canvas.style.width;
    img.style.height = canvas.style.height;
    return img;
};

const calc_image_pos = (settings) => {
    const size = settings.size;
    const w = settings.image.naturalWidth || 1;
    const h = settings.image.naturalHeight || 1;
    const sh = settings.mSize * 0.01;
    const sw = sh * w / h;
    const sl = (1 - sw) * settings.mPosX * 0.01;
    const st = (1 - sh) * settings.mPosY * 0.01;
    const x = sl * size;
    const y = st * size;
    const iw = sw * size;
    const ih = sh * size;
    return {x, y, iw, ih};
};

const calc_label_pos = (ctx, settings) => {
    const font = 'bold ' + settings.mSize * 0.01 * settings.size + 'px ' + settings.fontname;
    ctx.lineWidth = settings.mSize * 0.01 * settings.size * 0.1;
    ctx.font = font;

    const w = ctx.measureText(settings.label).width;
    const sh = settings.mSize * 0.01;
    const sw = w / settings.size;
    const sl = (1 - sw) * settings.mPosX * 0.01;
    const st = (1 - sh) * settings.mPosY * 0.01;
    const x = sl * settings.size;
    const y = st * settings.size + 0.75 * settings.mSize * 0.01 * settings.size;
    return {x, y};
};

module.exports = {
    create_canvas,
    canvas_to_img,
    calc_image_pos,
    calc_label_pos
};
