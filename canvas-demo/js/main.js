var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')

autoCanvasSize(canvas)



var eraserEnabled = false

var tool = document.getElementById('tool')
tool.onclick = function() {
  eraserEnabled = !eraserEnabled
  console.log(eraserEnabled)
  eraserEnabled ? tool.className = "tool eraserEnabled" : tool.className = 'tool'
}

listenToMouse(canvas)
  /*****************/
function autoCanvasSize(canvas) {
  setCanvasSize()
  window.onresize = function() {
    setCanvasSize()
  }

  function setCanvasSize() {
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight

    canvas.width = pageWidth
    canvas.height = pageHeight
  }
}


function drawCircle(x, y, radius) {
  ctx.beginPath()
  ctx.arc(x, y, 1, 0, radius)
  ctx.fill()
}

function drawLine(x1, y1, x2, y2, size) {
  ctx.beginPath();
  ctx.moveTo(x1, y1)
  ctx.strokeStyle = "black";
  ctx.lineWidth = size
  ctx.lineTo(x2, y2)
  ctx.stroke();

  ctx.closePath()
}

function listenToMouse(canvas) {
  var mouseOn = false
  var lastPoint = {
    x: undefined,
    y: undefined
  }

  canvas.onmousedown = function(mouse) {
    var x = mouse.clientX
    var y = mouse.clientY

    lastPoint.x = x
    lastPoint.y = y

    mouseOn = true
    if (eraserEnabled) {
      ctx.clearRect(x - 10, y - 10, 20, 20)
      var eraserSmall = document.getElementById('eraserSmall')
      eraserSmall.className = "eraserSmall"
      eraserSmall.style.left = x + "px"
      eraserSmall.style.top = y + "px"
    } else {
      drawCircle(x, y, Math.PI * 2)
    }


  }

  canvas.onmousemove = function(mouse) {
    var x = mouse.clientX
    var y = mouse.clientY

    var newPoint = {
      x: x,
      y: y
    }

    if (mouseOn) {
      if (eraserEnabled) {
        ctx.clearRect(x - 5, y - 5, 10, 10)
        var eraserSmall = document.getElementById('eraserSmall')
        eraserSmall.style.left = x + "px"
        eraserSmall.style.top = y + "px"
      } else {
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y, 1)
        lastPoint = newPoint
      }

    }

  }
  canvas.onmouseup = function() {
    mouseOn = false
    eraserSmall.className = ""
  }
}