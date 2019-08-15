const {calc_image_pos, calc_label_pos} = require('./dom');

const draw_label = (ctx, settings) => {
    const labelPos = calc_label_pos(ctx, settings);
    ctx.fillStyle = settings.fontcolor;
    if (settings.fontoutline) {
        if (!settings.back || settings.back === '') {
            ctx.strokeStyle = "#ffffff";
        } else {
            ctx.strokeStyle = settings.back;
        }
        ctx.strokeText(settings.label, labelPos.x, labelPos.y);
    }
    ctx.fillText(settings.label, labelPos.x, labelPos.y);
};

const draw_image = (ctx, settings) => {
    const imagePos = calc_image_pos(settings);
    if (settings.imageAsCode) {
        ctx.drawImage(settings.image, 0, 0, settings.size, settings.size);
    } else {
        ctx.drawImage(settings.image, imagePos.x, imagePos.y, imagePos.iw, imagePos.ih);
    }
};

const draw_mode = (ctx, settings) => {
    const mode = settings.mode;
    if (mode === 'label') {
        draw_label(ctx, settings);
    } else if (mode === 'image') {
        draw_image(ctx, settings);
    }
};

module.exports = draw_mode;
