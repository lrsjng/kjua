const {create_canvas, dpr, calc_image_pos} = require('./dom');

const draw_svg = (svgText, settings) => {
    const container = document.createElement("div");
    container.innerHTML = svgText;
    const svgElem = container.children.item(0);
    const rectElem = svgElem.children.item(0);
    const pathElem = svgElem.children.item(1);

    svgElem.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");

    // In crisp mode, it is possible that the SVG is not exactly 400px --> fix this
    if (settings.crisp) {
        svgElem.setAttribute("width", settings.size + "px");
        svgElem.setAttribute("height", settings.size + "px");
        svgElem.setAttribute("viewBox", "0 0 " + settings.size + " " + settings.size);
    }
    // Rect --> background-color
    if (!!settings.back) {
        rectElem.setAttribute("fill", settings.back);
    }
    // Path --> foreground-color
    if (!!settings.fill) {
        pathElem.setAttribute("fill", settings.fill);
    }
    if (settings.mode === "label") {
        const textElem = document.createElementNS("http://www.w3.org/2000/svg", "text");
        const tspanElem = document.createElementNS(null, "tspan");
        tspanElem.textContent = settings.label;

        const rect = calc_text_pos(settings);
        tspanElem.setAttributeNS(null, "x", rect.x.toString());
        tspanElem.setAttributeNS(null, "y", rect.y.toString());
        textElem.setAttributeNS(null, "fill", settings.fontcolor);
        textElem.setAttributeNS(null, "font-family", settings.fontname);
        textElem.setAttributeNS(null, "font-size", settings.mSize * 0.01 * settings.size + "px");
        textElem.appendChild(tspanElem);
        svgElem.appendChild(textElem);
    } else if (settings.mode === "image") {
        const imageElem = document.createElementNS(null, "image");
        const imagePos = calc_image_pos(settings);
        imageElem.setAttributeNS(null, "width", imagePos.iw);
        imageElem.setAttributeNS(null, "height", imagePos.ih);
        imageElem.setAttributeNS(null, "x", imagePos.x);
        imageElem.setAttributeNS(null, "y", imagePos.y);
        imageElem.setAttribute("xlink:href", settings.image.getAttribute("src"));
        svgElem.appendChild(imageElem);
    }
    return svgElem;
};

const calc_text_pos = (settings) => {
    const ratio = settings.ratio || dpr;
    const canvas = create_canvas(settings.size, ratio);
    const context = canvas.getContext('2d');
    context.scale(ratio, ratio);

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
    return {x, y};
};

module.exports = draw_svg;
