/**
 * Created by mario on 14.05.2017.
 */
$(document).ready(function() {
    var duration = 400;
    var sectionDuration = 3 * duration;
    var item = {};
    var items = [];

    //save every timeline item wich isn't empty in items array
    $(".timeline__item").each(function(e, i) {
        var itemPosition = $(this).data("item");

        if(itemPosition) {
            item = {};

            item.position = itemPosition;
            item.row = $(this).closest(".timeline__row").data("row");

            items.push(item);
        }
    });

    //Check if User sees Timeline when user scrolls or reloads page
    isTimelineVisible();
    $(document).on("scroll", function() {
        isTimelineVisible();
    });

    function isTimelineVisible() {
        if(isElementInViewport($(".timeline"))) {
            startTimeline();
        }
    }

    function startTimeline() {

        //Sort Items by Position
        items.sort(function(a, b){return a.position - b.position});

        //Go Through each Item and Animate it
        items.forEach(function (e, i) {
            setTimeout(function () {
                animateTimelineSection(items[i]);
            }, i * sectionDuration);
        });
    }

    function animateTimelineSection(item) {

        //Animate Base Line
        animateStripe(item);

        //Animate Item Line after Base Line
        setTimeout(function(){
            animateItemLine(item);
        }, duration);

        //Animate Item after Item Line
        setTimeout(function(){
            animateItem(item);
        }, duration * 2);

        //Animate last Base Line
        if(item.position == items.length) {
            setTimeout(function(){
                animateStripe({position: (item.position + 1)});
            }, duration * 3);
        }
    }

    function animateStripe(item) {
        $(".stripline__elem[data-pos='" + item.position +"'] .stripline__inner").animate({
            width: "100%"
        }, duration);
    }

    function animateItemLine(item) {
        $(".timeline__item[data-item='" + item.position + "'] .timeline__line").animate({
            height: "100%"
        }, duration);
    }

    function animateItem(item) {
        $(".timeline__item[data-item='" + item.position + "'] .box").animate({
            opacity: 1
        }, duration);
    }

    function isElementInViewport (el) {

        /* Credits to User Dan from Stackoverflow http://stackoverflow.com/a/7557433/5628 */

        if (typeof jQuery === "function" && el instanceof jQuery) {
            el = el[0];
        }

        var rect = el.getBoundingClientRect();

        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }


});