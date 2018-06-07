var that = 0;


/****************************************************
 *
 *
 * NAV DISPLAY SELECT ITEMS  - START
 *
 *
 ***************************************************/


/****************************************************
 * SITE: finden.html - START
 ***************************************************/

/**
 * Holt die Benötigten Variablen aus dem localStorage und vergleicht die Werte um je nach Wahrheitswert die einzelnen Menüpunkte und die entsprechenden Icons auf der Karte ein- bzw. auszublenden.
 */
var setMenuPoints = function () {

    var eat = localStorage.getItem('eat') * 1;
    var drink = localStorage.getItem('drink') * 1;
    var party = localStorage.getItem('party') * 1;
    var singles = localStorage.getItem('singles') * 1;
    var geschlecht = localStorage.getItem('geschlecht');
    var orientierung = localStorage.getItem('orientierung');


    /*
    *   EAT
    *   ändert mit Hilfe von jQuery die Menü Klasse und setzt die Marker je nach Wahrheitswert auf die Karte
    */
    if (eat !== 1) {
        $('.eat').removeClass('mobile_active');
    } else {
        $('.eat').addClass('mobile_active');
    }

    $('.eat').on('click', function (event) {
        //event.stopPropagation();
        eat = localStorage.getItem('eat') * 1;
        if (eat === 1) {
            setNavOff('eat');
            for (var q = 0; q < markers.length; q++) {
                if (markers[q].type == 'eat') {
                    markers[q].setMap(null);
                }
            }


        } else {
            setNavOn('eat');
            for (var q = 0; q < markers.length; q++) {
                console.log('!');
                if (markers[q].type == 'eat') {
                    markers[q].setMap(map);
                }
            }
        }
    });


    /*
    *   DRINK
    *   ändert mit Hilfe von jQuery die Menü Klasse und setzt die Marker je nach Wahrheitswert auf die Karte
    */
    if (drink !== 1) {
        $('.drink').removeClass('mobile_active');
    } else {
        $('.drink').addClass('mobile_active');
    }

    $('.drink').on('click', function (event) {
        // event.stopPropagation();
        drink = localStorage.getItem('drink') * 1;
        if (drink === 1) {
            setNavOff('drink');
            for (var q = 0; q < markers.length; q++) {
                if (markers[q].type == 'drink') {
                    markers[q].setMap(null);
                }
            }
        } else {
            setNavOn('drink');
            for (var q = 0; q < markers.length; q++) {
                if (markers[q].type == 'drink') {
                    markers[q].setMap(map);
                }
            }
        }
    });


    /*
    *   PARTY
    *   ändert mit Hilfe von jQuery die Menü Klasse und setzt die Marker je nach Wahrheitswert auf die Karte
    */
    if (party !== 1) {
        $('.party').removeClass('mobile_active');
    } else {
        $('.party').addClass('mobile_active');
    }

    $('.party').on('click', function (event) {
        // event.stopPropagation();
        party = localStorage.getItem('party') * 1;
        if (party === 1) {
            setNavOff('party');
            for (var q = 0; q < markers.length; q++) {
                if (markers[q].type == 'party') {
                    markers[q].setMap(null);
                }
            }
        } else {
            setNavOn('party');
            for (var q = 0; q < markers.length; q++) {
                if (markers[q].type == 'party') {
                    markers[q].setMap(map);
                }
            }
        }
    });

    /*
    *   SINGLES
    *   ändert mit Hilfe von jQuery die Menü Klasse und setzt die Marker je nach Wahrheitswert auf die Karte
    */
    if (singles !== 1) {
        $('.singles').removeClass('mobile_active');
    } else {
        $('.singles').addClass('mobile_active');
    }

    $('.singles').on('click', function (event) {
        // event.stopPropagation();
        singles = localStorage.getItem('singles') * 1;
        if (singles === 1) {
            setNavOff('singles');
            for (var q = 0; q < markers.length; q++) {
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
                            if (markers[q].type == 'women' && (markers[q].orientierung == 'male' || markers[q].orientierung == 'bi') && markers[q].setDislike != 1) {
                                markers[q].setMap(map);
                            }
                            break;
                        case 'male':
                            if (markers[q].type == 'men' && (markers[q].orientierung == 'male' || markers[q].orientierung == 'bi') && markers[q].setDislike != 1) {
                                markers[q].setMap(map);
                            }
                            break;
                        case 'bi':
                            if ((markers[q].type == 'women' && (markers[q].orientierung == 'male' || markers[q].orientierung == 'bi')&& markers[q].setDislike != 1) || (markers[q].type == 'men' && (markers[q].orientierung == 'male' || markers[q].orientierung == 'bi')&& markers[q].setDislike != 1))  {
                                markers[q].setMap(map);
                            }
                            break;
                    }

                }

                if (geschlecht === 'female') {
                    switch (orientierung) {
                        case 'male':
                            if (markers[q].type == 'men' && (markers[q].orientierung == 'female' || markers[q].orientierung == 'bi') && markers[q].setDislike != 1) {
                                markers[q].setMap(map);
                            }
                            break;
                        case 'female':
                            if (markers[q].type == 'women' && (markers[q].orientierung == 'female' || markers[q].orientierung == 'bi') && markers[q].setDislike != 1) {
                                markers[q].setMap(map);
                            }
                            break;
                        case 'bi':
                            if ((markers[q].type == 'men' && (markers[q].orientierung == 'female' || markers[q].orientierung == 'bi') && markers[q].setDislike != 1) || (markers[q].type == 'women' && (markers[q].orientierung == 'female' || markers[q].orientierung == 'bi')&& markers[q].setDislike != 1)) {
                                markers[q].setMap(map);
                            }
                            break;
                    }

                }
            }
        }
    });
};


