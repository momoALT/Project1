//----------------- GAME FUNCTIONS -------------------
var TheVoiceImage = new Image();
var gameCanvas;
let context;
TheVoiceImage.src = '../Assets/Images/thevoiceface.png'
function startGame() { //Starts game

  MainGameCanvas.start();
}
//GAME ASSETS
let walltopHeight = window.innerHeight/2;
let walltopWidth = window.innerWidth/4;

let wallbottomHeight = window.innerHeight/2;
let wallbottomWidth = window.innerHeight/4;
let walltopX = window.innerHeight/3;
let walltopY = window.innerHeight/2;

let wallTop = {
  x : walltopX,
  y : walltopY,
  width: walltopHeight,
  height: walltopHeight
}

//CANVAS
var MainGameCanvas = {
  canvas: document.createElement("canvas"), //New Canvas created
  start: function () {
    var centerimg = window.innerWidth / 2;
    
    //adding assets from images folder
    //TheVoiceImage = new component(100, 100, "../Assets/Images/thevoiceface.png", centerimg, 100, "image");
    
    context = this.canvas.getContext("2d");
    gameCanvas = this.canvas

    gameCanvas.width = window.innerWidth;
    gameCanvas.height = window.innerHeight;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]); //Binding canvas to page
    this.frameNo = 0;
    this.interval = setInterval(updateGameArea, 20); //Setting canvas refresh time at 20ms
    this.context.fillStyle = "red";
    this.context.fillRect(walltopX, walltopY, walltopWidth, walltopWidth);

  },
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  stop: function () {
    clearInterval(this.interval); //Sets canvas refresh to none. Halting everything
  }
}
function component(width, height, color, x, y, type) { //Function to add assets
  this.type = type;
  if (type == "image") {
    this.image = new Image();
    this.image.src = color;
  }
  this.width = width;
  this.height = height;
  this.speedX = 0;
  this.speedY = 0;
  this.x = x;
  this.y = y;
  this.update = function () {
    ctx = MainGameCanvas.context;
    if (type == "image") {
      ctx.drawImage(this.image,
        this.x,
        this.y,
        this.width, this.height);
    } else {
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }
  this.newPos = function () {
    this.x += this.speedX;
    this.y += this.speedY;
  }
  
}


//Game sounds

var audio = new Audio('../Assets/Sounds/thevoicestart2.mp3');

//Game Loader
document.addEventListener('DOMContentLoaded', function () {
  startGame()

}, false);

$("<audio id='audioElement'>").appendTo("body"); //Binds audio to body of document
$("#audioElement").attr("src", "../Assets/Sounds/thevoicestart2.mp3").attr("autoplay", "autoplay"); //Audio Attributes with reference

$("<image id='thevoiceimage'>").appendTo("body"); //Binds audio to body of document
$("#thevoiceimage").attr("src", "../Assets/Images/thevoiceface.png"); //Audio Attributes with reference


//Specific second of audio finder
var triggered = false;
var triggered2 = false;

var ael = document.getElementById("audioElement");
var interval = setInterval(function () {
  console.log(ael.currentTime);
  if (!triggered && ael.currentTime >= 21) { //Condition is if audios current second is the same as desired second then, append an image to document body
    triggered = true;
    $("<image id='perishID'>").appendTo("body");
    $("#perishID").attr("src", "../Assets/Images/perishtext.gif").attr("style",
      "position: absolute; bottom: 40%; left: 50%; transform: translateX(-50%);"
    )
  }
  if (ael.ended) clearInterval(interval);
}, 50);
var interval2 = setInterval(function () {
  console.log(ael.currentTime);
  if (!triggered2 && ael.currentTime >= 22) {// Same if as last but removes Image by second 22 of audio
    triggered2 = true;
    document.getElementById("perishID").remove();
    document.getElementById("thevoiceimage").remove();
  }
  if (ael.ended) clearInterval(interval2);
}, 50);

//Function to Canvas and element positions
function updateGameArea() {
  MainGameCanvas.clear();
 // TheVoiceImage.newPos();
 // TheVoiceImage.update();
 
 for (let i = 0; i < 100; i++){
  walltopX += -0.1;
  context.fillRect(walltopX, walltopY, walltopWidth, walltopWidth);
 }

}


