let n
let size
init() //初始化

let timeId = bannerSlide() //主函数


/******************工具函数******************/
function init() {
    size = $('.images>img').length
    n = 0
    $('.images>img:nth(0)').siblings().addClass('right')
}

function getIndex(n) {
    let N = n % size
    if (n >= size) {
        n = 0
    }
    // console.log(N)
    return N
}

function getImage(index) {
    return $('.images>img:nth(' + getIndex(getIndex(index)) + ')')
}

function changeState($node, state) {
    switch (state) {
        case 'left':
            $node.removeClass('current').addClass('left')
            break;
        case 'current':
            $node.removeClass('right').addClass('current')
            break;
        case 'right':
            $node.removeClass('left').addClass('right')
            break;
    }
}

function bannerSlide() {
    return setInterval(() => {
        changeState(getImage(n), 'left') //第一张左移
        changeState(getImage(n + 1), 'current') //第二张居中
        changeState(getImage(n + 2), 'right') //第三张从左移到右

        n++
    }, 3000)

}