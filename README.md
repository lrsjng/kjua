# kjua

[![license][license-img]][github] [![github][github-img]][github] [![npm][npm-img]][npm]  

Dynamically generated QR codes for modern browsers.  
Uses [QR Code Generator][qrcode] (MIT).

Choose between rendering the code as `canvas`, `img` or `svg`. The generated QR code will be in the least possible version requiered to encode the content (least number of blocks). Takes care of device pixel ratio to render crisp codes on all devices. Works in all modern browsers.

<!-- See a #[a(href='latest/demo/', title='demo of the latest version') demo] to get a first impression. -->

## Usage

The syntax is simple. Use global method `kjua` to create a fresh `canvas`, `img` or `svg` element displaying the QR code and add it to your page. For example:
```js
var el = kjua({text: 'hello!'});
document.querySelector('body').appendChild(el);
```

## jQuery

A jQuery plugin is included, you can use it like
```js
$('#my_container').kjua({text: 'Hello'});
```

## Options

The available options and their default values are:
```js
{
    // render method: 'canvas', 'image' or 'svg'
    render: 'image',

    // render pixel-perfect lines
    crisp: true,

    // minimum version: 1..40
    minVersion: 1,

    // error correction level: 'L', 'M', 'Q' or 'H'
    ecLevel: 'L',

    // size in pixel
    size: 200,

    // pixel-ratio, null for devicePixelRatio
    ratio: null,

    // code color
    fill: '#333',

    // background color
    back: '#fff',

    // content
    text: 'no text',

    // roundend corners in pc: 0..100
    rounded: 0,

    // quiet zone in modules
    quiet: 0,

    // modes: 'plain', 'label' or 'image'
    mode: 'plain',

    // label/image size and pos in pc: 0..100
    mSize: 30,
    mPosX: 50,
    mPosY: 50,

    // label
    label: 'no label',
    fontname: 'sans',
    fontcolor: '#333',

    // image element
    image: null
}
```


## License
The MIT License (MIT)

Copyright (c) 2024 Lars Jung (https://larsjung.de)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.


[github]: https://github.com/lrsjng/kjua
[npm]: https://www.npmjs.org/package/kjua

[license-img]: https://img.shields.io/badge/license-MIT-a0a060.svg?style=flat-square
[github-img]: https://img.shields.io/badge/github-lrsjng/kjua-a0a060.svg?style=flat-square
[npm-img]: https://img.shields.io/badge/npm-kjua-a0a060.svg?style=flat-square

[qrcode]: https://github.com/kazuhikoarase/qrcode-generator