/**
 * Speichert mit Hilfe von einem AJAX-REQUEST je nach PARAMETER eine 1 bei dem jeweiligen DB-Eintrag und setzt den Menüpunkt damit auf eingeblendet
 *
 * @param nav
 */
var setNavOn = function (nav) {
    $('.' + nav).addClass('mobile_active');
    $.ajax({
        url: 'https://www.lang-thomas.at/resources/php/sideNav_start.php',
        method: 'POST',
        data: {
            id: localStorage.getItem('id'),
            setnav: nav,
        },
        success: function (response) {
            if (response !== "Error") {
                localStorage.setItem(nav, 1);
            } else {
                console.log(response, 'setoffnoterror');

            }
        }
    });
};


/**
 * Speichert mit Hilfe von einem AJAX-REQUEST je nach PARAMETER eine 0 bei dem jeweiligen DB-Eintrag und setzt den Menüpunkt damit auf eingeblendet
 *
 * @param nav
 */
var setNavOff = function (nav) {
    $('.' + nav).removeClass('mobile_active');
    $.ajax({
        url: 'https://www.lang-thomas.at/resources/php/sideNav_end.php',
        method: 'POST',
        data: {
            id: localStorage.getItem('id'),
            setnav: nav,
        },
        success: function (response) {

            if (response !== "Error") {
                localStorage.setItem(nav, 0);
            } else {
                console.log(response, 'setoffnoterror');
            }
        }
    });
};

/****************************************************
 * SITE: finden.html - ENDE
 ***************************************************/


/****************************************************
 *
 *
 * NAV DISPLAY SELECT ITEMS - ENDE
 *
 *
 ***************************************************/


/****************************************************
 *
 *
 * GOOGLE MAPS - START
 *
 *
 ***************************************************/


/****************************************************
 * Globale Variablen Google Maps - START
 ***************************************************/


var map;
var myself;
var marker;
var gps = 0;


//Zoom-level der Google-Map
var zoom = 14.5;


// Erzeugt einen leeren Array für die später aufgelisteten Marker.
var markers = [];


// Icon Pfad
var iconsBase = 'resources/img/icons/';


// Icon Object über die Standard Icons
var icons = {
    myself: {
        icon: iconsBase + 'myself.png'
    },
    party: {
        icon: iconsBase + 'red_party.png'
    },
    eat: {
        icon: iconsBase + 'red_cutlery.png'
    },
    drink: {
        icon: iconsBase + 'red_glass.png'
    },
    women: {
        icon: iconsBase + 'red_woman.png',
        like: {icon: iconsBase + 'violet_woman.png'},
        getLike: {icon: iconsBase + 'yellow_woman.png'},
        match: {icon: iconsBase + 'match.png'},

    },
    men: {
        icon: iconsBase + 'red_man.png',
        like: {icon: iconsBase + 'violet_man.png'},
        getLike: {icon: iconsBase + 'yellow_man.png'},
        match: {icon: iconsBase + 'match.png'}
    }
};


// Icon Object über die Highlight Icons
var iconsh = {
    party: {
        icon: iconsBase + 'green_party.png'
    },
    eat: {
        icon: iconsBase + 'green_cutlery.png'
    },
    drink: {
        icon: iconsBase + 'green_glass.png'
    },
    women: {
        icon: iconsBase + 'green_woman.png'
    },
    men: {
        icon: iconsBase + 'green_man.png'
    }
};


