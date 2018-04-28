let allBtn = $('.clickBtn')
// console.log(allBtn)
let images = $('.images')
let imgLength = $('.images>img').length
let currentIndex = 0;
let bannerWidth = 920 //轮播宽度
let duration = 3000 //动画时长

makeFakeImg()
init()
clickListen()
let timeId = autoSlide() //自动轮播开关
stateListen()


/**************** 工具函数 ****************/
function init() {
    images.css({
        transition: 'none',
        'transform': 'translateX(' + -bannerWidth + 'px' + ')'
    }).offset()

    images.css({
        transition: 'all,0.5s',
    })
    allBtn.eq(0).addClass('active').siblings().removeClass('active')

}

function makeFakeImg() {
    images.children().eq(0).clone(true).appendTo('.images')
    images.children().eq(imgLength - 1).clone(true).prependTo('.images')
}

function buttonLock(btn) {
    btn.attr('disabled', true)
    setTimeout(function () {
        btn.attr('disabled', false)
    }, 501)
}

function goToSlide(index) {
    if (index >= imgLength) {
        index = 0
    } else if (index < 0) {
        index = imgLength - 1
    }

    if (index === 0 && currentIndex === imgLength - 1) {
        images.css({
            'transform': 'translateX(' + -(imgLength + 1) * bannerWidth + 'px' + ')'
        }).one('transitionend', function () {
            images.css({
                transition: 'none',
                'transform': 'translateX(' + -(index + 1) * bannerWidth + 'px' + ')'
            }).offset()
            images.css({
                transition: 'all,0.5s',
            })
        })
    } else if (index === imgLength - 1 && currentIndex === 0) {
        images.css({
            'transform': 'translateX(' + 0 + 'px' + ')'
        }).one('transitionend', function () {
            images.css({
                transition: 'none',
                'transform': 'translateX(' + -(index + 1) * bannerWidth + 'px' + ')'
            }).offset()
            images.css({
                transition: 'all,0.5s',
            })
        })
    } else {
        images.css({
            'transform': 'translateX(' + -(index + 1) * bannerWidth + 'px' + ')'
        })
    }
    allBtn.eq(index).addClass('active').siblings().removeClass('active')
    currentIndex = index;
}

function clickListen(){
    $('#buttonWrap').on('click', 'button', function (e) {
        let index = $(e.currentTarget).index()
        buttonLock(allBtn)
        goToSlide(index)
    })
    
    $('#goPrev').on('click', function () {
        goToSlide(currentIndex - 1)
        buttonLock($('#goBtnWrap>button'))
    })
    $('#goNext').on('click', function () {
        goToSlide(currentIndex + 1)
        buttonLock($('#goBtnWrap>button'))
    })
}

function autoSlide(boolean = true) {
    if(boolean === true){
        return setInterval(() => {
            goToSlide(currentIndex + 1)
            console.log(currentIndex)
        }, duration)
    }else{
        return null
    }

}

function stateListen(){
    $('.window').on('mouseenter', function () {
        console.log('mouseover')
        window.clearInterval(timeId)
    }).on('mouseleave', function () {
        console.log('mouseout')
        window.clearInterval(timeId)
        timeId = autoSlide()
    })
    //mouseover及mouseout移入子元素的时候会多次冒泡触发，所以使用这两个代替，但兼容性有待考证
    //jquery也提供了这两个方法
    document.addEventListener('visibilitychange', function () {
        //防止页面切换后回到此页面产生bug
        if (document.hidden) {
            window.clearInterval(timeId)
        } else {
            window.clearInterval(timeId)
            timeId = autoSlide()
        }
    })
}

console.dir($('li'))