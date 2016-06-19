// use BEEFY: beefy example/test1
// http://perfectionkills.com/exploring-canvas-drawing-techniques/
var frets = require('tonal-fretboard')

var canvas = document.createElement('canvas')
document.body.appendChild(canvas)

draw(canvas)

function draw (canvas) {
  var strings = frets.build('guitar', 1, 6)
  var ctx = canvas.getContext('2d')
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = '#000'
  ctx.strokeStyle = '#000'

  var stringDist = canvas.height / strings.length
  var margin = Math.floor(stringDist / 2)
  for (var i = 0; i < strings.length; i++) {
    var y = i * stringDist + 0.5 + margin
    drawLine(ctx, 0, y, canvas.width, y)
  }

  var fretsCount = strings[0].length
  var fretSize = canvas.width / fretsCount
  for (var n = 0; n < fretsCount; n++) {
    var x = n * fretSize + 0.5
    drawLine(ctx, x, margin, x, canvas.height - margin)
  }

  var r = Math.floor(stringDist / 2)
  console.log('rad', r, fretSize)
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  strings.forEach(function (string, i) {
    string.forEach(function (note, fret) {
      var x = fret * fretSize + fretSize / 2
      var y = i * stringDist + margin
      ctx.fillStyle = '#efefef'
      drawCircle(ctx, x, y, r)
      ctx.fillStyle = '#000'
      ctx.fillText(note, x, y)
    })
  })
}

function drawCircle (ctx, x, y, r) {
  ctx.beginPath()
  ctx.arc(x, y, r, 0, Math.PI * 2)
  ctx.fill()
}

function drawLine (ctx, x1, y1, x2, y2) {
  ctx.beginPath()
  ctx.moveTo(x1, y1)
  ctx.lineTo(x2, y2)
  ctx.lineWidth = 1
  ctx.stroke()
  ctx.closePath()
}