// Optische Gestaltung der Google Map
var styles = [
    {
        "featureType": "all",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "weight": "2.00"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#9c9c9c"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#f2f2f2"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 45
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#eeeeee"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#7b7b7b"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#46bcec"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#c8d7d4"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#070707"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    }
];


/****************************************************
 * Globale Variablen Google Maps - ENDE
 ***************************************************/


/****************************************************
 * Globale Functionen Google Maps - START
 ***************************************************/


/**
 *  Fragt die Geolocation vom User ab.
 *  Bei Erfolg - Überprüfung ob FakeGPS eingeschaltet ist oder nicht.
 *  Wenn deaktiviert - wird eine Google Map mit aktuellen Koordinaten erzeugt.
 *  Wenn aktiviert - werden die Fake Daten genommen.
 *  Bei Error - Callbackfunktion mit default Werten für Wien.
 *
 *  @param function startPosition
 *  @param callback-function defaultPosition
 *  @return void (es soll kein Wert zurückgegeben werden. Macht klar das die Funktion nur eine Aktion ausführt, aber kein Ergebnis produziert.)
 *
 */
function getStartMap() {
    navigator.geolocation.getCurrentPosition(startPosition, defaultPosition);
}


/**
 * Erzeugt eine Google Map mit Geolocation-Daten des Users
 *
 * @param position
 * @void
 */
function startPosition(position) {
    var fakeGPS = localStorage.getItem('fakeGPS') * 1;
    var fakeGPSlat = localStorage.getItem('lat') * 1;
    var fakeGPSlng = localStorage.getItem('lng') * 1;


    if (fakeGPS === 0) {

        // Konstruktor erzeugt eine neue Map
        map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: position.coords.latitude, lng: position.coords.longitude},
            zoom: zoom,                 // Definiert den Zoom-Level der Karte
            minZoom: zoom,
            maxZoom: zoom,
            gestureHandling: 'greedy',
            styles: styles,             // Definiert das Kartenstyling
            // scrollwheel: false,      // Deaktivert das Scrollrad - um Zoomen zu verhindern
            mapTypeControl: false,      // Deaktiviert die verschiedenen Karten Typen
            disableDefaultUI: true      // Deaktiviert die Steuerelemente z.B. Zoom
        });

        //Erzeugt ein Marker Objekt für den Standort des Users
        myself = new google.maps.Marker({
            position: {lat: position.coords.latitude, lng: position.coords.longitude},
            title: 'wunderschön',
            map: map, // setzt den Marker auf die Karte
            icon: {
                url: icons.myself.icon,
                scaledSize: new google.maps.Size(40, 40)
            },
            animation: google.maps.Animation.DROP
        });

        /**
         * Speichert in DB die aktuelle Position des Users und setzt die neue Position des Users auf der Karte.
         * @param position
         */
        var updaterealgps = function (position) {
            $.ajax({
                url: 'https://www.lang-thomas.at/resources/php/mapdata_gpsupdate.php',
                method: 'POST',
                data: {
                    id: localStorage.getItem('id'),
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                },
                success: function (response) {
                    if (response !== "Error") {
                        console.log('saved');
                    } else {
                        console.log(response, 'error');
                    }
                }
            });


            myself.setPosition({
                lat: position.coords.latitude, lng: position.coords.longitude
            });

        };

        /**
         * Callbackfunktion für navigator.geolocation im Falle eines Errors erhaltet man Fehlermeldung in Console
         * @param err
         */
        function error(err) {
            console.log('ERROR(' + err.code + '): ' + err.message);
        }

        /**
         * Optionen für navigator.geolocation.
         */
        options = {
            enableHighAccuracy: false,
            maximumAge: 10000
        };


        navigator.geolocation.watchPosition(updaterealgps, error, options);


    } else {

        /**
         * Erzeugt eine neue Karte mit den FakeGPS Daten inlusive Marker des Users im Zentrum
         * @type {google.maps.Map}
         */
        map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: fakeGPSlat, lng: fakeGPSlng},
            zoom: zoom,                 // Definiert den Zoom-Level der Karte
            minZoom: zoom,
            maxZoom: zoom,
            gestureHandling: 'greedy',
            styles: styles,             // Definiert das Kartenstyling
            // scrollwheel: false,      // Deaktivert das Scrollrad - um Zoomen zu verhindern
            mapTypeControl: false,      // Deaktiviert die verschiedenen Karten Typen
            disableDefaultUI: true      // Deaktiviert die Steuerelemente z.B. Zoom
        });

        //Erzeugt ein Marker Objekt für den Standort des Users
        myself = new google.maps.Marker({
            position: {lat: fakeGPSlat, lng: fakeGPSlng},
            title: 'wunderschön',
            map: map, // setzt den Marker auf die Karte
            icon: {
                url: icons.myself.icon,
                scaledSize: new google.maps.Size(40, 40)
            },
            animation: google.maps.Animation.DROP
        });
        //myself.setMap(map);  // setzt den Marker auf die Karte

    }

    gps = 1;

    showListings();
}



/**
 * Erzeugt eine Google Map mit default Werten für Wien ohne USER-Marker
 *
 * @returns void
 */
function defaultPosition() {
    // Konstruktor erzeugt eine neue Map
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 48.210033, lng: 16.363449},
        zoom: zoom,
        minZoom: zoom,
        maxZoom: zoom,
        styles: styles,
        // gestureHandling: 'cooperative',
        mapTypeControl: false,
        disableDefaultUI: true
    });


}


/**
 * Wird als Callback-Funktion aufgerufen, wenn die Google-API bereit ist.
 * Initialisiert die Google Maps
 * Erzeugt die Marker je nach Wahrheitswert und schiebt sie in den markers-Array.
 * Überprüft anschließend anhand der match-db-Daten die Match-Logik und setzt die entsprechenden Marker je nach Wahrheitswert auf die Karte.
 *
 * @returns void
 */
