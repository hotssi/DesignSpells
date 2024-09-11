const { registerFont, createCanvas } = require('canvas')
const fs = require('fs')

async function textEffect (fontPath, effect, text, imageCachePath) {
  // Define canvas dimensions
  const width = 360
  const height = 200
  const canvas = createCanvas(width, height)
  const ctx = canvas.getContext('2d')

  // Register custom font
  registerFont(fontPath, { family: 'MyCustomFont' })

  // Set background color (optional)
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, width, height)

  // Set text properties based on effects
  const fontStyle = 'normal'
  let fontWeight = 'normal'
  let textShadow = ''

  if (effect.includes('bold')) {
    fontWeight = 'bold'
  }
  if (effect.includes('shadow')) {
    textShadow = '2px 2px 4px rgba(0, 0, 0, 0.5)'
  }

  ctx.font = `${fontStyle} ${fontWeight} 48px MyCustomFont`
  ctx.fillStyle = '#000000'

  if (textShadow) {
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)'
    ctx.shadowOffsetX = 2
    ctx.shadowOffsetY = 2
    ctx.shadowBlur = 4
  }

  // Draw text
  ctx.fillText(text, 50, 100)

  // Save the image to a buffer
  const buffer = canvas.toBuffer('image/png')

  // Optionally save the image to a file for inspection
  fs.writeFileSync(imageCachePath, buffer)

  return buffer
}

module.exports = textEffect
