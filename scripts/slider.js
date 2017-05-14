/**
 * Created by mario on 14.05.2017.
 */

$(document).ready(function () {
    var navigationElement = $(".box__navigation a");

    //initialize swiper when document ready
    var backgroundSwiper = new Swiper ('.swiper-container--background', {
        simulateTouch: false
    });

    var boxSwiper = new Swiper ('.swiper-container--box', {
        simulateTouch: false,
        effect: "flip"
    });

    navigationElement.on("click", function() {
        var index = parseInt($(this).data("slide")) - 1;

        navigationElement.removeClass("active");
        $(this).addClass("active");

        backgroundSwiper.slideTo(index);
        boxSwiper.slideTo(index);
    })
});