function initMap() {
    var largeInfowindow = new google.maps.InfoWindow();

    getStartMap();

    $.ajax({
        url: 'https://www.lang-thomas.at/resources/php/mapdata_show.php',
        method: 'POST',
        data: {
            id: localStorage.getItem('id')
        },
        success: function (responseall) {
            var parseData = JSON.parse(responseall);


            $.ajax({
                url: 'https://www.lang-thomas.at/resources/php/mapdata_likefromdb.php',
                method: 'POST',
                data: {
                    id: localStorage.getItem('id')
                },
                success: function (responsematch) {
                    var parseDataMatch = JSON.parse(responsematch);

                    // In der for-Schleife wird der locations-Array verwendet, um einen Array von Markern beim Initialisieren zu erzeugen
                    for (var i = 0; i < parseData.length; i++) {
                        // Bekommt die Position vom locations-Array.
                        var latcords = parseData[i].lat * 1;
                        var lngcords = parseData[i].lng * 1;
                        var vorname = parseData[i].vorname;
                        var nachname = parseData[i].nachname;


                        /**
                         * Abfrage ob Marker.type EAT, DRINK oder PARTY ist.
                         * Wenn ja werden die Marker in den Informationen im Markers-Array gespeichert.
                         */
                        if (parseData[i].type === 'eat' || parseData[i].type === 'drink' || parseData[i].type === 'party') {

                            var title = parseData[i].title;
                            var content = parseData[i].content;

                            // Erzeugt einen Marker pro Location.
                            marker = new google.maps.Marker({
                                position: {lat: latcords, lng: lngcords},
                                title: title,
                                //map: map,
                                icon: {
                                    url: icons[parseData[i].type].icon,
                                    scaledSize: new google.maps.Size(40, 40)
                                },
                                animation: google.maps.Animation.DROP,
                                id: i,
                                type: parseData[i].type,
                                content: content
                            });
                        }


                        /**
                         * Abfrage ob Marker.type EAT, DRINK oder PARTY ist.
                         * Wenn ja werden die Marker in den Informationen im markers-Array gespeichert.
                         */
                        if (parseData[i].type === 'women' || parseData[i].type === 'men') {

                            marker = new google.maps.Marker({
                                position: {lat: latcords, lng: lngcords},
                                title: vorname + ' ' + nachname,
                                //map: map,
                                icon: {
                                    url: icons[parseData[i].type].icon,
                                    scaledSize: new google.maps.Size(40, 40)
                                },
                                animation: google.maps.Animation.DROP,
                                id: i,
                                type: parseData[i].type,
                                geburtsdatum: parseData[i].geburtsdatum,
                                geschlecht: parseData[i].geschlecht,
                                orientierung: parseData[i].orientierung,
                                userpic: parseData[i].picuserpfad,
                                vorname: parseData[i].vorname,
                                db_id: parseData[i].id
                            });


                        }


                        // Schiebt den Marker bzw. die Marker in den markers-Array.
                        markers.push(marker);



                        /**Erzeugt einen Marker pro Location.
                         * Je nach Wahreitswert werden unterschiedliche Daten den Marker zusätzlich zugewiesen.
                         */
                        for (var j = 0; j < parseDataMatch.length; j++) {

                            //Ich like
                            if (markers[i].db_id === parseDataMatch[j].user2_id && parseDataMatch[j].user1_choose * 1 === 1 && parseDataMatch[j].user2_choose * 1 !== 1) {
                                markers[i].icon.url = icons[parseData[i].type].like.icon;
                                markers[i].setLike = 1;
                                markers[i].setMatch = 0;
                                markers[i].setGetLike = 0;
                                markers[i].setDislike = 0;
                            }

                            //Ich like und gegenüber liked zurück
                            if (markers[i].db_id === parseDataMatch[j].user2_id && parseDataMatch[j].user1_choose * 1 === 1 && parseDataMatch[j].user2_choose * 1 === 1) {
                                markers[i].icon.url = icons[parseData[i].type].match.icon;
                                markers[i].setLike = 0;
                                markers[i].setMatch = 1;
                                markers[i].setGetLike = 0;
                                markers[i].setDislike = 0;
                                markers[i].setMe = 1;

                            }

                            //gegenüber hat geliked und ich like zurück
                            if (markers[i].db_id === parseDataMatch[j].user1_id && parseDataMatch[j].user1_choose * 1 === 1 && parseDataMatch[j].user2_choose * 1 === 1) {
                                markers[i].icon.url = icons[parseData[i].type].match.icon;
                                markers[i].setLike = 0;
                                markers[i].setMatch = 1;
                                markers[i].setGetLike = 0;
                                markers[i].setDislike = 0;
                                markers[i].setMe = 2;

                            }

                            //gegenüber hat geliked
                            if (markers[i].db_id === parseDataMatch[j].user1_id && parseDataMatch[j].user1_choose * 1 === 1 && parseDataMatch[j].user2_choose * 1 !== 1) {
                                markers[i].icon.url = icons[parseData[i].type].getLike.icon;
                                markers[i].setLike = 0;
                                markers[i].setMatch = 0;
                                markers[i].setGetLike = 1;
                                markers[i].setDislike = 0;
                                markers[i].setMe = 2;

                            }


                            // einer von beiden hat bereits disliked
                            if ((markers[i].db_id === parseDataMatch[j].user1_id || markers[i].db_id === parseDataMatch[j].user2_id) &&
                                (parseDataMatch[j].user1_choose * 1 === 2 || parseDataMatch[j].user2_choose * 1 == 2)) {
                                markers[i].visible = false;
                                console.log('Line 761: parseDataMatch[j].user2_choose * 1 ', parseDataMatch[j].user2_choose);
                                markers[i].setLike = 0;
                                markers[i].setMatch = 0;
                                markers[i].setGetLike = 0;
                                markers[i].setDislike = 1;

                            }


                        }


                        /**
                         * Erzeugt einen onclick-Event um bei jedem Marker ein infowindow öffnen zu können.
                         * Dazu wird die Funktion populateInfoWindow aufgerufen
                         *
                         * @function populateInfoWindow
                         * @param this
                         * @param largeInfowindow
                         * @event marker.addListener click
                         */
                        marker.addListener('click', function () {

                            populateInfoWindow(this, largeInfowindow);

                        });


                    }

                    // Setzt die Marker je nach Wahrheitswert auf die Karte
                    showListings();

                }  // success match daten
            }); //ajax success match daten
        }  // success komplette daten
    }); // ajax komplette daten

}


