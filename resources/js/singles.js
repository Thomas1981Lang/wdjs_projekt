/****************************************************
 *
 *
 * MOBILE NAV - START
 *
 *
 ***************************************************/


/****************************************************
 * Mobile Nav links - START
 ***************************************************/
$('.mobile_nav').on('click', function (event) {
    console.log('geht');
    $('.mobile_nav_wrapper').toggleClass('open');
    $('.mobile_nav_background').toggleClass('open');
    event.stopPropagation();
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
    console.log('geht');
    $('.mobile_login_wrapper').toggleClass('open');
    $('.mobile_login_background').toggleClass('open');
    event.stopPropagation();
    if ($('.mobile_nav_wrapper').hasClass('open')) {
        $('.mobile_nav_wrapper').toggleClass('open');
        $('.mobile_nav_background').toggleClass('open');
    }
});
/****************************************************
 * Mobile Nav rechts - ENDE
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
var zoom = 12;


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
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: position.coords.latitude, lng: position.coords.longitude},
        zoom: zoom,                 // Definiert den Zoom-Level der Karte
        styles: styles,             // Definiert das Kartenstyling
        // scrollwheel: false,      // Deaktivert das Scrollrad - um Zoomen zu verhindern
        mapTypeControl: false,      // Deaktiviert die verschiedenen Karten Typen
        disableDefaultUI: true      // Deaktiviert die Steuerelemente z.B. Zoom
    });

    //Erzeugt ein Marker Objekt für den Standort des Users
    myself = new google.maps.Marker({
        position: {lat: position.coords.latitude, lng: position.coords.longitude},
        title: 'wunderschön',
        icon: {
            url: icons.myself.icon,
            scaledSize: new google.maps.Size(40, 40)
        },
        animation: google.maps.Animation.DROP
    });
    myself.setMap(map);  // setzt den Marker auf die Karte

    gps = 1;
}


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
        styles: styles,
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
    getStartMap();


    // Dummy Daten bis Datenbank funktioniert.
    var locations = [
        {title: 'Donauturm', location: {lat: 48.240236, lng: 16.410094}, type: 'eat'},
        {title: 'Rathaus', location: {lat: 48.210272, lng: 16.358778}, type: 'drink'},
        {title: 'Wifi Wien', location: {lat: 48.2266275, lng: 16.3467036}, type: 'party'},
        {title: 'Wifi Wien', location: {lat: 48.2366275, lng: 16.3567036}, type: 'party'},
        {title: 'Wifi Wien', location: {lat: 48.2466275, lng: 16.3667036}, type: 'party'},
        {title: 'Wifi Wien', location: {lat: 48.2666275, lng: 16.3867036}, type: 'party'},
    ];

    console.log('largeInfowindow', largeInfowindow);
    var largeInfowindow = new google.maps.InfoWindow();

    // In der for-Schleife wird der locations-Array verwendet, um einen Array von Markern beim initialiesieren zu erzeugen
    for (var i = 0; i < locations.length; i++) {
        // Bekommt die Position vom locations-Array.
        var position = locations[i].location;
        var title = locations[i].title;


        // Erzeugt einen Marker pro Location.
        marker = new google.maps.Marker({
            position: position,
            title: title,
            icon: {
                url: icons[locations[i].type].icon,
                scaledSize: new google.maps.Size(40, 40)
            },
            animation: google.maps.Animation.DROP,
            id: i,
            type: locations[i].type
        });


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

    /**
     *  TODO: jquery on.click'
     */
    document.getElementById('show-listings').addEventListener('click', showListings);
    document.getElementById('hide-listings').addEventListener('click', showEat);
}

// function closeOtherIW(marker, infowindow) {
//     infowindow.marker.close();
// }


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
        console.log(infowindow.marker);
        if (infowindow.marker > 0) {
            infowindow.marker;
        }
// infoWin.push(infowindow);
// console.log(infoWin, '1');
// if (infoWin.length > 0) {
// for (var x=0; x < infoWin.length; x++) {
//
//    infowindow.infoWin[x].close();
// }
// }
        infowindow.marker = marker;
        // infoWin.push(infowindow.marker);
        // console.log(infoWin.length, 'push');
        // console.log(marker, 'infowindow');
        //
        //  for (var c = 0; c <= infoWin; c++) {
        //      console.log('ja');
        //     infowindow.close(infoWin[c]);
        //
        //  }
        infowindow.marker = null;

        // if (infoWin.length > 0) {
        //     console.log('if');
        //     marker.setIcon(icons[marker.type].icon);
        //     infowindow.marker = null;
        //     // infoWin = null;
        // }
        //   infoWin.push(marker);
        //console.log(infoWin);
        infowindow.setContent('<div>' + marker.title + '</div>');
        infowindow.open(map, marker);
        console.log(map, 'marker');

        marker.setIcon({
            url: iconsh[[marker.type]].icon,
            scaledSize: new google.maps.Size(40, 40)
        });
        console.log(marker.type);
        // Stellt sicher das die Marker Eigenschaft gelöscht wird, wenn das infowindow geschlossen wird.
        infowindow.addListener('closeclick', function () {
            console.log(infowindow.marker);
            infowindow.marker = null;
            marker.setIcon({
                    url: icons[[marker.type]].icon,
                    scaledSize: new google.maps.Size(40, 40)
                }
            )
            ;

        });

    }
}


console.log(markers);

var showMark = 0;

// function showListings() {
//     if (showMark === 1) {
//         for (var i = 0; i < markers.length; i++) {
//             console.log('!');
//             markers[i].setMap(null);
//         }
//         showMark = 0;
//     }
//     else {
//         for (var i = 0; i < markers.length; i++) {
//
//             markers[i].setMap(map);
//             console.log('else');
//         }
//         showMark = 1;
//     }
//
// }


function showListings() {
    if (showMark === 1) {
        showEat();
        showParty();
        showMark = 0;
    }
    else {
        showEat();
        showParty();
    }
    showMark = 1;
}


var showMarkEat = 0;

function showEat() {
    if (showMarkEat === 1) {
        for (var i = 0; i < markers.length; i++) {
            console.log('!');
            if (markers[i].type == 'eat') {
                console.log('eat');
                markers[i].setMap(null);
            }
            showMarkEat = 0;
        }
    }
    else {
        for (var i = 0; i < markers.length; i++) {

            if (markers[i].type == 'eat') {
                console.log('eat');
                markers[i].setMap(map);
                console.log('else');
            }
            showMarkEat = 1;
        }

    }
}


var showMarkParty = 0;

function showParty() {
    if (showMarkParty === 1) {
        for (var i = 0; i < markers.length; i++) {
            console.log('!');
            if (markers[i].type == 'party') {
                console.log('eat');
                markers[i].setMap(null);
            }
            showMarkParty = 0;
        }
    }
    else {
        for (var i = 0; i < markers.length; i++) {

            if (markers[i].type == 'party') {
                console.log('eat');
                markers[i].setMap(map);
                console.log('else');
            }
            showMarkParty = 1;
        }

    }
}







//
//
// /****************************************************
//  * Google Maps Init
//  ***************************************************/
// var map;
//
// function initMap() {
//     // Constructor creates a new map - only center and zoom are required.
//     map = new google.maps.Map(document.getElementById('map'), {
//         center: {lat: 48.207715, lng: 16.375253},
//         zoom: 18
//     });
// }


/****************************************************
 *
 *
 * GOOGLE MAPS - ENDE
 *
 *
 ***************************************************/