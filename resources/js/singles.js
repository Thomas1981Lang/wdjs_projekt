/****************************************************
 * Mobile Nav links
 ***************************************************/
$('.mobile_nav').on('click', function (event) {
    console.log('geht');
    $('.mobile_nav_wrapper').toggleClass('open');
    $('.mobile_nav_background').toggleClass('open');
    event.stopPropagation();
    if ($('.mobile_login_wrapper').hasClass('open')) {
        $('.mobile_login_wrapper').toggleClass('open');
        $('.mobile_login_background').toggleClass('open');
    }

});


/****************************************************
 * Mobile Nav rechts
 ***************************************************/
$('.mobile_login').on('click', function (event) {
    console.log('geht');
    $('.mobile_login_wrapper').toggleClass('open');
    $('.mobile_login_background').toggleClass('open');
    event.stopPropagation();
    if ($('.mobile_nav_wrapper').hasClass('open')) {
        $('.mobile_nav_wrapper').toggleClass('open');
        $('.mobile_nav_background').toggleClass('open');
    }
});



/****************************************************
 * Google Maps Init
 ***************************************************/
var map;
function initMap() {
    // Constructor creates a new map - only center and zoom are required.
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 40.7413549, lng: -73.9980244},
        zoom: 13
    });
}