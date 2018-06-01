/****************************************************
 *
 *
 * MOBILE NAV und FINDEN NAV- START
 *
 *
 ***************************************************/


/****************************************************
 * Mobile Nav links - START
 ***************************************************/
$('.mobile_nav').on('click', function (event) {
    event.stopPropagation();
    $('.mobile_nav_wrapper').toggleClass('open');
    $('.mobile_nav_background').toggleClass('open');
    if ($('.mobile_login_wrapper').hasClass('open')) {
        $('.mobile_login_wrapper').toggleClass('open');
        $('.mobile_login_background').toggleClass('open');
    }
});
/****************************************************
 * Mobile Nav links - ENDE
 ***************************************************/


/****************************************************
 * Mobile Nav rechts - START
 ***************************************************/
$('.mobile_login').on('click', function (event) {
    event.stopPropagation();
    $('.mobile_login_wrapper').toggleClass('open');
    $('.mobile_login_background').toggleClass('open');
    if ($('.mobile_nav_wrapper').hasClass('open')) {
        $('.mobile_nav_wrapper').toggleClass('open');
        $('.mobile_nav_background').toggleClass('open');
    }
});
/****************************************************
 * Mobile Nav rechts - ENDE
 ***************************************************/

/****************************************************
 * Finden Nav  - START
 ***************************************************/

