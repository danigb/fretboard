
function Fretboard () {}

var DEFAULTS = {
  width: 300,
  height: 150,
  stringCount: 6,
  fretCount: 5,
  color: '#70B7FD'
}

Fretboard.init = function (canvas, fretboard) {
  if (Array.isArray(fretboard)) return Fretboard.init(canvas, { notes: fretboard })
  var fb = fretboard ? Object.assign({}, DEFAULTS, fretboard) : DEFAULTS
  calcFretboard(fb)
  console.log(fb)

  var ctx = canvas.getContext('2d')
  canvas.width = fb.width
  canvas.height = fb.height
  ctx.clearRect(0, 0, fb.width, fb.height)

  drawStrings(ctx, fb)
  drawFrets(ctx, fb)
  if (fb.notes) drawNotes(ctx, fb)
}

function calcFretboard (fb) {
  if (fb.notes) {
    fb.stringCount = fb.notes.length
    if (fb.stringCount) fb.fretCount = fb.notes[0].length
  }

  fb.stringDist = fb.height / fb.stringCount
  fb.marginY = Math.floor(fb.stringDist / 2)
  fb.fretSize = fb.width / fb.fretCount
  fb.colorNames = fb.noteColors ? Object.keys(fb.noteColors) : []
}

function drawNotes (ctx, fb) {
  var note, x, y
  var r = Math.floor(fb.stringDist / 2)
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  for (var s = 0; s < fb.stringCount; s++) {
    for (var f = 0; f < fb.fretCount; f++) {
      note = fb.notes[s][f]
      if (note) {
        x = f * fb.fretSize + fb.fretSize / 2
        y = s * fb.stringDist + fb.marginY
        ctx.fillStyle = getNoteColor(note, fb)
        drawCircle(ctx, x, y, r)
        ctx.fillStyle = '#000'
        ctx.fillText(note, x, y)
      }
    }
  }
}

function getNoteColor (note, fb) {
  if (!fb.colorNames.length) return fb.color
  for (var i = 0; i < fb.colorNames.length; i++) {
    var name = fb.colorNames[i]
    if (note.indexOf(name) === 0) return fb.noteColors[name]
  }
  return fb.color
}

function drawStrings (ctx, fb) {
  for (var i = 0; i < fb.stringCount; i++) {
    var y = i * fb.stringDist + 0.5 + fb.marginY
    drawLine(ctx, 0, y, fb.width, y)
  }
}

function drawFrets (ctx, fb) {
  for (var n = 0; n < fb.fretCount; n++) {
    var x = n * fb.fretSize + 0.5
    drawLine(ctx, x, fb.marginY, x, fb.height - fb.marginY)
  }
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
  ctx.stroke()
  ctx.closePath()
}

if (typeof module === 'object' && module.exports) module.exports = Fretboard
if (typeof window !== 'undefined') window.Fretboard = Fretboard
