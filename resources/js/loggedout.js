/**
 * Überprüft beim Aufruf einer MEMBER-BEREICH Seite, anhand des Inhaltes des localStorage, ob User überhaupt eingeloggt ist. Falls NEIN wird er automatisch in den GÄSTE-BEREICH umgeleitet.
 *
 * @returns void
 */
var loggedout = function () {
    var storSession = localStorage.session * 1;

    if (storSession !== 1) {
        window.location.href = "index.html";
    } else {
        console.log(' logged in')
    }
};


loggedout();