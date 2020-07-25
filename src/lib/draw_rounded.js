const create_draw_ctx = ctx => {
    return {
        m(x, y) {ctx.moveTo(x, y); return this;},
        l(x, y) {ctx.lineTo(x, y); return this;},
        a(...args) {ctx.arcTo(...args); return this;}
    };
};

const draw_dark = (ctx, l, t, r, b, rad, nw, ne, se, sw) => {
    if (nw) {
        ctx.m(l + rad, t);
    } else {
        ctx.m(l, t);
    }

    if (ne) {
        ctx.l(r - rad, t).a(r, t, r, b, rad);
    } else {
        ctx.l(r, t);
    }

    if (se) {
        ctx.l(r, b - rad).a(r, b, l, b, rad);
    } else {
        ctx.l(r, b);
    }

    if (sw) {
        ctx.l(l + rad, b).a(l, b, l, t, rad);
    } else {
        ctx.l(l, b);
    }

    if (nw) {
        ctx.l(l, t + rad).a(l, t, r, t, rad);
    } else {
        ctx.l(l, t);
    }
};

const draw_light = (ctx, l, t, r, b, rad, nw, ne, se, sw) => {
    if (nw) {
        ctx.m(l + rad, t).l(l, t).l(l, t + rad).a(l, t, l + rad, t, rad);
    }

    if (ne) {
        ctx.m(r - rad, t).l(r, t).l(r, t + rad).a(r, t, r - rad, t, rad);
    }

    if (se) {
        ctx.m(r - rad, b).l(r, b).l(r, b - rad).a(r, b, r - rad, b, rad);
    }

    if (sw) {
        ctx.m(l + rad, b).l(l, b).l(l, b - rad).a(l, b, l + rad, b, rad);
    }
};

const draw_module_rounded = (qr, ctx, settings, width, row, col) => {
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

    const draw_ctx = create_draw_ctx(ctx);
    if (dark_center) {
        draw_dark(draw_ctx, left, top, right, bottom, radius, !dark_n && !dark_w, !dark_n && !dark_e, !dark_s && !dark_e, !dark_s && !dark_w);
    } else {
        draw_light(draw_ctx, left, top, right, bottom, radius, dark_n && dark_w && dark_nw, dark_n && dark_e && dark_ne, dark_s && dark_e && dark_se, dark_s && dark_w && dark_sw);
    }
};

module.exports = draw_module_rounded;
