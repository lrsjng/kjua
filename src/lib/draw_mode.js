const {calc_image_pos} = require('./dom');

const draw_label = (ctx, settings) => {
    const size = settings.size;
    const font = 'bold ' + settings.mSize * 0.01 * size + 'px ' + settings.fontname;

    ctx.strokeStyle = settings.back;
    ctx.lineWidth = settings.mSize * 0.01 * size * 0.1;
    ctx.fillStyle = settings.fontcolor;
    ctx.font = font;

    const w = ctx.measureText(settings.label).width;
    const sh = settings.mSize * 0.01;
    const sw = w / size;
    const sl = (1 - sw) * settings.mPosX * 0.01;
    const st = (1 - sh) * settings.mPosY * 0.01;
    const x = sl * size;
    const y = st * size + 0.75 * settings.mSize * 0.01 * size;

    ctx.strokeText(settings.label, x, y);
    ctx.fillText(settings.label, x, y);
};

const draw_image = (ctx, ctx2, settings) => {
    const imagePos = calc_image_pos(settings);
    if (settings.imageAsCode && !!ctx2) {
        ctx2.globalCompositeOperation = "source-in";
        ctx2.drawImage(settings.image, imagePos.x, imagePos.y, imagePos.iw, imagePos.ih);
        ctx.drawImage(ctx2.canvas, 0, 0, settings.size, settings.size);
    } else {
        ctx.drawImage(settings.image, imagePos.x, imagePos.y, imagePos.iw, imagePos.ih);
    }
};

const draw_mode = (ctx, ctx2, settings) => {
    const mode = settings.mode;
    if (mode === 'label') {
        draw_label(ctx, settings);
    } else if (mode === 'image') {
        draw_image(ctx, ctx2, settings);
    }
};

module.exports = draw_mode;
