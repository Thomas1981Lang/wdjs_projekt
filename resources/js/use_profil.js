/****************************************************
 *
 *
 * PROFIL DATEN ANZEIGEN - START
 *
 *
 ***************************************************/
/**
 * Profil Daten abfragen per AJAX-REQUEST und Ausgabe der Daten.
 *
 */
var fillProfilData = function () {

        $.ajax({
                url: 'https://www.lang-thomas.at/resources/php/profil_show.php',
                method: 'POST',
                data: {
                    id: localStorage.getItem('id'),
                },
                success: function (data) {
                    if (data !== "Error") {
                        var parseData = JSON.parse(data);
                        console.log(data);
                        console.log(parseData, 'parse');
                        $('.profil_vorname').html(parseData.vorname);
                        $('.profil_nachname').html(parseData.nachname);
                        $(".profil_image").css("background-image", "url('" + parseData.picuserpfad + "'");


                        localStorage.setItem('fakeGPS', parseData.fakeGPS);


                        if (parseData.fakeGPS * 1 === 0) {
                            $('.fakeGPSCords').hide();
                            $('.fakeGPS_button').html('DEAKTIVIERT');
                        }
                        else {
                            $('.fakeGPSCords').show();
                            $('.fakeGPS_button').html('AKTIVIERT');
                            $('input[name="lat"]').val(parseData.lat);
                            $('input[name="lng"]').val(parseData.lng);
                        }

                        $('.fakeGPS_button').prop('disabled', false);


                        /**
                         * Holen des localStorage Wertes für fakeGPS.
                         * Überprüfen ob der Wert 1 ist.
                         * Falls TRUE wird die Funktion setFakeGPSOff() aufgerufen.
                         * Falls FALSE wird die Funktion sestFakeGPSOn() aufgerufen.
                         *
                         * @event .fakeGPS_button on click
                         */
                        $('.fakeGPS_button').on('click', function () {

                            $('.fakeGPS_button').prop('disabled', true);
                            var fakeGPSStatus = localStorage.getItem('fakeGPS') * 1;
                            console.log(localStorage, 'local');
                            if (fakeGPSStatus === 1) {
                                setFakeGPSOff()
                            } else {
                                setFakeGPSOn()
                            }

                        });


                        /**
                         * Ruft die Funktion saveFakeGPSOff() auf.
                         *
                         * @event .fakeGPS_save on click
                         */
                        $('.fakeGPS_save').on('click', function () {

                            saveFakeGPS();

                        });

                    }


                    //Wandelt das erhaltene Datum im Format JJJJ-MM-TT in TT-MM-JJJJ um und gibt den neuen String im VIEW aus.
                    var datedb = parseData.geburtsdatum;
                    var j = datedb.slice(0, 4);
                    console.log(j);
                    var m = datedb.slice(5, 7);
                    console.log(m);
                    var d = datedb.slice(8, 10);
                    console.log(d);
                    var dateconv = (d + '.' + m + '.' + j);

                    $('#geburtsdatum').html(dateconv);


                    //Wandelt die erhaltenen Daten female oder male in Frau oder Mann um und gibt den neuen String im VIEW aus.
                    switch (parseData.geschlecht) {
                        case 'female':
                            $('#gender').html('Frau');
                            break;
                        case 'male':
                            $('#gender').html('Mann');
                            break;
                    }



                    //Wandelt den erhaltenen Daten-String female, male oder bi in Frauen, Männer oder Fauen und Männer um und gibt den neuen String im VIEW aus.
                    switch (parseData.orientierung) {
                        case 'female':
                            $('#like_gender').html('Frauen');
                            break;
                        case 'male':
                            $('#like_gender').html('Männer');
                            break;
                        case 'bi':
                            $('#like_gender').html('Frauen und Männer');
                            break;
                    }
                }
            }
        );
    };


/**
 * Funktion zum Absenden eines AJAX-REQUEST, welcher den Wert fakeGPS im localStorage mit 1 speichert und die Elemente für FakeGPS im VIEW einschaltet.
 *
 */
var setFakeGPSOn = function () {
    $.ajax({
        method: 'POST',
        url: 'https://www.lang-thomas.at/resources/php/profil_fakeGPSstart.php',
        data: {
            id: localStorage.getItem('id'),
        },
        success: function (response) {
            if (response !== "Error") {
                localStorage.setItem('fakeGPS', 1);
                $('.fakeGPSCords').show();
                $('.fakeGPS_button').html('AKTIVIERT');
                $('.fakeGPS_button').prop('disabled', false);
                $('input[name="lat"]').val(localStorage.getItem('lat'));
                $('input[name="lng"]').val(localStorage.getItem('lng'));
            } else {
                console.log(response, 'setonerror');
            }
        }
    });
};