/**
 * Die Funktion populateInfoWindow veröffentlicht den infowindow wenn der Marker geklickt wird.
 * Es kann immer nur ein infowindow geöffnet sein, welches sich an der Position öffnet an der der jeweilige Marker geklickt wurde.
 * @param marker
 * @param infowindow
 * @void
 */
function populateInfoWindow(marker, infowindow) {
    // Überprüft ob das infowindow nicht bereits bei dem Marker geöffnet wurde.
    if (infowindow.marker != marker) {

        //Falls alter Marker noch im Speicher wird er geschlossen und auf 0 gesetzt.
        if (that != 0) {
            that.close();
        } else {
            that = 0;
        }


        /**
         * speichert den Inhalt vom infowindow in einer globalen Variable um später darauf zugreifen zu können
         */
        that = infowindow;


        infowindow.setContent('');
        infowindow.marker = marker;

        // Überprüft ob eine Art von Like vorhanden ist.
        // Falls TRUE behalten die Icons ihre definierte Farbe bzw. Bild
        // Falls FALSE handelt es sich um Location Marker, welche ihre Farbe beim Markieren ändern sollen
        if (marker.setLike === 1 || marker.setGetLike === 1 || marker.setDislike === 1 || marker.setMatch === 1) {

        } else {
            marker.setIcon({
                url: iconsh[[marker.type]].icon,
                scaledSize: new google.maps.Size(40, 40)
            });
        }


        // Überprüft ob es sich um Marker des Types men oder women handelt
        // Falls TRUE wird der Marker Content vorbereitet auf die entsprechende Ausgabe.
        if (marker.type == 'men' || marker.type == 'women') {

            var infoGeschlecht;
            var infoOrientierung;
            console.log('Line 886: marker.geschlecht', marker.geschlecht);
            console.log('Line 887: marker.orientierung', marker.orientierung);
            switch (marker.geschlecht) {
                case 'female':
                    infoGeschlecht = 'Frau';
                    break;
                case 'male':
                    infoGeschlecht = 'Mann';
                    break;
            }

            // Übersetzt die Orientierung des Users
            switch (marker.orientierung) {
                case 'female':
                    infoOrientierung = 'Frauen';
                    break;
                case 'male':
                    infoOrientierung = 'Männer';
                    break;
                case 'bi':
                    infoOrientierung = 'Frauen und Männer';
                    break;
            }

            // Konvertiert den Datumsstring aus der Datenbank in das Ausgabeformat TT.MM.JJJJ
            var datedb = marker.geburtsdatum;
            var j = datedb.slice(0, 4);
            console.log(j);
            var m = datedb.slice(5, 7);
            console.log(m);
            var d = datedb.slice(8, 10);
            console.log(d);
            var dateconv = (d + '.' + m + '.' + j);

            //   Content für Infowindow wenn marker.setLike === 1
            if (marker.setLike == 1) {
                infowindow.setContent(
                    `<div class="info_window">
                        
                        <h2 class="info_title">${marker.title}</h2>
                        
                        <div class="info_content">
                            <div class="info_pic">
                                <img src="${marker.userpic}" alt="${marker.title}">
                            </div>       
                        </div>
                        
                        <div class="info_box">
                            <h3 class="info_box-title">Information über ${marker.title}</h3>
                            <p class="info_box_content info_box_desc">Geburtsdatum:</p>
                            <p class="info_box_content">${dateconv}</p>
                            <p class="info_box_content info_box_desc">Geschlecht: </p>
                            <p class="info_box_content">${infoGeschlecht}</p>
                            <p class="info_box_content info_box_desc">Sucht nach: </p>
                            <p class="info_box_content">${infoOrientierung}</p>
                        </div>
                        
                        <div class="match_hinweis">
                        <p>Du würdest ${marker.vorname} gerne kennen lernen.</p>
                        </div>                            
                       
                    </div>`);

                //   Content für Infowindow wenn marker.setGetLike === 1
            } else if (marker.setGetLike === 1) {

                infowindow.setContent(
                    `<div class="info_window">
                        
                        <h2 class="info_title">${marker.title}</h2>
                        
                        <div class="info_content">
                            
                            <div class="info_pic">
                                <img src="${marker.userpic}" alt="${marker.title}">
                            </div>
                            
                        </div>

                        <div class="info_box">

                            <h3 class="info_box-title">Information über ${marker.title}</h3>
                            <p class="info_box_content info_box_desc">Geburtsdatum:</p>
                            <p class="info_box_content">${dateconv}</p>
                            <p class="info_box_content info_box_desc">Geschlecht: </p>
                            <p class="info_box_content">${infoGeschlecht}</p>
                            <p class="info_box_content info_box_desc">Sucht nach: </p>
                            <p class="info_box_content">${infoOrientierung}</p>

                        </div>

                        <div class="match_hinweis">
                            
                            ${marker.vorname} findet dich interessant. Was haltest du davon?
                       
                        </div>

                        <div class="infobuttons">
                            <button id="info_like" data-db="${marker.db_id}">Kennenlernen</button>
                            <button id="info_dislike" data-db="${marker.db_id}">Entfernen</button>
                            <button id="choose" disabled>Ja</button>
                        </div>
                        
                        
                </div>`);
                //   Content für Infowindow wenn marker.setMatch === 1
            } else if (marker.setMatch === 1) {
                infowindow.setContent(
                    `<div class="info_window">
                        
                        <h2 class="info_title">${marker.title}</h2>
                        
                        <div class="info_content">
                            <div class="info_pic">
                                <img src="${marker.userpic}" alt="${marker.title}">
                            </div>       
                        </div>
                        
                        <div class="info_box">
                            <h3 class="info_box-title">Information über ${marker.title}</h3>
                            <p class="info_box_content info_box_desc">Geburtsdatum:</p>
                            <p class="info_box_content">${dateconv}</p>
                            <p class="info_box_content info_box_desc">Geschlecht: </p>
                            <p class="info_box_content">${infoGeschlecht}</p>
                            <p class="info_box_content info_box_desc">Sucht nach: </p>
                            <p class="info_box_content">${infoOrientierung}</p>
                        </div>
                        
                        <div class="match_hinweis">
                        Ihr findet einander interessant. Trefft euch doch und lernt einander besser kennen.
                        </div>                            
                       
                       <div class="infobuttons">
                            <button id="info_dislike" data-db="${marker.db_id}">Entfernen</button>
                            <button id="choose" disabled>Ja</button>
                        </div>
                       
                       
                    </div>`);
                //   Content für Infowindow wenn noch kein Like oder Match vorhanden ist
            } else if (marker.setLike !== 1 && marker.setGetLike !== 1 && marker.setMatch !== 1 && marker.setDislike !== 1) {

                infowindow.setContent(
                    `<div class="info_window">
                        <h2 class="info_title">${marker.title}</h2>
                        
                        <div class="info_content">
                            
                            <div class="info_pic">
                                <img src="${marker.userpic}" alt="${marker.title}">
                            </div>
                            
                        </div>
                        
                        <div class="info_box">
                            <h3 class="info_box-title">Information über ${marker.title}</h3>
                            <p class="info_box_content info_box_desc">Geburtsdatum:</p>
                            <p class="info_box_content">${dateconv}</p>
                            <p class="info_box_content info_box_desc">Geschlecht: </p>
                            <p class="info_box_content">${infoGeschlecht}</p>
                            <p class="info_box_content info_box_desc">Sucht nach: </p>
                            <p class="info_box_content">${infoOrientierung}</p>
                        </div>
                        
                        <div class="infobuttons">
                            <button id="info_like" data-db="${marker.db_id}">Kennenlernen</button>
                            <button id="info_dislike" data-db="${marker.db_id}">Entfernen</button>
                            <button id="abschicken" disabled>Ja</button>
                        </div>
                           
                </div>`);
            }
            //   Content für Infowindow wenn es sich um eine Location handelt
        } else {
            /**
             * Erzeugt einen StreetViewService um StreetView in den Infowindow einblenden zu können
             * @type {google.maps.StreetViewService}
             */
            var streetViewService = new google.maps.StreetViewService();
            var radius = 150;
            // Wenn der Status OK ist, was bedeutet, das Panorama wurde gefunden, wird die Position des StreetView-Bildes berechnet und das Panorama ausgegeben
            function getStreetView(data, status) {
                if (status == google.maps.StreetViewStatus.OK) {
                    var nearStreetViewLocation = data.location.latLng;
                    var heading = google.maps.geometry.spherical.computeHeading(
                        nearStreetViewLocation, marker.position);

                    //   Content für Infowindow wenn es sich um eine Location handelt
                    infowindow.setContent(
                        `<div class="info_window">
                        
                            <h2 class="info_title">${marker.title}</h2>
                            
                            <div class="info_content">
                                <div class="streetview">
                                    <div id="pano"></div>
                                    <div class="streetview_hinweis">
                                        Streetview zeigt ein Panorama im Umkreis von 150m der Koordinaten. Es kann durch fehlende Daten passieren, dass das gezeigte Bildmaterial nicht dem gewünschten Gebäude entspricht.  
                                    </div>
                                </div>
                                
                                <div class="info_box">
                                    <h3 class="info_box-title">Information über ${marker.title}</h3>
                                    <p class="info_box_content">${marker.content}</p>
                                </div>
                            </div>
                        </div>`);

                    // Optionen für Panorama. Position und Ausrichtung (pitch ist der Winkel)
                    var panoramaOptions = {
                        position: nearStreetViewLocation,
                        pov: {
                            heading: heading,
                            pitch: 25
                        }
                    };

                    var panorama = new google.maps.StreetViewPanorama(
                        document.getElementById('pano'), panoramaOptions);
                } else {
                    infowindow.setContent(`<div class="info_window">
                        
                            <h2 class="info_title">${marker.title}</h2>
                            
                            <div class="info_content">
                                                                
                                <div class="info_box">
                                    <h3 class="info_box-title">Information über ${marker.title}</h3>
                                    <p class="info_box_content">${marker.content}</p>
                                </div>
                            </div>
                        </div>`);
                }
            }


            // Ruft den StreetViewService auf um das nächstgelegenen StreetView-Panorama, im Radius von 150m (siehe Variable radius weiter oben) um den Marker zu erhalten.
            streetViewService.getPanoramaByLocation(marker.position, radius, getStreetView);

        }
            // Öffnet das infowindow an der richtigen Position.
        infowindow.open(map, marker);

    }


    // Stellt sicher, dass die Marker Eigenschaft gelöscht wird, wenn das infowindow geschlossen wird.
    //Beim Klick auf das X rechts oben im InfoWindow
    infowindow.addListener('closeclick', function () {
        infowindow.close();
        infowindow.marker = null;
        that = 0;
    });

    // Stellt sicher, dass die Marker Eigenschaft gelöscht wird, wenn das infowindow geschlossen wird.
    //Beim Klick auf einen Punkt auf der Karte.
    google.maps.event.addListener(map, "click", function (event) {
        infowindow.close();
        infowindow.marker = null;
        that = 0;
    });


}


