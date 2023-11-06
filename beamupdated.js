var setHorL = false;
var beamTime = 0;
var transparency = 0;
var complete = false;
window.drawMe = function () {
    console.log("trying")
    var canvas2 = document.getElementById("canvas1");
    var ctx = canvas2.getContext("2d");

    width = 0;
    height = 500;
    x = Math.random() * 1000;
    t = 1;

    draw(ctx, width, height, x);
}

window.draw = function (ctx, width, height, x) {
    ctx.beginPath();
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, 900, 500);

    ctx.fillStyle = 'rgba(0,0,0,' + transparency + ')';
    ctx.fillRect(x, 0, width, height);

    if (width < 59 && height === 500 && transparency != 1) {
        console.log("1")
        width += 20;
        transparency += 0.33
        x -= 10;
        console.log(width);
    }
    else if (setHorL === false && beamTime < 50) {
        console.log("2");
        beamTime += 1;
        width -= 4;
        x += 2;
        height = 501;
        if(width <= 30 && width >= 25){
        	setHorL = true;
        }
    }
    else if (setHorL === true && beamTime < 50) {
        console.log("3")
        
        beamTime += 1;
        width += 4;
        x -= 2
        height = 501;
        if(width >= 60){
        setHorL = false;
        }
    
    } else if (beamTime >= 50 && width >= 0) {
        console.log("5")
        width -= 10
        x += 5
        transparency -= 0.2
    } else {
        complete = true;
        console.log("complete")
    }
    if (complete != true) {
        setTimeout(function () { draw(ctx, width, height, x, t) }, 40);
    } else if (complete === true) {
        complete = false;
        transparency = 0;
        width = 0;
        height = 500;
        beamTime = 0;
        console.log(beamTime)
        console.log(complete)
    }

}

drawMe();

