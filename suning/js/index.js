$(function ($) {
    var $banner = $('.sn_banner');
    var $width = $banner.width();

    var $imgBanner = $banner.find('ul:first');
    var $pointImg = $banner.find('ul:last');
    var $points = $pointImg.find('li');

    var animationFuc = function () {
        $imgBanner.animate({transform:'translate('+(-index*$width)+'px)'},200,function () {
            if (index >= 9){
                index = 1
                $imgBanner.css({transform:'translate('+(-index*$width)+'px)'})
            } else if(index <= 0){
                index = 0
                $imgBanner.css({transform:'translate('+(-index*$width)+'px)'})
            }
            $points.removeClass('now').eq(index-1).addClass('now')
        })
    }

    var index = 1;
    var timer = window.setInterval(function () {
            index ++ ;
            animationFuc();
        },1000);
    $banner.on('click',function () {
        console.log('++++++++++')
    });

    $banner.on('swipeLeft',function () {
        index ++;
        animationFuc();
    });
    /*右滑的手势  上一张*/
    $banner.on('swipeRight',function () {
        index --;
        animationFuc();
    });

    // var startX = 0
    // var distance = 0
    // var isMove = false
    // $banner.on('touchstart',function (e) {
    //     startX = e.touches[0].clientX
    // }).on('touchmove',function (e) {
    //     var moveX = e.touches[0].clientX
    //     distance = moveX - startX
    //     isMove = true
    // }).on('touchend',function (e) {
    //     //移动端预设的触摸条件
    //     if (isMove && Math.abs(distance) > 50){
    //         if (distance > 0){
    //             //上一张
    //             index--
    //             animationFuc();
    //         } else {
    //             index++
    //             animationFuc();
    //         }
    //     }
    //     //参数重置
    //     startX = 0
    //     distance = 0
    //     isMove = false
    // })
    /*3.完成手势切换  android 4.0 兼容 */
    /*左滑的手势  下一张*/

    })

