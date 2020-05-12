[![NPM version](https://img.shields.io/npm/v/kjua-svg.svg?&label=npm)](https://www.npmjs.com/package/kjua-svg) 
[![Dependency Status](https://david-dm.org/werthdavid/kjua-svg.svg)](https://david-dm.org/werthdavid/kjua-svg)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com) 
[![Downloads](https://img.shields.io/npm/dm/kjua-svg.svg)](https://npmjs.org/package/kjua-svg)
<img align="right" width="150px" src="https://raw.githubusercontent.com/werthdavid/kjua/master/docs/readme-logo.svg"/>

If you find my work useful you can buy me a coffee, I am very thankful for your support. 

<a href="https://www.buymeacoffee.com/werthdavid" target="_blank"><img width="140" src="https://bmc-cdn.nyc3.digitaloceanspaces.com/BMC-button-images/custom_images/orange_img.png" alt="Buy Me A Coffee"></a>


# kjua-svg

Dynamically generated QR codes for modern browsers.  
Uses [kjua](https://github.com/lrsjng/kjua) and
[QR Code Generator](https://github.com/kazuhikoarase/qrcode-generator) (MIT).

If you are looking for a solutions to generate QR Codes with Angular, you can look into [ngx-kjua](https://github.com/werthdavid/ngx-kjua).

# Demo

<img src="https://raw.githubusercontent.com/werthdavid/kjua/master/docs/demo.png"/>

Click [here](https://werthdavid.github.io/kjua/)

# Usage

```javascript
  const code = kjua(options);
  document.getElementById("container").appendChild(code);
```

## Options

### Crisp

As you can set the size of the image, the amount of 'modules' (black/white boxes that make up the QR-code) is calculated based on the size and the amount of `quiet` modules. The calculation can result in an odd number so that a module is e.g. 4.5 pixels big. The resulting image will be drawn fuzzy if `crisp` is set to false. Setting it to `true` will result in 'sharp' lines.

#### crisp false
<img src="https://raw.githubusercontent.com/werthdavid/kjua/master/docs/no-crisp.jpg"/>

#### crisp true
<img src="https://raw.githubusercontent.com/werthdavid/kjua/master/docs/crisp.jpg"/>


### Label
Kjua lets you embed a text or image to the code. This can be set with the setting `mode`.
This can reduce the readability of the code!

### Image
<img src="https://raw.githubusercontent.com/werthdavid/kjua/master/docs/image.png"/>

### Image as Code
<img src="https://raw.githubusercontent.com/werthdavid/kjua/master/docs/image-as-code.png"/>


### All options

* `text` encoded content (defaults to ``)
* `render` render-mode: 'image', 'canvas', 'svg' (defaults to `image`)
* `crisp` render pixel-perfect lines (defaults to `true`)
* `minVersion` minimum version: 1..40 (defaults to `1`)
* `ecLevel` error correction level: 'L', 'M', 'Q' or 'H' (defaults to `L`)
* `size` size in pixel (defaults to `200`)
* `fill` code color (defaults to `#333`)
* `back` background color (defaults to `#fff`, for transparent use `''` or `null`)
* `rounded` roundend corners in pc: 0..100 (defaults to `0`, not working if `render`is set to `svg`)
* `quiet` quiet zone in modules (defaults to `0`)
* `mode` modes: 'plain', 'label' or 'image' (defaults to `plain`, set `label` or `image` property if you change this)
* `mSize` label/image size in pc: 0..100 (defaults to `30`)
* `mPosX` label/image pos x in pc: 0..100 (defaults to `50`)
* `mPosY` label/image pos y in pc: 0..100 (defaults to `50`)
* `label` additional label text (defaults to ``)
* `fontname` font for additional label text (defaults to `sans-serif`)
* `fontcolor` font-color for additional label text (defaults to `#333`)
* `fontoutline` draw an outline on the label text in the color of the `back` (defaults to `true`)
* `image` additional image (defaults to `undefined`, use an HTMLImageElement or base64-string)
* `imageAsCode` draw the image as part of the code (defaults to `false`)

More details can be found on [larsjung.de/kjua](https://larsjung.de/kjua/)

## Differences to kjua

* possibility to render QR-codes as SVG
* transparent background support
* image can be provided as base64-string
* Typescript-types
* draw the image as part of the code --> `imageAsCode`

## Limitations

Some options do not work when the code is rendered as SVG. These are:
* rounded
