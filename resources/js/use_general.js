/****************************************************
 *
 *
 * ACCEPT NOTE - START
 *
 *
 ***************************************************/


/**
 * Überprüft beim Aufruf der Webanwendung, anhand des Inhaltes des localStorage, ob der User bereits den Umgang mit seinen Daten bestätigt hat.
 * Falls TRUE wird überprüft ob er sich nicht auf der index.html Seite befindet.
 *
 *      Falls TRUE wird er auf die index.html Seite umgeleitet.
 *      Falls FALSE wird die Notiz mittels jQuery eingeblendet.
 *
 * @returns void
 */
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

/**
 * Wenn Button betätigt wird - wird im localStorage accepted auf 1 gesetzt und die Nachricht wird ausgeblendet.
 *
 * @event .accept_button onclick
 */
$('.accept_button').on('click', function () {
    localStorage.setItem("accepted", 1);
    $('.accept').css("display", "none")
});


/**
 * Wenn Button betätigt wird - wird der User Umgeleitet auf www.google.at.
 *
 * @event .deny_button onclick
 */
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


/**
 * Leitet den User beim Logout auf index.html um und löscht den localStorage und setzt mittels setItem accepted (Datenverarbeitungshinweise) wieder auf 1.
 *
 * @event .abmelden on click
 */
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


/**
 *  Bei Icon klick öffnet sich das Menü bzw. beim Klick auf das Eltern Element (Icon) oder die Kind Elemente schließt sich das Menü wieder
 *   .stopPropagation verhindert das Event Bubbling dem DOM hinauf [so dass das Eltern-Elemente vom Eltern-Element(Icon) das Event mitbekommen]
 *
 *   @event .mobile_nav onclick
 */
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


/**
 *  Bei Icon klick öffnet sich das Menü bzw. beim Klick auf das Eltern Element (Icon) oder die Kind Elemente schließt sich das Menü wieder
 *   .stopPropagation verhindert das Event Bubbling dem DOM hinauf [so dass das Eltern-Elemente vom Eltern-Element(Icon) das Event mitbekommen]
 *
 *   @event .mobile_nav onclick
 */
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

/**
 * Überprüft ob der User die Seite über localhost besucht, wenn TRUE passiert nichts.
 * Falls FALSE wird überprüft ob nicht https:// verwendet wird.
 *      Falls TRUE wird das Protokoll von http:// auf https:// geändert.
 *
 *      @returns void
 */
var checkprotocol = function () {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    } else {
        var protocol = window.location.protocol;
        console.log(window.location.protocol);
        if (protocol !== 'https:') {
            console.log(window.location.protocol);
            window.location.protocol = 'https:'
        }
    }
};

checkprotocol();

/****************************************************
 *
 *
 * PROTOCOL - ENDE
 *
 *
 ***************************************************/