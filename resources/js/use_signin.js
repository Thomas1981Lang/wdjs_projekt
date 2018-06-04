/****************************************************
 *
 *
 * SIGN IN - START
 *
 *
 ***************************************************/



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



//     console.log('Line 28: username', username );
// console.log('Line 29: vorname', vorname );
// console.log('Line 30: nachname', nachname );
// console.log('Line 31: email', email );
// console.log('Line 32: geburtsdatum', geburtsdatum );
// console.log('Line 33: geschlecht', geschlecht );
// console.log('Line 34: orientierung', orientierung );
// console.log('Line 35: password', password );
// console.log('Line 36: checkbox', checkbox );





    if (geschlecht === 'male') {
        var type = 'men';
    }
    if (geschlecht === 'female') {
        var type = 'women';
    }


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