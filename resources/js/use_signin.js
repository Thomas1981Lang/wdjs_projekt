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
    var picUser = 0;
    var picUserBackground = 0;
    var lat = '48.210033';
    var lng = '16.363449';
    if (geschlecht === 'male') {
        var type = 'men';
    }
    if (geschlecht === 'female') {
        var type = 'women';
    }
    $.ajax({
        url: 'https://www.lang-thomas.at/resources/php/signin.php',
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
            picuser: picUser,
            picuserbackground: picUserBackground,
            lat: lat,
            lng: lng,
            type: type
        },
        success: function (data) {
            if (data !== "data inserted") {


                $(".error").show();
            } else {

                window.location.href = "login.html";
            }
        }
    });
});


/****************************************************
 *
 *
 * SIGN IN - ENDE
 *
 *
 ***************************************************/