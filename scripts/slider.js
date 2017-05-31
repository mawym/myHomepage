/**
 * Created by mario on 14.05.2017.
 */

$(document).ready(function () {
    var navigationElement = $(".box__navigation a");

    //Prevent Bug on Desktop with setTimeout
    setTimeout(function () {
        //initialize swiper when document ready
        var backgroundSwiper = new Swiper('.swiper-container--background', {
            simulateTouch: false,
            onlyExternal: true
        });

        var boxSwiper = new Swiper('.swiper-container--box', {
            simulateTouch: false,
            effect: "flip",
            onlyExternal: true
        });

        navigationElement.on("click", function() {
            var index = parseInt($(this).data("slide")) - 1;

            navigationElement.removeClass("active");
            $(this).addClass("active");

            backgroundSwiper.slideTo(index);
            boxSwiper.slideTo(index);
        })
    }, 400);
});