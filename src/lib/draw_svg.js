const draw_svg = (svgText, settings) => {
    const container = document.createElement("div");
    container.innerHTML = svgText;
    // Rect --> background-color
    if (!!settings.back) {
        container.children.item(0).children.item(0).setAttribute("fill", settings.back);
    }
    // Path --> foreground-color
    if (!!settings.fill) {
        container.children.item(0).children.item(1).setAttribute("fill", settings.fill);
    }
    return container.children.item(0);
};

module.exports = draw_svg;