/**
 * Funktion zum Absenden eines AJAX-REQUEST, welcher den Wert fakeGPS im localStorage mit 0 speichert und die Elemente für FakeGPS im VIEW ausschaltet.
 *
 */
var setFakeGPSOff = function () {
    $.ajax({
        method: 'POST',
        url: 'https://www.lang-thomas.at/resources/php/profil_fakeGPSend.php',
        data: {
            id: localStorage.getItem('id'),
        },
        success: function (response) {
            if (response !== "Error") {
                localStorage.setItem('fakeGPS', 0);
                console.log(response, 'setoffnoterror');
                $('.fakeGPSCords').hide();
                $('.fakeGPS_button').html('DEAKTIVIERT');
                $('.fakeGPS_button').prop('disabled', false);
            } else {
                console.log(response, 'setoffnoterror');
            }
        }
    });
};

/**
 * Funktion zum Absenden eines AJAX-REQUEST. Holt sich mittels jQuery die Werte für lat und lng aus den Input-Feldern und speichert die Daten in der Datenbank.
 * Wenn erfolgreich, werden die Werte ebenfalls im localStorage gespeichtert.
 * Ajax-REQUEST um FakeGPS Koordinaten zu speichern
 */
var saveFakeGPS = function () {
    var lat = $('input[name="lat"]').val();
    var lng = $('input[name="lng"]').val();

    $.ajax({
        method: 'POST',
        url: 'https://www.lang-thomas.at/resources/php/profil_fakeGPSSave.php',
        crossDomain: true,
        data: {
            id: localStorage.getItem('id'),
            lat: lat,
            lng: lng
        },
        success: function (response) {
            if (response !== "Error") {
                console.log(response, 'saveNOerror');
                localStorage.setItem('lat', lat);
                localStorage.setItem('lng', lng);

            } else {
                console.log(response, 'saveerror');
            }
        }
    });
};

/****************************************************
 *
 *
 * PROFIL DATEN ANZEIGEN - ENDE
 *
 *
 ***************************************************/


/****************************************************
 *
 *
 * USER FOTO UPLOAD und UPDATEN - START
 *
 *
 ***************************************************/

$(document).ready(function () {


    /**
     * Dateiabfrage mit hilfe von jQuery und dem FormData-Objektes.
     * Speichert die Datei am Server und speichert den Pfad zur Datei in der Datenbank ab und weist sie dabei dem richtigen User mit der aus dem localStorage ermittelten id zu.
     * Gibt die hochgeladene Datei anschließend mit jQuery im VIEW aus.
     *
     * @event #userpic onclick
     */
    $("#userpic").on('change', function () {
        var id = localStorage.getItem('id');
        var fd = new FormData();
        var files = $('#userpic')[0].files[0];
        fd.append('idvalue', id);
        fd.append('file', files);


        $.ajax({
            url: 'https://www.lang-thomas.at/resources/php/profil_upload.php',
            type: 'POST',
            data: fd,
            contentType: false,
            processData: false,
            success: function (response) {
                if (response != 0) {
                    $(".profil_image").css("background-image", "url('" + response + "'");
                    console.log('Line 175: response', response);
                } else {
                    alert('file not uploaded');
                }
            },
        });
    });
});


/****************************************************
 *
 *
 * USER FOTO UPLOAD und UPDATEN - ENDE
 *
 *
 ***************************************************/


/****************************************************
 *
 *
 * PROFIL DATEN LÖSCHEN - START
 *
 *
 ***************************************************/
/**
 * Löscht anhand der im localStorage gespeicherten ID und AJAX-REQUEST den USER aus der Datenbank.
 * Bei Erfolg wird der localStorage gelöscht und mit setItem wieder mit accepted: 1 gefüllt um das erneute Anzeigen der Datenverwendungsnotiz zu unterbinden.
 */
var deleteProfilData = function () {


    $('.profil_delete_button').on('click', function () {

        $.ajax({
            url: 'https://www.lang-thomas.at/resources/php/profil_delete.php',
            method: 'POST',
            data: {
                id: localStorage.getItem('id'),
            },
            success: function (data) {
                if (data !== "data deleted") {

                    console.log(data);

                    $(".error").show();
                } else {
                    localStorage.clear();
                    localStorage.setItem("accepted", 1);
                    window.location.href = "index.html";
                }
            }
        });


    });

};

/****************************************************
 *
 *
 * PROFIL DATEN LÖSCHEN - ENDE
 *
 *
 ***************************************************/