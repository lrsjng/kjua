const defaults = require('./lib/defaults');
const qrcode = require('./lib/qrcode');
const create_canvas_qrcode = require('./lib/create_canvas_qrcode');
const create_svg_qrcode = require('./lib/create_svg_qrcode');

module.exports = options => {
    const settings = Object.assign({}, defaults, options);
    const qr = qrcode(settings.text, settings.ecLevel, settings.minVersion, settings.quiet);

    if (settings.render === 'canvas') {
        return create_canvas_qrcode(qr, settings, false);
    } else if (settings.render === 'image') {
        return create_canvas_qrcode(qr, settings, true);
    } else if (settings.render === 'svg') {
        return create_svg_qrcode(qr, settings);
    }

    return null;
};
