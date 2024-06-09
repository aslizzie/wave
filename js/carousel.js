$('.trend-carousel, .you-carousel,.movies-carousel, .series-carousel').flickity({
    "autoPlay": true,
    "freeScroll": true,
    "contain": true,
    "prevNextButtons": false,
    "pageDots": false,
    "wrapAround": true
});

$('.watching-carousel').flickity({
    "cellAlign": "left",
    "contain": true,
    "prevNextButtons": false,
    "pageDots": false
});

$(document).ready(function () {
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.header').addClass('solid');
        } else {
            $('.header').removeClass('solid');
        }
    });
});

