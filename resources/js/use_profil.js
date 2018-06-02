/****************************************************
 *
 *
 * PROFIL DATEN ANZEIGEN - START
 *
 *
 ***************************************************/

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

                        $('.fakeGPS_save').on('click', function () {

                            saveFakeGPS();

                        });

                    }

                    var datedb = parseData.geburtsdatum;
                    var j = datedb.slice(0, 4);
                    console.log(j);
                    var m = datedb.slice(5, 7);
                    console.log(m);
                    var d = datedb.slice(8, 10);
                    console.log(d);
                    var dateconv = (d + '.' + m + '.' + j);


                    $('#geburtsdatum').html(dateconv);


                    switch (parseData.geschlecht) {
                        case 'female':
                            $('#gender').html('Frau');
                            break;
                        case 'male':
                            $('#gender').html('Mann');
                            break;
                    }


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
        )
        ;


    }
;

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
                console.log(response, 'setonnoterror');
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
    })
    ;
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

    $("#userpic").on('change', function () {
        var id = localStorage.getItem('id');
        console.log('Line 160: id', id );
        var fd = new FormData();
        var files = $('#userpic')[0].files[0];
        fd.append('idvalue', id);
        fd.append('file', files);

        console.log('Line 166: fd', fd );

        $.ajax({
            url: 'https://www.lang-thomas.at/resources/php/profil_upload.php',
            type: 'POST',
            data: fd,
            contentType: false,
            processData: false,
            success: function (response) {
                if (response != 0) {
                    $(".profil_image").css("background-image", "url('" + response + "'");
                    console.log('Line 175: response', response );
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
                    console.log(localStorage, 'local');
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