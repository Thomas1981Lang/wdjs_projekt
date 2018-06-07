/****************************************************
 *
 *
 * SIGN IN - START
 *
 *
 ***************************************************/


/**
 * Mittels jQuery werden die eingegebenen Daten vom User beim klick auf den Button aus dem Formular abgefragt und überprüft ob alle Daten eingeben wurden.
 * Wenn Daten fehlen wir eine Fehlermeldung mit Hilfe von jQuery ausgegeben.
 *
 * Vor dem Senden der Daten wird der Login-Button deaktivert um ein erneutes Klicken zu verhindern.
 * Beim Erhalt der Daten vom Server, egal ob Success oder Error wird der Login-Button wieder aktiviert.
 *
 * Daten werden mit AJAX-REQUEST an die Datenbank geschickt und dort werde Username und Email mit den Einträgen in der DB vergliechen.
 * Falls einer von Beiden schon in der DB vorhanden ist, wird ein Fehler mit Hilfe von jQuery ausgegeben.
 *
 * Wenn keine Übereinstimmung vorhanden ist, werden die Daten in der DB verarbeitet und bei Erfolg wird der USER auf das login.html umgeleitet.
 *
 * @event #login onclick
 */
$(".signIn").on('click', function (event) {
    event.preventDefault();

    var username = $("#username").val();
    var vorname = $("#vorname").val();
    var nachname = $("#nachname").val();
    var email = $("#email").val();
    var geburtsdatum = $("#geburtsdatum").val();
    var geschlecht = $('input[name=gender]:checked').val();
    var orientierung = $('input[name=like_gender]:checked').val();
    var password = $("#password").val();
    var picUserBackground = 0;
    var lat = '48.210033';
    var lng = '16.363449';
    var checkbox = $('#agree_checkbox').is(':checked');
    var isCheckedGender = $('input[name="gender"]').is(':checked');
    var isCheckedLike = $('input[name="gender"]').is(':checked');


    //Übergibt je nach erhaltenen String, den geänderten String an die Variable type weiter.
    if (geschlecht === 'male') {
        var type = 'men';
    }
    if (geschlecht === 'female') {
        var type = 'women';
    }


     // Abfrage ob alle Felder ausgefüllt sind - wenn TRUE dann AJAX-REQUEST um Daten zu speichern
    if(username != '' && vorname!= '' &&
       nachname != '' && email != '' &&
       geburtsdatum != '' && isCheckedGender &&
       isCheckedLike && checkbox && password != '') {

        $.ajax({
            url: 'https://www.lang-thomas.at/resources/php/signin.php',
            beforeSend: function() {
                $('.signIn').prop('disabled', true);
            },
            method: 'POST',
            data: {
                username: username,
                vorname: vorname,
                nachname: nachname,
                email: email,
                geburtsdatum: geburtsdatum,
                geschlecht: geschlecht,
                orientierung: orientierung,
                password: password,
                picuserbackground: picUserBackground,
                lat: lat,
                lng: lng,
                type: type
            },
            success: function (data) {
                if (data !== "data inserted") {
                    $('.signIn').prop('disabled', false);
                    $('.error').html('Username oder Email bereits vorhanden.').show();
                    console.log('fehler' );
                } else {

                  window.location.href = "login.html";

                }
            }
        });


    } else if ( username == '' || vorname == '' ||
        nachname == '' || email == '' ||
        geburtsdatum == '' || isCheckedGender ||
        isCheckedLike || checkbox || password == '' ) {

        $('.error').html('Bitte das Formular vollständig ausfüllen').show();
        console.log('fehler' );
    }



});


/****************************************************
 *
 *
 * SIGN IN - ENDE
 *
 *
 ***************************************************/