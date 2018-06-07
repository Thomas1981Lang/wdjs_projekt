/****************************************************
 *
 *
 * LOGIN - START
 *
 *
 ***************************************************/

/**
 * Mittels jQuery werden username und password beim klick auf Button auf Formular abgefragt.
 * Beide Daten werden mit AJAX-REQUEST an die Datenbank geschickt und dort mit den Einträgen in der DB vergliechen.
 *
 * Vorm Senden der Daten wird der Login-Button deaktivert um ein erneutes Klicken zu verhindern.
 * Beim Erhalt der Daten vom Server, egal ob Success oder Error wird der Login-Button wieder aktiviert.
 *
 * Wenn eine Übereinstimmung vorhanden ist, werden die benötigten Daten des ermittelten Users im localStorage gespeichert und die Session auf 1 gesetzt und der USER wird in den MEMBER-BEREICH umgeleitet.
 *
 * Wenn keine Übereinstimmung vorhanden ist, wird ein Fehler angezeigt.
 *
 * @event #login onclick
 */
$('#login').on('click', function (event) {
    event.preventDefault();
    var username = $("#username").val();
    var password = $("#password").val();

    $.ajax({
        method: 'POST',
        url: 'https://www.lang-thomas.at/resources/php/login.php',
        beforeSend: function() {
            $('.login').prop('disabled', true);
        },
        crossDomain: true,
        data: {
            username: username,
            password: password
        },
        success: function (data) {
            if (data !== "Error") {
                var parseData = JSON.parse(data);

                localStorage.setItem("id", parseData.id);
                localStorage.setItem("vorname", parseData.vorname);
                localStorage.setItem("geschlecht", parseData.geschlecht);
                localStorage.setItem("orientierung", parseData.orientierung);
                localStorage.setItem("fakeGPS", parseData.fakeGPS);
                localStorage.setItem("lat", parseData.lat);
                localStorage.setItem("lng", parseData.lng);
                localStorage.setItem("eat", parseData.eat);
                localStorage.setItem("drink", parseData.drink);
                localStorage.setItem("party", parseData.party);
                localStorage.setItem("singles", parseData.singles);
                localStorage.setItem("session", "1");

                $('.login').prop('disabled', false);
                if (parseData.picuser * 1 === 0 ) {
                    window.location.href = "profil.html";
                } else {
                    window.location.href = "finden.html";
                }
            } else {
                console.log(data);
                $(".error").show();
                $('.login').prop('disabled', false);
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
            $('.login').prop('disabled', false);
        }
    });
});


/****************************************************
 *
 *
 * LOGIN - ENDE
 *
 *
 ***************************************************/