/**
 * Liest die localStorage Variablen der Nav-Punkte ab und je nach Wahrheitswert werden die Marker geschlossen oder die richtigen wieder geöffnet.
 */
function showListings() {

    var eat = localStorage.getItem('eat') * 1;
    var drink = localStorage.getItem('drink') * 1;
    var party = localStorage.getItem('party') * 1;
    var singles = localStorage.getItem('singles') * 1;
    var geschlecht = localStorage.getItem('geschlecht');
    var orientierung = localStorage.getItem('orientierung');
    console.log('Line 871: markers', markers);
    for (var e = 0; e < markers.length; e++) {



        // EAT

        if (markers[e].type == 'eat' && eat === 0) {
            markers[e].setMap(null);
        }
        if (markers[e].type == 'eat' && eat === 1) {
            markers[e].setMap(map);
        }


        // DRINK

        if ((markers[e].type == 'drink' && drink === 0)) {
            markers[e].setMap(null);
        }
        if ((markers[e].type == 'drink' && drink === 1)) {
            markers[e].setMap(map);
        }


        // PARTY

        if ((markers[e].type == 'party' && party === 0)) {
            markers[e].setMap(null);
        }
        if ((markers[e].type == 'party' && party === 1)) {
            markers[e].setMap(map);
        }


        // Singles - Logik
        // Überprüft ob markers.typ männlich oder weiblich ist und ob das Icon angezeigt werden soll
        // NEIN
        if ((singles === 0 && (markers[e].type == 'men' || markers[e].type == 'women'))) {
            markers[e].setMap(null);
        }

        // JA
        if ((singles === 1 && (markers[e].type == 'men' || markers[e].type == 'women'))) {

            // Icon-Anzeige-Logik Mann
            if (geschlecht === 'male') {
                switch (orientierung) {
                    case 'female':
                        if (markers[e].type == 'women' && (markers[e].orientierung == 'male' || markers[e].orientierung == 'bi')) {
                            markers[e].setMap(map);
                        }
                        break;

                    case 'male':
                        if (markers[e].type == 'men' && (markers[e].orientierung == 'male' || markers[e].orientierung == 'bi')) {
                            markers[e].setMap(map);
                        }
                        break;

                    case 'bi':
                        console.log('case bi');
                        if ((markers[e].type == 'women' && (markers[e].orientierung == 'male' || markers[e].orientierung == 'bi')) || (markers[e].type == 'men' && (markers[e].orientierung == 'male' || markers[e].orientierung == 'bi'))) {
                            markers[e].setMap(map);
                        }
                        break;
                }

            }


            // Icon-Anzeige-Logik Mann
            if (geschlecht === 'female') {
                switch (orientierung) {
                    case 'male':
                        if (markers[e].type == 'men' && (markers[e].orientierung == 'female' || markers[e].orientierung == 'bi')) {
                            markers[e].setMap(map);
                        }
                        break;
                    case 'female':
                        if (markers[e].type == 'women' && (markers[e].orientierung == 'female' || markers[e].orientierung == 'bi')) {
                            markers[e].setMap(map);
                        }
                        break;
                    case 'bi':
                        if ((markers[e].type == 'men' && (markers[e].orientierung == 'female' || markers[e].orientierung == 'bi')) || (markers[e].type == 'women' && (markers[e].orientierung == 'female' || markers[e].orientierung == 'bi'))) {
                            markers[e].setMap(map);
                        }
                        break;
                }

            }


        }


    }

}

