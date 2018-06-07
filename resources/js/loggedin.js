/**
 * Überprüft beim Aufruf einer GAST-BEREICH Seite, anhand des Inhaltes des localStorage, ob User bereits oder noch eingeloggt ist. Falls JA wird er automatisch in den Memberbereich umgeleitet.
 *
 * @returns void
 */
var loggedin = function () {
    var storSession = localStorage.session * 1;

    if (storSession === 1) {
        window.location.href = "finden.html";
    } else {
        console.log('not logged in')
    }
};


loggedin();