$(document).ready(function(){
    //This loads and implements the options for the bxSlider plugin that is found on the home page.
    $("#slider").bxSlider({
        auto: true,
        minSlides: 3,
        maxSlides: 3,
        slideWidth: 600,
        slideMargin: 20,
        speed: 3000,
        pause: 8000,
        moveSlides: 1
    }); 

} );