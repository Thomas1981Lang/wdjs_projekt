/****************************************************
 *
 *
 * LOGIN - START
 *
 *
 ***************************************************/


$('#login').on('click', function (event) {
    event.preventDefault();
    var username = $("#username").val();
    var password = $("#password").val();

console.log('Line 16: vor ajax' );
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
            console.log('in success');
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