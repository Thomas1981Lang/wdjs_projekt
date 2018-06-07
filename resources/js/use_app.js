
var x = document.getElementById("audio");

/**
 * Mit Hilfe von jQuery wird die src vom Audio Element geändert
 *
 *  @event .theatralikOn on click
 */
$('.theatralikOn').on('click', function () {
    $("audio").attr("src", 'resources/audio/tick.mp3');

});


/**
 * Mit Hilfe von jQuery wird die src vom Audio Element geändert
 *
 *  @event .theatralikOff on click
 */
$('.theatralikOff').on('click', function () {
    $("audio").attr("src", 'resources/audio/silence.mp3');
});




const canvas = document.getElementById("canvas");   // Erzeugt ein canvas Objekt vom HTML canvas Element
const ctx = canvas.getContext("2d");                // Erzeugt ein 2d Zeichnen Object für das canvas Objekt
let radius = canvas.height / 2;                     // Berechnet aus der Hälfte der Höhe des Canvas den Radius
ctx.translate(radius, radius);                      // Setzt den Ausgangspunkt für die Befehle in die Mitte des Canvas
radius = radius * 0.90;                             // Reduziert den Radius um 10% um das später Ziffernblatt und Rahmen vollständig im Canvas darzustellen

/**
 *  Ruft die drawClock-Funktion jede 1000ms auf
 *  
 *  @event setInterval
 */
setInterval(drawClock, 1000);


/**
 * Erzeugt das Ziffernblat
 *
 * @param ctx
 * @param radius
 */
function drawFace(ctx, radius) {
    var grad;
    ctx.beginPath();                                // Startet das Zeichnet einen Kreis
    ctx.arc(0, 0, radius, 0, 2*Math.PI);            // Anhand des Befehls. 0,0 ist der Ausgangs von ctx.translate(radius, radius) daher die Mitte
    ctx.fillStyle = '#ebebeb';                      // Wählt die Farbe für das Füllen des Kreises aus und setzt die Farbe auf ein helles Grau.
    ctx.fill();                                     // Füllt den Kreis
    grad = ctx.createRadialGradient(0,0,radius*0.97, 0,0,radius*1.03);  // Erzeugt einen radialen Gradient für den Rand. Start bei 97% vom Radius bis 103% vom Radius
    grad.addColorStop(0, '#444444');                // Erzeugt 2 Farbübergänge
    grad.addColorStop(0.5, '#ebebeb');              // von dunkel auf hell
    grad.addColorStop(1, '#444444');                // und von hell wieder auf dunkel
    ctx.strokeStyle = grad;                         // Setzt den strokeStyle auf Gratient
    ctx.lineWidth = radius*0.05;                    // Setzt die Linien Dicke
    ctx.stroke();                                   // Zeichent den definierten Rand
    ctx.beginPath();                                // Beginnt den Mittelpunkt zu zeichnen
    ctx.arc(0, 0, radius*0.1, 0, 2*Math.PI);        // Gibt die Größe des inneren Kreise vor
    ctx.fillStyle = '#444444';                      // Setzt die Farbe für den inneren Kreis
    ctx.fill();                                     // Und füllt ihn aus
}


/**
 * Erzeugt die Nummern am Ziffernblatt
 *
 * @param ctx
 * @param radius
 */
function drawNumbers(ctx, radius) {
    var ang;
    var num;
    ctx.font = radius*0.16 + "px arial";            // Definiert die Font-Size auf 16% des Radius und setzt den Wert als String zusammen um Canvas Größen unabhängig zu sein
    ctx.textBaseline="middle";                      // Setzt die Ausrichtung in die Mitte
    ctx.textAlign="center";                         // und den Mittelpunkt für die Ausgabe
    ctx.fillStyle = '#444444';                      // Setzt die Farbe für die Zahlen
    for(num = 1; num <= 12; num++){                 // Berechnet die Ausgabe Position für die 12 Nummern
        ang = num * Math.PI / 6;
        ctx.rotate(ang);                            // lässt die Position der Zahl um (Pi/6) nach rechts rotieren
        ctx.translate(0, -radius*0.87);             // Gibt die Positon an
        ctx.rotate(-ang);
        ctx.fillText(num.toString(), 0, 0);         // Füllt den Text mit den Zahlen als String
        ctx.rotate(ang);
        ctx.translate(0, radius*0.87);              // Gibt die Position an
        ctx.rotate(-ang);
    }
}


/**
 * Erzeugt die Zeiger der Uhr
 *
 * @param ctx
 * @param pos
 * @param length
 * @param width
 * @param color
 */
function drawHand(ctx, pos, length, width, color) {        // Erzeugt die Zeiger
    ctx.strokeStyle = color;
    ctx.beginPath();                                // Beginnt das Zeichnen
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}


/**
 * Stellt die Uhrzeit mit der drawHand-Funktion dar.
 *
 * @param ctx
 * @param radius
 */
function drawTime(ctx, radius){
    let now = new Date();                           // Erzeugt das Date Objekt
    let hour = now.getHours();                      // Holt sich davon die Stunden
    let minute = now.getMinutes();                  // die Minuten
    let second = now.getSeconds();                  // die Sekunden

    //hour
    hour=hour%12;
    hour=(hour*Math.PI/6)+
        (minute*Math.PI/(6*60))+
        (second*Math.PI/(360*60));
    drawHand(ctx, hour, radius*0.5, radius*0.1, '#444444' );
    //minute
    minute=(minute*Math.PI/30)+(second*Math.PI/(30*60));
    drawHand(ctx, minute, radius*0.8, radius*0.1, '#444444');
    // second
    second=(second*Math.PI/30);
    drawHand(ctx, second, radius*0.9, radius*0.03, 'red');
}

/**
 *  Ruft die Funktionen für Ziffernblatt, Nummerierung des Ziffernblattes und die Zeit-Darstellung auf.
 *  Und übergibt die Werte für ctx und radius als Parameter an die Funktionen.
 *  Spielt Musik aus dem Audio HTML Element ab
 */
function drawClock() {
    drawFace(ctx, radius);
    drawNumbers(ctx, radius);
    drawTime(ctx, radius);
    x.play();
}
