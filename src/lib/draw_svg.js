const {create_canvas, calc_image_pos} = require('./dom');
const SVGJS = require("svg.js");

const draw_svg = (svgText, settings) => {
    const container = document.createElement("div");
    container.innerHTML = svgText;
    const svgElem = container.firstChild;
    const svg = SVGJS(svgElem);

    // In crisp mode, it is possible that the SVG is not exactly 400px --> fix this
    if (settings.crisp) {
        svg.attr("width", settings.size + "px");
        svg.attr("height", settings.size + "px");
        svg.attr("viewBox", "0 0 " + settings.size + " " + settings.size);
    }
    // Rect --> background-color
    if (!!settings.back) {
        svg.select("rect").fill(settings.back);
    }
    // Path --> foreground-color
    if (!!settings.fill) {
        svg.select("path").fill(settings.fill);
    }
    if (settings.mode === "label") {
        const rect = calc_text_pos(settings);
        const label = svg.text(add => {
            add.tspan(settings.label);

        });
        label.x(rect.x);
        label.y(rect.y);
        label.attr("fill", settings.fontcolor);
        label.attr("font-family", settings.fontname);
        label.attr("font-size", settings.mSize * 0.01 * settings.size + "px");
        // Outline-effect
        if (settings.fontoutline) {
            // TODO
        }
    } else if (settings.mode === "image") {
        const imgPos = calc_image_pos(settings);
        const image = svg.image(settings.image.getAttribute("src"), imgPos.iw, imgPos.ih);
        image.x(imgPos.x);
        image.y(imgPos.y);
    }
    return svgElem;
};

const calc_text_pos = (settings) => {
    const context = create_canvas(settings);

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
