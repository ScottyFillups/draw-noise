const drawNoise = require('../')
const { Simplex2 } = require('tumult')
const { expect } = require('chai')
const { promisify } = require('util')
const sizeOf = promisify(require('image-size'))
const path = require('path')

describe('Drawing and saving noise with draw-noise', function () {
  const simplexFns = [
    new Simplex2('seed'),
    new Simplex2('another one'),
    new Simplex2('1v1 me in duck game'),
    new Simplex2('Shiggy diggy doo')
  ].map(obj => (x, y) => obj.gen(x / 32, y / 32))

  it('creates a 100 x 100 image named noise.png by default', function () {
    drawNoise(simplexFns[0])

    sizeOf('./noise.png').then(({ width, height }) => {
      expect(width).to.equal(100)
      expect(height).to.equal(100)
    }).catch((err) => {
      expect.fail('No error should be thrown')
    })
  })

  it('can take an array of functions for each RGBA channel', function () {
    const filename = path.join(__dirname, './noiseRGBA.png')

    drawNoise(simplexFns, { filename })

    sizeOf('./noiseRGBA.png').then(({ width, height }) => {
      expect(width).to.equal(100)
      expect(height).to.equal(100)
    }).catch((err) => {
      expect.fail('No error should be thrown')
    })
  })

  it('takes and uses a configuration object', function () {
    const filename = path.join(__dirname, './noise1.png')

    drawNoise(simplexFns[1], {
      width: 1000,
      height: 300,
      filename
    })

    sizeOf(filename).then(({ width, height }) => {
      expect(width).to.equal(1000)
      expect(height).to.equal(500)
    }).catch((err) => {
      expect.fail('No error should be thrown')
    })
  })
})
