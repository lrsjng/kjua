const drawLabel = (context, settings) => {
    const size = settings.size;
    const font = 'bold ' + settings.mSize * 0.01 * size + 'px ' + settings.fontname;

    context.strokeStyle = settings.back;
    context.lineWidth = settings.mSize * 0.01 * size * 0.1;
    context.fillStyle = settings.fontcolor;
    context.font = font;

    const w = context.measureText(settings.label).width;
    const sh = settings.mSize * 0.01;
    const sw = w / size;
    const sl = (1 - sw) * settings.mPosX * 0.01;
    const st = (1 - sh) * settings.mPosY * 0.01;
    const x = sl * size;
    const y = st * size + 0.75 * settings.mSize * 0.01 * size;

    context.strokeText(settings.label, x, y);
    context.fillText(settings.label, x, y);
};

const drawImage = (context, settings) => {
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

    context.drawImage(settings.image, x, y, iw, ih);
};

const drawMode = (context, settings) => {
    const mode = settings.mode;
    if (mode === 'label') {
        drawLabel(context, settings);
    } else if (mode === 'image') {
        drawImage(context, settings);
    }
};

module.exports = drawMode;
