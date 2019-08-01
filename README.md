[![NPM version](https://img.shields.io/npm/v/kjua-svg.svg?&label=npm)](https://www.npmjs.com/package/kjua-svg) 
[![Dependency Status](https://david-dm.org/werthdavid/kjua-svg.svg)](https://david-dm.org/werthdavid/kjua-svg)
[![Downloads](https://img.shields.io/npm/dm/kjua-svg.svg)](https://npmjs.org/package/kjua-svg)

<img align="right" src="https://raw.githubusercontent.com/werthdavid/ngx-kjua/master/docs/readme-logo.png"/>

# kjua-svg

Dynamically generated QR codes for modern browsers.  
Uses [QR Code Generator][qrcode] (MIT).

# Demo

<img src="https://raw.githubusercontent.com/werthdavid/kjua/master/docs/demo.png"/>

Click [here](https://werthdavid.github.io/kjua/)

# Usage

```javascript
  const code = kjua(options);
  document.getElementById("container").appendChild(code);
```

## Options

* `text` encoded content (defaults to ``)
* `render` render-mode: 'image', 'canvas', 'svg' (defaults to `image`)
* `crisp` render pixel-perfect lines (defaults to `true`)
* `minVersion` minimum version: 1..40(defaults to `1`)
* `ecLevel` error correction level: 'L', 'M', 'Q' or 'H' (defaults to `L`)
* `size` size in pixel (defaults to `200`)
* `fill` code color (defaults to `#333`)
* `back` background color (defaults to `#fff`)
* `rounded` roundend corners in pc: 0..100 (defaults to `0`, not working if `render`is set to 'svg')
* `quiet` quiet zone in modules (defaults to `0`)
* `mode` modes: 'plain', 'label' or 'image' (defaults to `plain`, set `label` or `image` property if you change this)
* `mSize` label/image size in pc: 0..100 (defaults to `30`)
* `mPosX` label/image pos x in pc: 0..100 (defaults to `50`)
* `mPosY` label/image pos y in pc: 0..100 (defaults to `50`)
* `label` additional label text (defaults to ``)
* `fontname` font for additional label text (defaults to `sans-serif`)
* `fontcolor` font-color for additional label text (defaults to `#333`)
* `image` additional image (defaults to `undefined`, use an HTMLImageElement)

More details can be found on [larsjung.de/kjua](https://larsjung.de/kjua/)

## Differences to kjua

This is basically just a fork of kjua that adds the possibility to render QR-codes as SVG.

## Limitations

Some options do not work when the code is rendered as SVG. These are:
* rounded
