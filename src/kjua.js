const defaults = require('./lib/defaults');
const qrcode = require('./lib/qrcode');
const {draw, draw_modules} = require('./lib/draw');
const draw_svg = require('./lib/draw_svg');
const {create_canvas, calc_image_pos} = require('./lib/dom');

module.exports = options => {
    let settings = Object.assign({}, defaults, options);
    const qr = qrcode(settings.text, settings.ecLevel, settings.minVersion, settings.quiet, settings);

    if (settings.mode === 'image' && !!settings.image) {
        if (typeof settings.image === 'string') {
            const image = new Image();
            image.src = 'data:image/png;base64,' + settings.image;
            settings.image = image;
        }
        if (settings.imageAsCode) {
            const ctx2 = create_canvas(settings);
            draw_modules(qr, ctx2, settings);
            ctx2.globalCompositeOperation = "source-in";
            const imagePos = calc_image_pos(settings);
            ctx2.drawImage(settings.image, imagePos.x, imagePos.y, imagePos.iw, imagePos.ih);
            settings = Object.assign({}, settings, {image: ctx2.canvas});
        }
    }

    if (settings.render === 'svg') {
        return draw_svg(qr, settings);
    } else {
        return draw(qr, settings);
    }
};
