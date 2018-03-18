// document.ontouchstart = function(e){ 
//     e.preventDefault(); 
// }
var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')
// ctx.fillStyle = "black"
// ctx.fillRect(0,0,canvas.width,canvas.height);
var brushSize = 5;
canvasColor = "black"

autoCanvasSize(canvas)



var eraserEnabled = false //是否启用橡皮擦

var eraserWrap = document.getElementById('eraserWrap')
var brushWrap = document.getElementById('brushWrap')
var colorsWrap = document.getElementById('colorsWrap')
var trash = document.getElementById('trash')
var download = document.getElementById('download')

eraserWrap.onclick = function () {
    eraserEnabled = true
    eraserWrap.classList.add('eraserActive')
}


brushWrap.onclick = function () {
    eraserEnabled = false
    eraserWrap.classList.remove('eraserActive')
    var brushes = document.getElementById('brushes')
    // var brushCurrentSize = document.getElementById('brushCurrentSize')
    brushWrap.classList.toggle('brushActive')

    brushes.onclick = function (e) {
        // e.stopPropagation() //阻止冒泡事件，否则会触发上一层的onclick

        var target = e.target
        var id = target.id
        for (var i = 0; i < this.children.length; i++) {
            if (target.tagName !== "UL") {
                if (target !== this.children[i]) {            
                    this.children[i].classList.remove('active')
                    // currentColor.classList.remove(this.children[i].classList[0])
                } else {
                    // currentColor.classList.add(this.children[i].classList[0])
                    this.children[i].classList.add('active')
                    // colorsWrap.classList.toggle('colorActive')
                }
            } else {
               
            }

        }
        //设置笔触大小
        switch (id) {
            case "thin":
                brushSize = 1;
                break;
            case "nomal":
                brushSize = 5;
                break;
            case "thick":
                brushSize = 10;
                break;
        }

    }
}
colorsWrap.onclick = function (e) {
    e.stopPropagation()
    console.log(1)
    var colors = document.getElementById('colors')
    // var currentColor = document.getElementById('currentColor')
    colorsWrap.classList.toggle('colorActive')

    colors.onclick = function (e) {
        console.log(2)
        // e.stopPropagation();
        //阻止冒泡事件，否则会触发上一层的onclick
        eraserEnabled = false
        eraserWrap.classList.remove('eraserActive')
        var target = e.target
        var id = target.id

        for (var i = 0; i < this.children.length; i++) {
            if (target.tagName !== "UL") {
                if (target !== this.children[i]) {            
                    this.children[i].classList.remove('active')
                    // currentColor.classList.remove(this.children[i].classList[0])
                } else {
                    // currentColor.classList.add(this.children[i].classList[0])
                    this.children[i].classList.add('active')
                    // colorsWrap.classList.toggle('colorActive')
                }
            } else {
               
            }

        }
        switch (id) {
            case "black":
                canvasColor = "black"
                break;
            case "pink":
                canvasColor = "pink"
                break;
            case "yellow":
                canvasColor = "yellow"
                break;
        }
        // e.stopPropagation();
    }
}
trash.onclick = function(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}
download.onclick = function(){
    var url = canvas.toDataURL("image/png")
    var title = prompt('请输入名称(ios不支持下载)')
    // console.log(url)
    var a = document.createElement('a')
    document.body.appendChild(a)
    a.href = url
    a.download = title
    a.click()
}
listenToMouse(canvas)


/*****************/
function autoCanvasSize(canvas) {
    setCanvasSize()
    window.onresize = function () {
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
    ctx.fillStyle = canvasColor
    ctx.arc(x, y, 1, 0, radius)
    ctx.fill()
}

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1)

    ctx.lineWidth = brushSize
    ctx.strokeStyle = canvasColor
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

    //特性检测
    if (document.body.ontouchstart !== undefined) {
        //触摸设备
        canvas.ontouchstart = function (f) {

            var x = f.touches[0].clientX
            var y = f.touches[0].clientY

            lastPoint.x = x
            lastPoint.y = y

            mouseOn = true
            if (eraserEnabled) {
                ctx.clearRect(x - 10, y - 10, 20, 20)
                // var eraserSmall = document.getElementById('eraserSmall')
                // eraserSmall.className = "eraserSmall"
                // eraserSmall.style.left = x + "px"
                // eraserSmall.style.top = y + "px"
            } else {
                drawCircle(x, y, Math.PI * 2)
            }


        }
        canvas.ontouchmove = function (f) {
            var x = f.touches[0].clientX
            var y = f.touches[0].clientY

            var newPoint = {
                x: x,
                y: y
            }

            if (mouseOn) {
                if (eraserEnabled) {
                    ctx.clearRect(x - 5, y - 5, 10, 10)
                    // var eraserSmall = document.getElementById('eraserSmall')
                    // eraserSmall.style.left = x + "px"
                    // eraserSmall.style.top = y + "px"
                } else {
                    drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                    lastPoint = newPoint
                }

            }
        }
        canvas.ontouchend = function () {
            mouseOn = false
            // eraserSmall.className = ""
        }
    } else {
        //非触摸设备
        canvas.onmousedown = function (mouse) {
            var x = mouse.clientX
            var y = mouse.clientY

            lastPoint.x = x
            lastPoint.y = y

            mouseOn = true
            if (eraserEnabled) {
                ctx.clearRect(x - 15, y - 15, 30, 30)
                // var eraserSmall = document.getElementById('eraserSmall')
                // eraserSmall.className = "eraserSmall"
                // eraserSmall.style.left = x + "px"
                // eraserSmall.style.top = y + "px"
            } else {
                drawCircle(x, y, Math.PI * 2)
            }


        }

        canvas.onmousemove = function (mouse) {
            var x = mouse.clientX
            var y = mouse.clientY

            var newPoint = {
                x: x,
                y: y
            }

            if (mouseOn) {
                if (eraserEnabled) {
                    ctx.clearRect(x - 10, y - 10, 20, 20)
                    // var eraserSmall = document.getElementById('eraserSmall')
                    // eraserSmall.style.left = x + "px"
                    // eraserSmall.style.top = y + "px"
                } else {
                    drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                    lastPoint = newPoint
                }

            }

        }
        canvas.onmouseup = function () {
            mouseOn = false
            // eraserSmall.className = ""
        }
    }
}