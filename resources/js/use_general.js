/****************************************************
 *
 *
 * ACCEPT NOTE - START
 *
 *
 ***************************************************/



var accepted = function () {
    var acceptNote = localStorage.accepted * 1;

    if (acceptNote !== 1) {

        //if (window.location.pathname !== '/WDJS/index.html') {
                if (window.location.pathname !== '/index.html') {
            window.location.href = "index.html";
        } else {
            $('.accept').css("display", "flex")
        }
    } else {
        console.log('ja - akzeptiert');
    }

};
accepted();

$('.accept_button').on('click', function () {
    localStorage.setItem("accepted", 1);
    $('.accept').css("display", "none")
});

$('.deny_button').on('click', function () {
    window.location.href = "https://google.at";
});



/****************************************************
 *
 *
 * ACCEPT NOTE - ENDE
 *
 *
 ***************************************************/





/****************************************************
 *
 *
 * LOGOUT - START
 *
 *
 ***************************************************/



$(".abmelden").on('click', function () {

    localStorage.clear();
    localStorage.setItem("accepted", 1);
    window.location.href = "index.html";

});



/****************************************************
 *
 *
 * LOGOUT - ENDE
 *
 *
 ***************************************************/





/****************************************************
 *
 *
 * MOBILE NAV - START
 *
 *
 ***************************************************/





/****************************************************
 * Mobile Nav links - START
 ***************************************************/
$('.mobile_nav').on('click', function (event) {
    event.stopPropagation();
    $('.mobile_nav_wrapper').toggleClass('open');
    $('.mobile_nav_background').toggleClass('open');
    if ($('.mobile_login_wrapper').hasClass('open')) {
        $('.mobile_login_wrapper').toggleClass('open');
        $('.mobile_login_background').toggleClass('open');
    }
});
/****************************************************
 * Mobile Nav links - ENDE
 ***************************************************/





/****************************************************
 * Mobile Nav rechts - START
 ***************************************************/
$('.mobile_login').on('click', function (event) {
    event.stopPropagation();
    $('.mobile_login_wrapper').toggleClass('open');
    $('.mobile_login_background').toggleClass('open');
    if ($('.mobile_nav_wrapper').hasClass('open')) {
        $('.mobile_nav_wrapper').toggleClass('open');
        $('.mobile_nav_background').toggleClass('open');
    }
});
/****************************************************
 * Mobile Nav rechts - ENDE
 ***************************************************/






/****************************************************
 *
 *
 * MOBILE NAV - ENDE
 *
 *
 ***************************************************/





/****************************************************
 *
 *
 * PROTOCOL - START
 *
 *
 ***************************************************/


// var checkprotocol = function () {
//     var protocol = window.location.protocol;
//     console.log(window.location.protocol);
//     if (protocol !== 'https:') {
//         console.log(window.location.protocol);
//         window.location.protocol = 'https:'
//     }
// };
// checkprotocol();


/****************************************************
 *
 *
 * PROTOCOL - ENDE
 *
 *
 ***************************************************/