/**
 * Created by mario on 14.05.2017.
 */
$(document).ready(function() {
    var body = $('html, body');
    var offsetTop;
    var section;
    var sections = [];
    var closestSection;

    //Smooth scrolling on anchor links
    $(document).on('click', '.anchor-link', function(event){
        event.preventDefault();

        var anchor = $(this).attr('href');

        body.animate({
            scrollTop: $(anchor).offset().top - 50
        }, 350);
    });

    //Go through each section and save offsetTop and ID
    $(".section").each(function() {
        section = {};
        offsetTop = $(this).offset().top;

        section.id = $(this).attr("id");
        section.offsetTop = offsetTop;

        sections.push(section);
    });

    //Change Location Hash on scroll if needed

    $(document).on("scroll", function() {
        onScroll();
    });

    onScroll();

    function onScroll() {
        //Get Closest Section
        closestSection = getClosestSection($(window).scrollTop());

        //Write Closest section in URL
        //Use History to prevent flimmering bug when using window.location.hash
        if(history.pushState) {
            history.pushState(null, null, "#" + closestSection.id);
        }
        else {
            location.hash = "#" + closestSection.id;
        }

        //Reset activ Elements
        $(".sidenav__icon").removeClass("sidenav__icon--active");
        $(".navigation__elem").removeClass("navigation__elem--active");

        //if(!isBottomPage()) {
            //Highlight Closest Section in Header and Side Navigation
            $(".sidenav__icon[href='#" + closestSection.id + "']").addClass("sidenav__icon--active");

            $(".navigation__elem[href='#" + closestSection.id + "']").addClass("navigation__elem--active");
       /* } else {
            //Highlight Imprint
            $(".navigation__elem--imprint").addClass("navigation__elem--active");
            $(".sidenav__icon--about-imprint").addClass("sidenav__icon--active");
        }*/
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

    /*function debounce(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };*/
});