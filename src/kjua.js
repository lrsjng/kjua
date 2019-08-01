const {create_canvas, canvas_to_img, dpr} = require('./lib/dom');
const defaults = require('./lib/defaults');
const qrcode = require('./lib/qrcode');
const draw = require('./lib/draw');
const draw_svg = require('./lib/draw_svg');

module.exports = options => {
    const settings = Object.assign({}, defaults, options);

    if (settings.mode === 'image' && !!settings.image && typeof settings.image === 'string') {
        const image = new Image();
        image.src = 'data:image/png;base64,' + settings.image;
        settings.image = image;
    }

    const qr = qrcode(settings.text, settings.ecLevel, settings.minVersion, settings.quiet, settings);

    // In SVG-render mode we can return here
    if (settings.render === 'svg') {
        return draw_svg(qr.svgText, settings);
    }

    const ratio = settings.ratio || dpr;
    const canvas = create_canvas(settings.size, ratio);
    const context = canvas.getContext('2d');

    context.scale(ratio, ratio);
    draw(qr, context, settings);

    return settings.render === 'image' ? canvas_to_img(canvas) : canvas;
};