/**
 *
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
    */
    if (eat !== 1) {
        $('.eat').removeClass('mobile_active');
    } else {
        $('.eat').addClass('mobile_active');
    }

    $('.eat').on('click', function (event) {
        event.stopPropagation();
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
    */
    if (drink !== 1) {
        $('.drink').removeClass('mobile_active');
    } else {
        $('.drink').addClass('mobile_active');
    }

    $('.drink').on('click', function (event) {
        event.stopPropagation();
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
    */
    if (party !== 1) {
        $('.party').removeClass('mobile_active');
    } else {
        $('.party').addClass('mobile_active');
    }

    $('.party').on('click', function (event) {
        event.stopPropagation();
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
    */
    if (singles !== 1) {
        $('.singles').removeClass('mobile_active');
    } else {
        $('.singles').addClass('mobile_active');
    }

    $('.singles').on('click', function (event) {
        event.stopPropagation();
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
                            if ((markers[q].type == 'men' && (markers[q].orientierung == 'male' || markers[q].orientierung == 'bi')) || (markers[q].type == 'women' && (markers[q].orientierung == 'male' || markers[q].orientierung == 'bi'))) {
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
                            }
                            break;
                        case 'female':
                            if (markers[q].type == 'women' && (markers[q].orientierung == 'female' || markers[q].orientierung == 'bi')) {
                                markers[q].setMap(map);
                            }
                            break;
                        case 'bi':
                            if ((markers[q].type == 'men' && (markers[q].orientierung == 'female' || markers[q].orientierung == 'bi')) || (markers[q].type == 'women' && (markers[q].orientierung == 'female' || markers[q].orientierung == 'bi'))) {
                                markers[q].setMap(map);
                            }
                            break;
                    }

                }
            }
        }
    });
};


var setNavOn = function (nav) {
    $('.' + nav).addClass('mobile_active');
    $.ajax({
        url: 'resources/php/sideNav_start.php',
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

var setNavOff = function (nav) {
    $('.' + nav).removeClass('mobile_active');
    $.ajax({
        url: 'resources/php/sideNav_end.php',
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
 * Finden Nav - ENDE
 ***************************************************/


/****************************************************
 *
 *
 * MOBILE NAV - ENDE
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
var infoWin = [];


//Zoom-level der Google-Map
var zoom = 13.5;


// Erzeugt mir einen leeren Array für die später aufgelisteten Marker.
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
        icon: iconsBase + 'red_woman.png'
    },
    men: {
        icon: iconsBase + 'red_man.png'
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
 * Globale Variablen Google Maps - START
 ***************************************************/


/**
 *  Fragt die Geolocation vom User ab.
 *  Bei Erfolg - wird eine Google Map mit aktuellen Koordinaten erzeugt
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
    // Konstruktor erzeugt eine neue Map
    var fakeGPS = localStorage.getItem('fakeGPS') * 1;
    var fakeGPSlat = localStorage.getItem('lat') * 1;
    var fakeGPSlng = localStorage.getItem('lng') * 1;


    if (fakeGPS === 0) {
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


    } else {
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


// var getNewPosition = setInterval(function(){
//     console.log('test');
//     watchGPSPosition();
// },5000);


/**
 * Erzeugt eine Google Map mit default Werten für Wien
 *
 * @void
 */
function defaultPosition() {
    // Konstruktor erzeugt eine neue Map
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 48.210033, lng: 16.363449},
        zoom: zoom,
        minZoom: zoom,
        maxZoom: zoom,
        styles: styles,
        gestureHandling: 'greedy',
        mapTypeControl: false,
        disableDefaultUI: true
    });


}


/**
 * Wird als Callback-Funktion aufgerufen, wenn die Google-API bereit ist.
 * Initialisiert die Google Maps
 * Erzeugt die Marker
 *
 * @void
 */
function initMap() {
    var largeInfowindow = new google.maps.InfoWindow();

    getStartMap();

    $.ajax({
        url: 'resources/php/mapdata_show.php',
        method: 'POST',
        data: {
            id: localStorage.getItem('id')
        },
        success: function (response) {
            var parseData = JSON.parse(response);


            // In der for-Schleife wird der locations-Array verwendet, um einen Array von Markern beim initialiesieren zu erzeugen
            for (var i = 0; i < parseData.length; i++) {
                // Bekommt die Position vom locations-Array.
                var latcords = parseData[i].lat * 1;
                var lngcords = parseData[i].lng * 1;

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

                if (parseData[i].type === 'women' || parseData[i].type === 'men') {
                    var vorname = parseData[i].vorname;
                    var nachname = parseData[i].nachname;

                    // Erzeugt einen Marker pro Location.
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


                // Erzeugt einen onclick-Event um den bei jeden Marker ein infowindow öffnen zu können.
                marker.addListener('click', function () {
                    marker.setIcon({
                            url: icons[[marker.type]].icon,
                            scaledSize: new google.maps.Size(40, 40)
                        }
                    );


                    populateInfoWindow(this, largeInfowindow);


                });


            }
            showListings();

        }

    });

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

        infowindow.setContent('');
        infowindow.marker = marker;

        marker.setIcon({
            url: iconsh[[marker.type]].icon,
            scaledSize: new google.maps.Size(40, 40)
        });

        // Stellt sicher das die Marker Eigenschaft gelöscht wird, wenn das infowindow geschlossen wird.
        infowindow.addListener('closeclick', function () {

            infowindow.marker = null;
            marker.setIcon({
                url: icons[[marker.type]].icon,
                scaledSize: new google.maps.Size(40, 40)
            });
        });


        // infowindow.addListener('closeclick', function () {
        //     infowindow.marker = null;
        // });

        if (marker.type == 'men' || marker.type == 'women') {
            infowindow.setContent(
                `<div class="info_window">
                        <h2 class="info_title">${marker.title}</h2>
                        
                        <div class="info_content">
                            <div class="info_pic">
                            <img src="${marker.userpic}" alt="${marker.title}">
                            </div>
                            
                            <div class="streetview_hinweis">
                            ${marker.vorname} würde sich freuen dich gerne kennnen lernen.
                            </div>
                        </div>
                            <div class="info_box">
                                <h3 class="info_box-title">Information über ${marker.title}</h3>
                                <p class="info_box_content">Geburtsdatum: ${marker.geburtsdatum}</p>
                                <p class="info_box_content">Geschlecht: ${marker.geschlecht}</p>
                                <p class="info_box_content">Sucht nach: ${marker.orientierung}</p>
                            </div>
                        <div class="infobuttons" data-db="${marker.db_id}">
                            <button id="info_like" >Kennenlernen</button>
                            <button id="info_dislike">Entfernen</button>
                        </div>
                        
                        
                </div>`);


            infowindow.open(map, marker);
        } else {


            var streetViewService = new google.maps.StreetViewService();
            var radius = 150;
            // In case the status is OK, which means the pano was found, compute the
            // position of the streetview image, then calculate the heading, then get a
            // panorama from that and set the options
            function getStreetView(data, status) {
                if (status == google.maps.StreetViewStatus.OK) {
                    var nearStreetViewLocation = data.location.latLng;
                    var heading = google.maps.geometry.spherical.computeHeading(
                        nearStreetViewLocation, marker.position);
                    infowindow.setContent(
                        `<div class="info_window">
                        <h2 class="info_title">${marker.title}</h2>
                        <div class="info_content">
                            <div class="streetview">
                            <div id="pano"></div>
                            <div class="streetview_hinweis">
                            Streetview zeigt ein Panorama im Umkreis von 150m der Koordinaten.
                            Es kann durch fehlende Daten passieren, dass das gezeigte Bildmaterial nicht dem gewünschten Gebäude entspricht.  
                            </div>
                            </div>
                            <div class="info_box"">
                                <h3 class="info_box-title">Information über ${marker.title}</h3>
                                <p class="info_box_content">${marker.content}</p>
                            </div>
                        </div>
                    </div>`);
                    var panoramaOptions = {
                        position: nearStreetViewLocation,
                        pov: {
                            heading: heading,
                            pitch: 30
                        }
                    };
                    var panorama = new google.maps.StreetViewPanorama(
                        document.getElementById('pano'), panoramaOptions);
                } else {
                    infowindow.setContent('<div>' + marker.title + '</div>' +
                        '<div>No Street View Found</div>');
                }
            }

            // Use streetview service to get the closest streetview image within
            // 50 meters of the markers position
            streetViewService.getPanoramaByLocation(marker.position, radius, getStreetView);
            // Open the infowindow on the correct marker.
            infowindow.open(map, marker);

        }

    }

    localStorage.setItem('test', marker.db_id);
    google.maps.event.addListener(map, "click", function (event) {
        infowindow.close();
        infowindow.marker = null;
        marker.setIcon({
            url: icons[[marker.type]].icon,
            scaledSize: new google.maps.Size(40, 40)
        });

    });

}


function showListings() {
    var eat = localStorage.getItem('eat') * 1;
    var drink = localStorage.getItem('drink') * 1;
    var party = localStorage.getItem('party') * 1;
    var singles = localStorage.getItem('singles') * 1;
    var geschlecht = localStorage.getItem('geschlecht');
    var orientierung = localStorage.getItem('orientierung');

    for (var e = 0; e < markers.length; e++) {
        if (markers[e].type == 'eat' && eat === 0) {
            markers[e].setMap(null);
        } else if ((markers[e].type == 'drink' && drink === 0)) {
            markers[e].setMap(null);
        } else if ((markers[e].type == 'party' && party === 0)) {
            markers[e].setMap(null);
        } else if ((singles === 0 && (markers[e].type == 'men' || markers[e].type == 'women'))) {
            markers[e].setMap(null);
        } else {
            if (geschlecht === 'male') {
                switch (orientierung) {
                    case 'female':
                        if (markers[e].type == 'women' && (markers[e].orientierung == 'male' || markers[e].orientierung == 'bi')) {
                            markers[e].setMap(map);
                        } else {
                            markers[e].setMap(null);
                        }
                        break;
                    case 'male':
                        if (markers[e].type == 'men' && (markers[e].orientierung == 'male' || markers[e].orientierung == 'bi')) {
                            markers[e].setMap(map);
                        } else {
                            markers[e].setMap(null);
                        }
                        break;
                    case 'bi':
                        if ((markers[e].type == 'men' && (markers[e].orientierung == 'female' || markers[e].orientierung == 'bi')) || (markers[e].type == 'women' && (markers[e].orientierung == 'female' || markers[e].orientierung == 'bi'))) {
                            markers[e].setMap(map);
                        } else {
                            markers[e].setMap(null);
                        }
                        break;
                }

            }

            if (geschlecht === 'female') {
                switch (orientierung) {
                    case 'male':
                        if (markers[e].type == 'men' && (markers[e].orientierung == 'female' || markers[e].orientierung == 'bi')) {
                            markers[e].setMap(map);

                        } else {
                            markers[e].setMap(null);
                        }
                        break;
                    case 'female':
                        if (markers[e].type == 'women' && (markers[e].orientierung == 'female' || markers[e].orientierung == 'bi')) {
                            markers[e].setMap(map);
                        } else {
                            markers[e].setMap(null);
                        }
                        break;
                    case 'bi':
                        if ((markers[e].type == 'men' && (markers[e].orientierung == 'female' || markers[e].orientierung == 'bi')) || (markers[e].type == 'women' && (markers[e].orientierung == 'female' || markers[e].orientierung == 'bi'))) {
                            markers[e].setMap(map);
                        } else {
                            markers[e].setMap(null);
                        }
                        break;
                }

            }


            markers[e].setMap(map);

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
        url: 'resources/php/signin.php',
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


/****************************************************
 *
 *
 * LOGIN - START
 *
 *
 ***************************************************/



$("#login").on('click', function (event) {
    event.preventDefault();
    var username = $("#username").val();
    var password = $("#password").val();


    $.ajax({
        url: 'resources/php/login.php',
        method: 'POST',
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


                if (parseData.picuser * 1 === 0 || parseData.picuserbackground * 1 === 0) {
                     window.location.href = "profil.html"
                } else {
                     window.location.href = "finden.html";
                }
            } else {
                console.log(data);
                $(".error").show();
            }
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


/****************************************************
 *
 *
 * LOGOUT - START
 *
 *
 ***************************************************/



$(".abmelden").on('click', function () {

    localStorage.clear();
    localStorage.setItem("accepted", 1);
    window.location.href = "index.html";

});


/****************************************************
 *
 *
 * LOGOUT - ENDE
 *
 *
 ***************************************************/


/****************************************************
 *
 *
 * ACCEPT NOTE - START
 *
 *
 ***************************************************/


var accepted = function () {
    var acceptNote = localStorage.accepted * 1;

    if (acceptNote !== 1) {

        if (window.location.pathname !== '/WDJS/index.html') {
            //      if (window.location.pathname !== '/index.html') {
             window.location.href = "index.html";
        } else {
            $('.accept').css("display", "flex")
        }
    } else {
        console.log('ja - akzeptiert');
    }

};
accepted();

$('.accept_button').on('click', function () {
    localStorage.setItem("accepted", 1);
    $('.accept').css("display", "none")
});

$('.deny_button').on('click', function () {
    window.location.href = "https://google.at";
});

/****************************************************
 *
 *
 * ACCEPT NOTE - ENDE
 *
 *
 ***************************************************/


/****************************************************
 *
 *
 * PROTOCOL - START
 *
 *
 ***************************************************/


// var checkprotocol = function () {
//     var protocol = window.location.protocol;
//     console.log(window.location.protocol);
//     if (protocol !== 'https:') {
//         console.log(window.location.protocol);
//         window.location.protocol = 'https:'
//     }
// };
// checkprotocol();


/****************************************************
 *
 *
 * PROTOCOL - ENDE
 *
 *
 ***************************************************/


/****************************************************
 *
 *
 * PROFIL DATEN ANZEIGEN - START
 *
 *
 ***************************************************/

var fillProfilData = function () {

        $.ajax({
                url: 'resources/php/profil_show.php',
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
        url: 'resources/php/profil_fakeGPSstart.php',
        method: 'POST',
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
        url: 'resources/php/profil_fakeGPSend.php',
        method: 'POST',
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
    $.ajax({
        url: 'resources/php/profil_fakeGPSsave.php',
        method: 'POST',
        data: {
            id: localStorage.getItem('id'),
            lat: $('input[name="lat"]').val(),
            lng: $('input[name="lng"]').val()
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
 * PROFIL DATEN LÖSCHEN - START
 *
 *
 ***************************************************/

var deleteProfilData = function () {


    $('.profil_delete_button').on('click', function () {

        $.ajax({
            url: 'resources/php/profil_delete.php',
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


var info_like_click = function () {
    console.log('Line 1360: this', this);
    console.log('Line 1361: marker', marker);
    console.log('Line 1362: markers', markers);
};

$(document).on('click', '#info_like', info_like_click);