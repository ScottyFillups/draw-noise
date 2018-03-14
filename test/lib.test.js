const drawNoise = require('../')
const { Simplex2 } = require('tumult')
const { expect } = require('chai')
const { promisify } = require('util')
const sizeOf = promisify(require('image-size'))
const path = require('path')

describe('Drawing and saving noise with draw-noise', function () {
  const simplex = new Simplex2('seed')

  it('creates a 100 x 100 image named noise.png by default', function () {
    drawNoise((x, y) => simplex.gen(x / 32, y / 32))

    sizeOf('./noise.png').then(({ width, height }) => {
      expect(width).to.equal(100)
      expect(height).to.equal(100)
    }).catch((err) => {
      expect.fail('No error should be thrown')
    })
  })

  it('takes and uses a configuration object', function () {
    const filename = path.join(__dirname, './noise1.png')

    drawNoise((x, y) => simplex.gen(x / 128, y / 128), {
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
