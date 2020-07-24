const {create_svg_el, set_attr} = require('./dom');

const wrap_ctx = ctx => {
    const rnd = x => Math.round(x * 10) / 10;
    return {
        m(x, y) {ctx.p += `M ${rnd(x)} ${rnd(y)} `; return this;},
        l(x, y) {ctx.p += `L ${rnd(x)} ${rnd(y)} `; return this;},
        a(x, y, rad) {ctx.p += `A ${rnd(rad)} ${rnd(rad)} 0 0 1 ${rnd(x)} ${rnd(y)} `; return this;}
    };
};

const draw_dark = (ctx, l, t, r, b, rad, nw, ne, se, sw) => {
    if (nw) {
        ctx.m(l + rad, t);
    } else {
        ctx.m(l, t);
    }

    if (ne) {
        ctx.l(r - rad, t).a(r, t + rad, rad);
    } else {
        ctx.l(r, t);
    }

    if (se) {
        ctx.l(r, b - rad).a(r - rad, b, rad);
    } else {
        ctx.l(r, b);
    }

    if (sw) {
        ctx.l(l + rad, b).a(l, b - rad, rad);
    } else {
        ctx.l(l, b);
    }

    if (nw) {
        ctx.l(l, t + rad).a(l + rad, t, rad);
    } else {
        ctx.l(l, t);
    }
};

const draw_light = (ctx, l, t, r, b, rad, nw, ne, se, sw) => {
    if (nw) {
        ctx.m(l + rad, t).l(l, t).l(l, t + rad).a(l + rad, t, rad);
    }

    if (ne) {
        ctx.m(r, t + rad).l(r, t).l(r - rad, t).a(r, t + rad, rad);
    }

    if (se) {
        ctx.m(r - rad, b).l(r, b).l(r, b - rad).a(r - rad, b, rad);
    }

    if (sw) {
        ctx.m(l, b - rad).l(l, b).l(l + rad, b).a(l, b - rad, rad);
    }
};

const draw_mod = (qr, ctx, settings, width, row, col) => {
    const left = col * width;
    const top = row * width;
    const right = left + width;
    const bottom = top + width;
    const radius = settings.rounded * 0.005 * width;

    const is_dark = qr.is_dark;
    const row_n = row - 1;
    const row_s = row + 1;
    const col_w = col - 1;
    const col_e = col + 1;
    const dark_center = is_dark(row, col);
    const dark_nw = is_dark(row_n, col_w);
    const dark_n = is_dark(row_n, col);
    const dark_ne = is_dark(row_n, col_e);
    const dark_e = is_dark(row, col_e);
    const dark_se = is_dark(row_s, col_e);
    const dark_s = is_dark(row_s, col);
    const dark_sw = is_dark(row_s, col_w);
    const dark_w = is_dark(row, col_w);

    ctx = wrap_ctx(ctx);

    if (dark_center) {
        draw_dark(ctx, left, top, right, bottom, radius, !dark_n && !dark_w, !dark_n && !dark_e, !dark_s && !dark_e, !dark_s && !dark_w);
    } else {
        draw_light(ctx, left, top, right, bottom, radius, dark_n && dark_w && dark_nw, dark_n && dark_e && dark_ne, dark_s && dark_e && dark_se, dark_s && dark_w && dark_sw);
    }
};

const draw_modules = (qr, ctx, settings) => {
    if (!qr) {
        return;
    }

    const mod_count = qr.module_count;
    const mod_size = settings.size / mod_count;

    for (let row = 0; row < mod_count; row += 1) {
        for (let col = 0; col < mod_count; col += 1) {
            draw_mod(qr, ctx, settings, mod_size, row, col);
        }
    }
};

const create_svg_qrcode = (qr, settings) => {
    const ctx = {p: ''};

    draw_modules(qr, ctx, settings);
    // draw_mode(ctx, settings);

    const size = settings.size;
    const svg_el = create_svg_el('svg');
    set_attr(svg_el, 'xmlns', 'http://www.w3.org/2000/svg');
    set_attr(svg_el, 'width', size);
    set_attr(svg_el, 'height', size);
    set_attr(svg_el, 'viewBox', `0 0 ${size} ${size}`);
    svg_el.style.width = `${size}px`;
    svg_el.style.height = `${size}px`;

    const rect_el = create_svg_el('rect');
    set_attr(rect_el, 'x', 0);
    set_attr(rect_el, 'y', 0);
    set_attr(rect_el, 'width', size);
    set_attr(rect_el, 'height', size);
    set_attr(rect_el, 'fill', settings.back);
    svg_el.appendChild(rect_el);

    const path_el = create_svg_el('path');
    set_attr(path_el, 'd', ctx.p);
    set_attr(path_el, 'fill', settings.fill);
    svg_el.appendChild(path_el);

    return svg_el;
};

module.exports = create_svg_qrcode;
