const Canvas = require('canvas')
const noisify = require('noise-canvas')
const fs = require('fs')

function drawNoise (noiseFn, options = {}) {
  const width = options.width || 100
  const height = options.height || 100
  const filename = options.filename || './noise.png'

  const canvas = new Canvas(width, height)

  noisify(canvas, noiseFn, {
    ImageData: Canvas.ImageData
  })

  canvas.createPNGStream().pipe(fs.createWriteStream(filename))
}

module.exports = drawNoise
