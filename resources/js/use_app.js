//
// const canvas = document.getElementById("canvas");
// const ctx = canvas.getContext("2d");
// let radius = canvas.height / 2;
// ctx.translate(radius, radius);
// radius = radius * 0.90;
// setInterval(drawClock, 1000);
//
//
// /**
//  * Kombiniert die drei Funktionen  für Ziffernblatt, Nummern und Zeit
//  *
//  * @returns void
//  */
// function drawClock() {
//     drawFace(ctx, radius);
//     drawNumbers(ctx, radius);
//     drawTime(ctx, radius);
// }
//
//
// /**
//  *
//  * @param ctx
//  * @param radius
//  */
// function drawFace(ctx, radius) {
//     var grad;
//     ctx.beginPath();
//     ctx.arc(0, 0, radius, 0, 2*Math.PI);
//     ctx.fillStyle = 'black';
//     ctx.fill();
//     grad = ctx.createRadialGradient(0,0,radius*0.95, 0,0,radius*1.05);
//     grad.addColorStop(0, '#ebebeb');
//     grad.addColorStop(0.5, 'black');
//     grad.addColorStop(1, '#ebebeb');
//     ctx.strokeStyle = grad;
//     ctx.lineWidth = radius*0.1;
//     ctx.stroke();
//     ctx.beginPath();
//     ctx.arc(0, 0, radius*0.1, 0, 2*Math.PI);
//     ctx.fillStyle = 'white';
//     ctx.fill();
// }
//
//
// /**
//  *
//  * @param ctx
//  * @param radius
//  */
// function drawNumbers(ctx, radius) {
//     var ang;
//     var num;
//     ctx.font = radius*0.15 + "px arial";
//     ctx.textBaseline="middle";
//     ctx.textAlign="center";
//     for(num = 1; num < 13; num++){
//         ang = num * Math.PI / 6;
//         ctx.rotate(ang);
//         ctx.translate(0, -radius*0.85);
//         ctx.rotate(-ang);
//         ctx.fillText(num.toString(), 0, 0);
//         ctx.rotate(ang);
//         ctx.translate(0, radius*0.85);
//         ctx.rotate(-ang);
//     }
// }
//
//
// /**
//  *
//  * @param ctx
//  * @param radius
//  */
// function drawTime(ctx, radius){
//     let now = new Date();
//     let hour = now.getHours();
//     let minute = now.getMinutes();
//     let second = now.getSeconds();
//     //hour
//     hour=hour%12;
//     hour=(hour*Math.PI/6)+
//         (minute*Math.PI/(6*60))+
//         (second*Math.PI/(360*60));
//     drawHand(ctx, hour, radius*0.5, radius*0.07);
//     //minute
//     minute=(minute*Math.PI/30)+(second*Math.PI/(30*60));
//     drawHand(ctx, minute, radius*0.8, radius*0.07);
//     // second
//     second=(second*Math.PI/30);
//     drawHand(ctx, second, radius*0.9, radius*0.02);
// }
//
//
// /**
//  *
//  * @param ctx
//  * @param pos
//  * @param length
//  * @param width
//  */
// function drawHand(ctx, pos, length, width) {
//     ctx.beginPath();
//     ctx.lineWidth = width;
//     ctx.lineCap = "round";
//     ctx.moveTo(0,0);
//     ctx.rotate(pos);
//     ctx.lineTo(0, -length);
//     ctx.stroke();
//     ctx.rotate(-pos);
// }