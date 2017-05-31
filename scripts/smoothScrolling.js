/**
 * Created by mario on 14.05.2017.
 */
$(document).ready(function() {
    var body = $('html, body');
    var hash = window.location.hash.replace("#", "");
    var offsetTop;
    var section;
    var sections = [];
    var closestSection;
    var sectionOnLoad;
    var stop = false;
    var interval;
    var timeout;

    //SetTimeout so offset top isn't 0
    //TODO: Solve without Timeout
    setTimeout(function(){
        //Go through each section and save offsetTop and ID
        $(".section").each(function() {
            section = {};
            offsetTop = $(this).offset().top;

            section.id = $(this).attr("id");
            section.offsetTop = offsetTop;

            sections.push(section);
        });

        onLoad();

        //Prevent flimering of portrait on page load
        $(".section--about-me").removeClass("section--hidden");
    }, 400);

    //Smooth scrolling on anchor links
    $(document).on('click', '.anchor-link', function(event){
        event.preventDefault();

        var anchor = $(this).attr('href');

        body.animate({
            scrollTop: $(anchor).offset().top - 50
        }, 350);
    });

    $(".portrait").on("click", function() {
        if($(this).css("position") != "relative") {
            togglePortrait();
        }
    });

    //Change Location Hash on scroll if needed
    $(document).on("scroll", function() {

        //Debounce Scroll
        clearTimeout(timeout);
        timeout = setTimeout(onScroll, 30);
    });

    function togglePortrait() {
        $("#portrait").toggleClass("portrait--minimized");
        $("header").toggleClass("header--active");

        $("body").toggleClass("scroll-blocked");
        $("html").toggleClass("scroll-blocked");
    }

    function onLoad() {

        //Disable Scroll if User loads Page on about-me
        if((hash == "" || hash == sections[0].id)) {
            $(window).scrollTop(0);
            $("body").toggleClass("scroll-blocked");
            $("html").toggleClass("scroll-blocked");
        }

        //keep Position if user is in different section
        if(!(hash == "" || hash == sections[0].id)) {
            sections.forEach(function(e) {
                if(e.id == hash) {
                    sectionOnLoad = e;
                    return false;
                }
            });
            $("#portrait").toggleClass("portrait--minimized");
            $("header").toggleClass("header--active");
            if(sectionOnLoad) {
                $(window).scrollTop(sectionOnLoad.offsetTop - 50);
            }
        }

        //Start onScroll() to highlight current Section in navigation
        onScroll(true);
    }

    function onScroll(onload) {
        if(!isTopPage()) {
            $("header").addClass("header--active");
        }

        if(!onload) {
            var isBottom = isBottomPage();
        }
        //Get Closest Section
        closestSection = getClosestSection($(window).scrollTop());

        var newhash = !isBottom ? "#" + closestSection.id : "#imprint";

        //Write Closest section in URL
        //Use History to prevent flimmering bug when using window.location.hash
        if (history.pushState) {
            history.pushState(null, null, newhash);
        }
        else {
            location.hash = newhash;
        }

        //Reset activ Elements
        $(".sidenav__icon").removeClass("sidenav__icon--active");
        $(".navigation__elem").removeClass("navigation__elem--active");

        if(!isBottom) {
            //Highlight Closest Section in Header and Side Navigation
            $(".sidenav__icon[href='" + newhash + "']").addClass("sidenav__icon--active");

            $(".navigation__elem[href='" + newhash + "']").addClass("navigation__elem--active");
         } else {
             //Highlight Imprint
             $(".navigation__elem--imprint").addClass("navigation__elem--active");
             $(".sidenav__icon--about-imprint").addClass("sidenav__icon--active");
         }
    }

    //Returns closest section with current Location
    function getClosestSection(location) {
        closestSection = {};

        sections.forEach(function(e, index) {
            if(!$.isEmptyObject(closestSection)) {
                //Check if Section is Closer than current closest Section
                if (Math.abs(e.offsetTop - location) < Math.abs(closestSection.offsetTop - location)) {
                    closestSection = sections[index];
                }
            } else {
                closestSection = sections[index];
            }
        });
        return closestSection;
    }

    //Returns true if User is at Bottom of Page
    function isBottomPage() {
        return($(window).scrollTop() + $(window).height() == $(document).height());
    }

    function isTopPage() {
        return($(window).scrollTop() < 50);
    }

});