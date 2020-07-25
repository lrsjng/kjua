const {SVG_NS, get_attr, create_svg_el} = require('./dom');

const create_draw_ctx = ctx => {
    const rnd = x => Math.round(x * 10) / 10;
    const rndo = x => Math.round(x * 10) / 10 + ctx.o;
    return {
        m(x, y) {ctx.p += `M ${rndo(x)} ${rndo(y)} `; return this;},
        l(x, y) {ctx.p += `L ${rndo(x)} ${rndo(y)} `; return this;},
        a(x, y, rad) {ctx.p += `A ${rnd(rad)} ${rnd(rad)} 0 0 1 ${rndo(x)} ${rndo(y)} `; return this;}
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

    if (dark_center) {
        draw_dark(ctx, left, top, right, bottom, radius, !dark_n && !dark_w, !dark_n && !dark_e, !dark_s && !dark_e, !dark_s && !dark_w);
    } else {
        draw_light(ctx, left, top, right, bottom, radius, dark_n && dark_w && dark_nw, dark_n && dark_e && dark_ne, dark_s && dark_e && dark_se, dark_s && dark_w && dark_sw);
    }
};

const create_path = (qr, settings) => {
    if (!qr) {
        return '';
    }

    const ctx = {p: '', o: 0};
    const mod_count = qr.module_count;
    let mod_size = settings.size / mod_count;
    if (settings.crisp) {
        mod_size = Math.floor(mod_size);
        ctx.o = Math.floor((settings.size - mod_size * mod_count) / 2);
    }

    const draw_ctx = create_draw_ctx(ctx);
    for (let row = 0; row < mod_count; row += 1) {
        for (let col = 0; col < mod_count; col += 1) {
            draw_mod(qr, draw_ctx, settings, mod_size, row, col);
        }
    }

    return ctx.p;
};

const add_label = (el, settings) => {
    const size = settings.size;
    const font = 'bold ' + settings.mSize * 0.01 * size + 'px ' + settings.fontname;

    const dom = require('./dom');
    const ratio = settings.ratio || dom.dpr;
    const ctx = dom.create_canvas(size, ratio).getContext('2d');
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

    const text_el = create_svg_el('text', {
        x,
        y
    });
    Object.assign(text_el.style, {
        font,
        fill: settings.fontcolor,
        'paint-order': 'stroke',
        stroke: settings.back,
        'stroke-width': ctx.lineWidth
    });

    text_el.textContent = settings.label;
    el.appendChild(text_el);
};

const add_image = (el, settings) => {
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

    const img_el = create_svg_el('image', {
        href: get_attr(settings.image, 'src'),
        x,
        y,
        width: iw,
        height: ih
    });
    el.appendChild(img_el);
};

const create_svg_qrcode = (qr, settings) => {
    const size = settings.size;
    const mode = settings.mode;

    const svg_el = create_svg_el('svg', {
        xmlns: SVG_NS,
        width: size,
        height: size,
        viewBox: `0 0 ${size} ${size}`
    });
    svg_el.style.width = `${size}px`;
    svg_el.style.height = `${size}px`;

    if (settings.back) {
        svg_el.appendChild(create_svg_el('rect', {
            x: 0,
            y: 0,
            width: size,
            height: size,
            fill: settings.back
        }));
    }

    svg_el.appendChild(create_svg_el('path', {
        d: create_path(qr, settings),
        fill: settings.fill
    }));

    if (mode === 'label') {
        add_label(svg_el, settings);
    } else if (mode === 'image') {
        add_image(svg_el, settings);
    }

    return svg_el;
};

module.exports = create_svg_qrcode;
