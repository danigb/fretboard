// use BEEFY: beefy example/test1
// http://perfectionkills.com/exploring-canvas-drawing-techniques/
var frets = require('tonal-fretboard')
var Fretboard = require('..')

var canvas = document.createElement('canvas')
document.body.appendChild(canvas)

Fretboard.init(canvas, {
  notes: frets.scale('guitar', 'C D E F G A B', 1, 6),
  colors: { 'C': 'orange' }
})
