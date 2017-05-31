/**
 * Created by mario on 18.05.2017.
 */
$(document).ready(function() {
    var navigation = $(".navigation");
    var burger = $(".burger");

    burger.on("click", function() {
        navigation.toggleClass("navigation--visible");
        burger.toggleClass("burger--close");
    });
    $(".navigation--mobile a").on("click", function() {
        navigation.removeClass("navigation--visible");
        burger.toggleClass("burger--close");
    });

});