/****************************************************
 *
 *
 * GOOGLE MAPS - ENDE
 *
 *
 ***************************************************/

/****************************************************
 *
 *
 * GOOGLE MAPS - START
 *
 *
 ***************************************************/
var like = 0;
var dislike = 0;


/**
 * Erzeugt die Funktionen und Event-Listener für die Knöpfe im Infowindow und Datenbankeinträge per AJAX-REQUEST
 */
var infowindowMatch = function () {


    /**
     * Überprüft ob der andere Knopf bereits gedrückt wurde, wenn ja, entfernt er die CSS Klasse beim bereits gedrückten Knopf und setzt die CSS Klasse beim neuen Knopf und wechselt die Variable-Werte.
     */
    var info_like_click = function () {

        if (dislike === 1) {
            $('#info_dislike')
                .removeClass('info_dislike_choose');
        }
        $('#info_like')
            .addClass('info_like_choose');
        $('#abschicken').prop('disabled', false);
        $('#choose').prop('disabled', false);

        like = 1;
        dislike = 0;
    };


    /**
     * Überprüft ob der andere Knopf bereits gedrückt wurde, wenn ja entfernt er die CSS Klasse beim bereits gedrückten Knopf und setzt die CSS Klasse beim neuen Knopf und wechselt die Variable-Werte.
     */
    var info_dislike_click = function () {

        if (like === 1) {
            $('#info_like')
                .removeClass('info_like_choose');
        }
        $('#info_dislike')
            .addClass('info_dislike_choose');
        $('#abschicken').prop('disabled', false);
        $('#choose').prop('disabled', false);

        like = 0;
        dislike = 1;

    };

    /**
     * Überprüft ob die Marker noch kein Like besitzen.
     * Falls TRUE setzt er ein setLike auf 1 und verändert die Farbe des Marker bzw bei einem Dislike löscht er die Marker Position mit setMap(null).
     * Danach übergibt er die Werte mittels AJAX-REQUEST an die Datenbank und schließt den Marker in jedem Fall.
     */
    var info_like_abschicken = function () {
        that.close();
        if (that.marker.setLike !== 1 && that.marker.setGetLike !== 1) {
            if (like == 1) {
                that.marker.setLike = 1;
                that.marker.setIcon({
                    url: icons[[that.marker.type]].like.icon,
                    scaledSize: new google.maps.Size(40, 40)
                });
            }
            if (dislike == 1) {
                that.marker.setDislike = 1;
                markers[that.marker.id].setMap(null);
            }

            $.ajax({
                method: 'POST',
                url: 'https://www.lang-thomas.at/resources/php/mapdata_liketodb.php',
                crossDomain: true,
                data: {
                    id: localStorage.getItem('id'),
                    like: like,
                    dislike: dislike,
                    fk_id: that.marker.db_id
                },
                success: function (response) {
                    if (response !== "Error") {
                        console.log(response, 'saveNOerror');
                    } else {
                        console.log(response, 'saveerror');
                    }
                }
            })
            ;
            that.marker = null;
            that = 0;
        }

    };

    /**
     * Überprüft ob die Marker ein setGetLike oder ein setLike haben und setzt den Marker auf Match und ändert die Art des Icons bzw. bei einem Dislike löscht er die Marker Position mit setMap(null).
     * Danach übergibt er die Werte mittels AJAX-REQUEST an die Datenbank und schließt den Marker in jedem Fall.
     */
    var info_match_click = function () {
        that.close();
        if (that.marker.setGetLike === 1) {
            if (like == 1) {
                that.marker.setMatch = 1;
                that.marker.setGetLike = 0;
                that.marker.setIcon({
                    url: icons[[that.marker.type]].match.icon,
                    scaledSize: new google.maps.Size(40, 40)
                });
            }
            if (dislike == 1) {
                that.marker.setDislike = 1;
                markers[that.marker.id].setMap(null);
            }

            $.ajax({
                method: 'POST',
                url: 'https://www.lang-thomas.at/resources/php/mapdata_matchtodb.php',
                crossDomain: true,
                data: {
                    id: localStorage.getItem('id'),
                    like: like,
                    dislike: dislike,
                    fk_id: that.marker.db_id
                },
                success: function (response) {
                    if (response !== "Error") {
                        console.log(response, 'saveNOerror');
                    } else {
                        console.log(response, 'saveerror');
                    }
                }
            });

        } else if (that.marker.setMatch === 1) {

            if (dislike == 1) {
                that.marker.setDislike = 1;
                markers[that.marker.id].setMap(null);
            }

            $.ajax({
                method: 'POST',
                url: 'https://www.lang-thomas.at/resources/php/mapdata_matchtodb.php',
                crossDomain: true,
                data: {
                    id: localStorage.getItem('id'),
                    like: like,
                    dislike: dislike,
                    fk_id: that.marker.db_id,
                    me: that.marker.setMe
                },
                success: function (response) {
                    if (response !== "Error") {
                        console.log(response, 'saveNOerror');
                    } else {
                        console.log(response, 'saveerror');
                    }
                }
            });

        }
        that.marker = null;
        that = 0;

    };

    /**
     * Ruft beim Klick auf den Button die Funktion info_like_click auf.
     *
     * @event #info_like on click
     */
    $(document).on('click', '#info_like', info_like_click);

    /**
     * Ruft beim Klick auf den Button die Funktion info_dislike_click auf.
     *
     * @event #info_dislike on click
     */
    $(document).on('click', '#info_dislike', info_dislike_click);

    /**
     * Ruft beim Klick auf den Button die Funktion info_like_abschicken auf.
     *
     * @event #abschicken on click
     */
    $(document).on('click', '#abschicken', info_like_abschicken);

    /**
     * Ruft beim Klick auf den Button die Funktion info_match_click auf.
     *
     * @event #choose on click
     */
    $(document).on('click', '#choose', info_match_click)
};


// $(document).on('click', '.test', function () {
//     $('.testinfowindow').css({'display': 'none'});
// });
infowindowMatch();
/****************************************************
 *
 *
 * GOOGLE MAPS - ENDE
 *
 *
 ***************************************************/


