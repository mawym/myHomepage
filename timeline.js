/**
 * Created by mario on 14.05.2017.
 */
$(document).ready(function() {
    var isMobile = $(".timeline--desktop").css("display") != "block";
    var duration = !isMobile ? 400 : 200;
    var sectionDuration = 3 * duration;
    var item = {};
    var items = [];
    var timeline = !isMobile ? $(".timeline--desktop") : $(".timeline--mobile");
    var animationStarted = false;

    //save every timeline item wich isn't empty in items array
    timeline.find(".timeline__item").each(function(e, i) {
        var itemPosition = $(this).data("item");

        if(itemPosition) {
            item = {};

            item.position = itemPosition;
            item.row = $(this).closest(".timeline__row").data("row");

            items.push(item);
        }
    });

    //Check if User sees Timeline when user scrolls or reloads page
    //isTimelineVisible();
    $(document).on("scroll", function() {
        if(!isMobile) {
            isTimelineVisible();
        }
    });

    function isTimelineVisible() {
        if (!animationStarted) {
            if (isElementInViewport($("#cv"))) {
                animationStarted = true;
                startTimeline();
            }
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
        if(!isMobile) {
            animateStripe(item);
        }

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
        timeline.find(".stripline__elem[data-pos='" + item.position +"'] .stripline__inner").animate({
            width: "100%"
        }, duration);
    }

    function animateItemLine(item) {
        timeline.find(".timeline__item[data-item='" + item.position + "'] .timeline__line").animate({
            height: "100%"
        }, duration);
    }

    function animateItem(item) {
        timeline.find(".timeline__item[data-item='" + item.position + "'] .box").animate({
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
            (rect.bottom - (window.innerHeight / 5 * 2)) <= (window.innerHeight || document.documentElement.clientHeight)
        );
    }


});