# draw-noise

Draw the output of a noise function on node-canvas and save it as a PNG!

![Noise image](https://unpkg.com/draw-noise@1.0.1/images/noise.png)

## Installation

```bash
$ yarn add draw-noise

# Or, if you're old-school...

$ npm install --save draw-noise
```

## Usage

```js
const drawNoise = require('draw-noise')
const { Simplex2 } = require('tumult')
const path = require('path')

const simplex = new Simplex2('seed')
const filename = path.join(__dirname, './myimage.png')

drawNoise((x, y) => simplex.gen(x / 32, y / 32), {
  width: 400
  height: 400
  filename
})
```

## API

#### drawNoise(noiseFn, options)

* noiseFn: A noise function with a range of [-1, 1]. **Required**
* options:
  * width: The width of the image, in pixels. Defaults to `100px`
  * height: The height of the image, in pixels. Defaults to `100px`
  * filename: The filename of the image. Can be an absolute or relative path. Defaults to `./noise.png`
