
function Fretboard () {}

Fretboard.init = function (canvas, fn) {
  var desc = DEFAULTS
  var ctx = canvas.getContext('2d')
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}

var DEFAULTS = {
  strings: ['E', 'A', 'D', 'G', 'B', 'E']
  range
}

if (typeof module === 'object' && module.exports) module.exports = Fretboard
if (typeof window !== 'undefined') window.Fretboard = Fretboard
