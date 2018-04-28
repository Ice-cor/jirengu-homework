paymentBtn.addEventListener('click', function () {


    $.ajax({
        url: "http://127.0.0.1:8081/pay",
        dataType: "jsonp",
        success: function (result) {
            if (result === 'success') {
                // alert('这是前端写的代码')
                balance.innerText = parseInt(balance.innerText - 1, 10)
            }
        },
        error: function () {
            alert('fail');
        }
    });

    // var script = document.createElement('script')

    // var functionName = 'banlance'+ parseInt(Math.random()*100000,10)
    // window[functionName] = function(result){
    //     if(result === 'success'){   
    //         // alert('这是前端写的代码')
    //         balance.innerText = parseInt(balance.innerText-1,10) 
    //     }else{
    //         alert('页面出错')
    //     }
    // }

    // script.src = 'http://127.0.0.1:8081/pay?callback='+functionName
    // document.body.appendChild(script)

    // script.onload = function(e){

    //     e.currentTarget.remove()
    //     delete window[functionName]
    // }

    // script.onerror = function(e){
    //     alert('fail')
    //     e.currentTarget.remove()
    //     delete window[functionName]
    // }
})