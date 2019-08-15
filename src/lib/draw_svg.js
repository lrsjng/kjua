const {create_canvas, calc_image_pos, calc_label_pos, canvas_to_img} = require('./dom');
const SVGJS = require("svg.js");

const draw_svg = (qr, settings) => {
    const svgText = qr.svgText;
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
        const ctx = create_canvas(settings);
        const rect = calc_label_pos(ctx, settings);
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
        if (settings.imageAsCode) {
            const image = canvas_to_img(settings.image);
            const svgImage = svg.image(image.getAttribute("src"), settings.size, settings.size);
            svgImage.x(0);
            svgImage.y(0);
        } else {
            const imgPos = calc_image_pos(settings);
            const svgImage = svg.image(settings.image.getAttribute("src"), imgPos.iw, imgPos.ih);
            svgImage.x(imgPos.x);
            svgImage.y(imgPos.y);
        }
    }
    return svgElem;
};

module.exports = draw_svg;
