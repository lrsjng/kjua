const drawModuleRounded = require('./drawRounded');
const drawMode = require('./drawMode');

const drawBackground = (context, settings) => {
    context.fillStyle = settings.back;
    context.fillRect(0, 0, settings.size, settings.size);
};

const drawModuleDefault = (qr, context, settings, width, row, col) => {
    if (qr.isDark(row, col)) {
        context.rect(col * width, row * width, width, width);
    }
};

const drawModules = (qr, context, settings) => {
    if (!qr) {
        return;
    }

    const drawModule = settings.rounded > 0 && settings.rounded <= 100 ? drawModuleRounded : drawModuleDefault;
    const moduleCount = qr.moduleCount;

    let moduleSize = settings.size / moduleCount;
    let offset = 0;
    if (settings.crisp) {
        moduleSize = Math.floor(moduleSize);
        offset = Math.floor((settings.size - moduleSize * moduleCount) / 2);
    }

    context.translate(offset, offset);
    context.beginPath();
    for (let row = 0; row < moduleCount; row += 1) {
        for (let col = 0; col < moduleCount; col += 1) {
            drawModule(qr, context, settings, moduleSize, row, col);
        }
    }
    context.fillStyle = settings.fill;
    context.fill();
    context.translate(-offset, -offset);
};

const draw = (qr, context, settings) => {
    drawBackground(context, settings);
    drawModules(qr, context, settings);
    drawMode(context, settings);
};

module.exports = draw;
