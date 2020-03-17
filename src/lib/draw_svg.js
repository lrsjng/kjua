const {create_canvas, calc_image_pos, calc_label_pos, canvas_to_img} = require('./dom');
const {SVG, registerWindow} = require('@svgdotjs/svg.js')

const draw_svg = (qr, settings) => {
    // CHECK does this make problems with server-side rendering?
    registerWindow(window, document);
    const svgText = qr.svgText;
    const container = document.createElement("div");
    container.innerHTML = svgText;
    const svgElem = container.firstChild;
    const svg = SVG(svgElem);

    // In crisp mode, it is possible that the SVG is not exactly 400px --> fix this
    if (settings.crisp) {
        svg.attr("width", settings.size + "px");
        svg.attr("height", settings.size + "px");
        svg.attr("viewBox", "0 0 " + settings.size + " " + settings.size);
    }
    // Rect --> background-color
    if (!settings.back || settings.back === '') {
        svg.findOne("rect").remove();
    } else {
        svg.find("rect").fill(settings.back);
    }
    // Path --> foreground-color
    if (!!settings.fill) {
        svg.find("path").fill(settings.fill);
    }
    if (settings.mode === "label") {
        const ctx = create_canvas(settings);
        const labelPos = calc_label_pos(ctx, settings);
        const label = svg.text(add => {
            add.tspan(settings.label);
        });
        label.x(labelPos.x);
        label.y(labelPos.y - 14);
        label.attr("fill", settings.fontcolor);
        label.attr("font-family", settings.fontname);
        label.attr("font-weight", "bold");
        label.attr("font-size", settings.mSize * 0.01 * settings.size + "px");
        // Outline-effect
        if (settings.fontoutline) {
            label.attr("paint-order", "stroke");
            label.attr("stroke-width", settings.mSize * 0.01 * settings.size * 0.1);
            if (!settings.back || settings.back === '') {
                label.attr("stroke", "#ffffff");
            } else {
                label.attr("stroke", settings.back);
            }
        }
    } else if (settings.mode === "image") {
        if (settings.imageAsCode) {
            const image = canvas_to_img(settings.image, settings);
            const svgImage = svg.image(image.getAttribute("src"));
            svgImage.attr("width", settings.size + "px");
            svgImage.attr("height", settings.size + "px");
            svgImage.x(0);
            svgImage.y(0);
        } else {
            const imgPos = calc_image_pos(settings);
            const svgImage = svg.image(settings.image.getAttribute("src"));
            svgImage.attr("width", imgPos.iw + "px");
            svgImage.attr("height", imgPos.ih + "px");
            svgImage.x(imgPos.x);
            svgImage.y(imgPos.y);
        }
    }
    return svgElem;
};

module.exports = draw_svg;
