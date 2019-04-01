window.onload = function () {
    search();

    banner();

    downTime();
};
var search = function () {
    /*1.默认固定顶部透明背景*/
    var searchBox = document.querySelector('.jd_search_box');
    var banner = document.querySelector('.jd_banner');
    var height = banner.offsetHeight;
    /*监听页面滚动事件*/
    window.onscroll = function () {
        var scrollTop = document.body.scrollTop;
        /*默认的透明度*/
        var opacity = 0;
        if (scrollTop < height) {
            opacity = scrollTop / height * 0.85;
        } else {
            opacity = 0.85;
        }
        searchBox.style.background = 'rgba(201,21,35,' + opacity + ')';
    }
};
var banner = function () {
    /*1. 自动轮播图且无缝   定时器，过渡*/
    /*2. 点要随着图片的轮播改变  根据索引切换*/
    /*3. 滑动效果  利用touch事件完成*/
    /*4. 滑动结束的时候    如果滑动的距离不超过屏幕的1/3  吸附回去   过渡*/
    /*5. 滑动结束的时候    如果滑动的距离超过屏幕的1/3  切换（上一张，下一张）根据滑动的方向，过渡*/

    /*轮播图*/
    var banner = document.querySelector('.jd_banner');
    /*屏幕宽度*/
    var width = banner.offsetWidth;
    /*图片容器*/
    var imageBox = banner.querySelector('ul:first-child');
    /*点容器*/
    var pointBox = banner.querySelector('ul:last-child');
    /*所有的点*/
    var points = pointBox.querySelectorAll('li');

    var addTransition = function () {
        imageBox.style.transition = 'all 0.2s';
        imageBox.style.webkitTransition = 'all 0.2s';
    }
    var removeTransition = function () {
        imageBox.style.transition = 'none';
        imageBox.style.webkitTransition = 'none';
    }
    var setTranslateX = function (translateX) {
        imageBox.style.transform = 'translateX(' + translateX + 'px)';
        imageBox.style.webkitTransform = 'translateX(' + translateX + 'px)';
    }
    var index = 1
    var timer = window.setInterval(function () {
        index++
        addTransition()
        setTranslateX(-index*width)

    },1000)
    imageBox.addEventListener('transitionend',function () {
        if (index >= 9){
            index = 1
            removeTransition()
            setTranslateX(-index*width)
        } else if (index <= 0){
            index = 8
            removeTransition()
            setTranslateX(-index*width)
        }
        setPoints()
    })
var setPoints = function () {
    points.forEach(function (item,index) {
        item.classList.remove('now')
    })
    points[index-1].classList.add('now')
}

var startX = 0
var distance = 0
var isMove = false  //防止非滑动触发事件
imageBox.addEventListener('touchstart',function (e) {
    clearInterval(timer)
    startX = e.touches[0].clientX
})
imageBox.addEventListener('touchmove',function (e) {
    isMove = true
    var endX = e.touches[0].clientX
    distance = endX - startX
    removeTransition()
    setTranslateX(-index*width + distance)
})
imageBox.addEventListener('touchend',function (e) {

    if (isMove) {
        if (Math.abs(distance) < width/3) {
            addTransition()
            setTranslateX(-index*width)
        } else {
            if (distance >0){
                //向右滑
                index --
            } else {
                //向左滑
                index ++
            }
            addTransition()
            setTranslateX(-index*width)
        }
    }
    //重置参数
    startX = 0
    distance = 0
    isMove = false
    //防止多次
    clearInterval(timer)
    timer = setInterval(function () {
        index ++
        addTransition()
        setTranslateX(-index*width)
    },1000)
})

}
var downTime = function () {
    /*1.每一秒改变当前的时间*/
    /*2.倒数计时  假设 4小时*/
    var time = 4 * 60 * 60 ;
    var spans = document.querySelectorAll('.time span');

    var timer = setInterval(function () {
        time --;
        /*格式化  给不同的元素html内容*/
        var h = Math.floor(time/3600);
        var m = Math.floor(time%3600/60);
        var s = Math.floor(time%60);

        spans[0].innerHTML = Math.floor(h/10);
        spans[1].innerHTML = h%10;
        spans[3].innerHTML = Math.floor(m/10);
        spans[4].innerHTML = m%10;
        spans[6].innerHTML = Math.floor(s/10);
        spans[7].innerHTML = s%10;

        if(time <= 0){
            clearInterval(timer);
        }

    }, 1000)

}