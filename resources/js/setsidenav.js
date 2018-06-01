/****************************************************
 *
 *
 * PROFIL DATEN ANZEIGEN - START
 *
 *
 ***************************************************/

var setMenuPoints = function () {

    var eat = localStorage.getItem('eat') * 1;
    var drink = localStorage.getItem('drink') * 1;
    var party = localStorage.getItem('party') * 1;
    var singles = localStorage.getItem('singles') * 1;
    var geschlecht = localStorage.getItem('geschlecht');
    var orientierung = localStorage.getItem('orientierung');

    if (eat !== 1) {
        $('.eat').removeClass('mobile_active');
        console.log('Line 18: eat !1');

    } else {
        $('.eat').addClass('mobile_active');
    }

        $('.eat').on('click', function (event) {
            event.stopPropagation();
            eat = localStorage.getItem('eat') * 1;
            console.log(eat, 'eat at click');
            if (eat === 1) {
                setNavOff('eat');
                for (var q = 0; q < markers.length; q++) {
                    console.log('!');
                    if (markers[q].type == 'eat') {
                        console.log('eat');
                        markers[q].setMap(null);
                    }
                }


            } else {
                setNavOn('eat');
                for (var q = 0; q < markers.length; q++) {
                    console.log('!');
                    if (markers[q].type == 'eat') {
                        console.log('eat');
                        markers[q].setMap(map);
                    }
                }
            }
        });

    if (drink !== 1) {
        $('.drink').removeClass('mobile_active');
    } else {
        $('.drink').addClass('mobile_active');
    }

    $('.drink').on('click', function (event) {
        event.stopPropagation();
        drink = localStorage.getItem('drink') * 1;
        console.log(drink, 'drink at click');
        if (drink === 1) {
            setNavOff('drink');
            for (var q = 0; q < markers.length; q++) {
                console.log('!');
                if (markers[q].type == 'drink') {
                    console.log('eat');
                    markers[q].setMap(null);
                }
            }
        } else {
            setNavOn('drink');
            for (var q = 0; q < markers.length; q++) {
                console.log('!');
                if (markers[q].type == 'drink') {
                    console.log('eat');
                    markers[q].setMap(map);
                }
            }
        }
    });


    if (party !== 1) {
        $('.party').removeClass('mobile_active');
    } else {
        $('.party').addClass('mobile_active');
    }

    $('.party').on('click', function (event) {
        event.stopPropagation();
        party = localStorage.getItem('party') * 1;
        console.log(party, 'party at click');
        if (party === 1) {
            setNavOff('party');
            for (var q = 0; q < markers.length; q++) {
                console.log('!');
                if (markers[q].type == 'party') {
                    console.log('eat');
                    markers[q].setMap(null);
                }
            }
        } else {
            setNavOn('party');
            for (var q = 0; q < markers.length; q++) {
                console.log('!');
                if (markers[q].type == 'party') {
                    console.log('eat');
                    markers[q].setMap(map);
                }
            }
        }
    });


    if (singles !== 1) {
        $('.singles').removeClass('mobile_active');
    } else {
        $('.singles').addClass('mobile_active');
    }

    $('.singles').on('click', function (event) {
        event.stopPropagation();
        singles = localStorage.getItem('singles') * 1;
        console.log(singles, 'party at click');
        if (singles === 1) {
            setNavOff('singles');
            for (var q = 0; q < markers.length; q++) {
                console.log('!');
                if (markers[q].type == 'men' || markers[q].type == 'women') {
                    markers[q].setMap(null);
                }
            }
        } else {
            setNavOn('singles');
            for (var q = 0; q < markers.length; q++) {
                if (geschlecht === 'male') {
                    switch (orientierung) {
                        case 'female':
                            if (markers[q].type == 'women' && (markers[q].orientierung == 'male' || markers[q].orientierung == 'bi')) {
                                markers[q].setMap(map);
                            }
                            break;
                        case 'male':
                            if (markers[q].type == 'men' && (markers[q].orientierung == 'male' || markers[q].orientierung == 'bi')) {
                                markers[q].setMap(map);
                            }
                            break;
                        case 'bi':
                            if ((markers[q].type == 'men' && (markers[q].orientierung == 'male' || markers[q].orientierung == 'bi')) || (markers[q].type == 'women' && (markers[q].orientierung == 'male' || markers[q].orientierung == 'bi')) ) {
                                markers[q].setMap(map);
                            }
                            break;
                    }

                }

                if (geschlecht === 'female') {
                    switch (orientierung) {
                        case 'male':
                            if (markers[q].type == 'men' && (markers[q].orientierung == 'female' || markers[q].orientierung == 'bi')) {
                                markers[q].setMap(map);
                                console.log('Line 774: marker[q]', markers[q] );
                            }
                            break;
                        case 'female':
                            if (markers[q].type == 'women' && (markers[q].orientierung == 'female' || markers[q].orientierung == 'bi')) {
                                markers[q].setMap(map);
                                console.log('Line 782: markers[q]', markers[q] );
                            }
                            break;
                        case 'bi':
                            if ((markers[q].type == 'men' && (markers[q].orientierung == 'female' || markers[q].orientierung == 'bi')) || (markers[q].type == 'women' && (markers[q].orientierung == 'female' || markers[q].orientierung == 'bi')) ) {
                                markers[q].setMap(map);
                                console.log('Line 790: markers[m]', markers[q] );
                            }
                            break;
                    }

                }
            }
        }
    });


};


var setNavOn = function (nav) {
    $('.'+ nav).addClass('mobile_active');
    $.ajax({
        url: 'sideNav_start.php',
        method: 'POST',
        data: {
            id: localStorage.getItem('id'),
            setnav: nav,
        },
        success: function (response) {
            if (response !== "Error") {
                localStorage.setItem(nav, 1);
                console.log(response, 'setoffnoterror');


            } else {
                console.log(response, 'setoffnoterror');

            }
        }
    });
};

var setNavOff = function (nav) {
    console.log(nav);
    $('.'+nav).removeClass('mobile_active');
    $.ajax({
        url: 'sideNav_end.php',
        method: 'POST',
        data: {
            id: localStorage.getItem('id'),
            setnav: nav,
        },
        success: function (response) {

            if (response !== "Error") {
                localStorage.setItem(nav, 0);
                console.log(response, 'setoffnoterror');


            } else {
                console.log(response, 'setoffnoterror');

            }
        }
    });
};

