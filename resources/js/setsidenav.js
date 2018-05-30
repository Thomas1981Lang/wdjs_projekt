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

    if (eat !== 1) {
        $('.eat').removeClass('mobile_active');
    } else {
        $('.eat').addClass('mobile_active');
    }

        $('.eat').on('click', function (event) {
            event.stopPropagation();
            eat = localStorage.getItem('eat') * 1;
            console.log(eat, 'eat at click');
            if (eat === 1) {
                setNavOff('eat')
            } else {
                setNavOn('eat')
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
            setNavOff('drink')
        } else {
            setNavOn('drink')
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
            setNavOff('party')
        } else {
            setNavOn('party')
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
            setNavOff('singles')
        } else {
            setNavOn('singles')
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

