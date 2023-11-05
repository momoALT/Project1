//----------------- GAME FUNCTIONS -------------------
var TheVoiceImage = new Image();
var gameCanvas;
let context;
let points = 0;
TheVoiceImage.src = '../Assets/Images/thevoiceface.png'
function startGame() { //Starts game

  MainGameCanvas.start();
}


//-----------------------------------GAME ASSETS-----------------------------------------

//Images
let topSwordImg;
let bottomSwordImg;
let blueStarImg;
let redStarImg;
let goldStarImg;

//Game Loader
document.addEventListener('DOMContentLoaded', function () {
  topSwordImg = new Image();
  topSwordImg.src = "../Assets/Images/swordtop.png";

  bottomSwordImg = new Image();
  bottomSwordImg.src = "../Assets/Images/swordbottom.png";

  blueStarImg = new Image();
  blueStarImg.src = "../Assets/Images/bluestar.png";
  
  redStarImg = new Image();
  redStarImg.src = "../Assets/Images/redstar.png";
  
  goldStarImg = new Image();
  goldStarImg.src = "../Assets/Images/goldstar.png";
  //startGame()

}, false);

//Game sounds

var audio = new Audio('../Assets/Sounds/thevoicestart2.mp3');


let wallArray = [];
let starArray = [];
let walltopHeight = window.innerHeight;
let walltopWidth = window.innerWidth / 13;
let walltopX = window.innerWidth;
let walltopY = 0;

let wallbottomHeight = walltopHeight;
let wallbottomWidth = walltopWidth;
let wallbottomX = walltopX;
let wallbottomY = walltopY - (window.innerHeight + 100);
let velocityX = -20;



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
    setInterval(placeWall, 1000);
    setInterval(spawnStar, 1000);
    this.context.fillStyle = "red";
    //this.context.fillRect(walltopX, walltopY, walltopWidth, walltopHeight);
    //this.context.fillRect(wallbottomX, wallbottomY, wallbottomWidth, wallbottomHeight);

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





$("<audio id='audioElement'>").appendTo("body"); //Binds audio to body of document
$("#audioElement").attr("src", "../Assets/Sounds/thevoicestart2.mp3").attr("autoplay", "autoplay"); //Audio Attributes with reference

$("<image id='thevoiceimage'>").appendTo("body"); //Binds audio to body of document
$("#thevoiceimage").attr("src", "../Assets/Images/thevoiceface.png"); //Audio Attributes with reference


//Specific second of audio finder
var triggered = false;
var triggered2 = false;

var ael = document.getElementById("audioElement");
var interval = setInterval(function () {
  //console.log(ael.currentTime);
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
  //console.log(ael.currentTime);
  if (!triggered2 && ael.currentTime >= 22) {// Same if as last but removes Image by second 22 of audio
    triggered2 = true;
    document.getElementById("perishID").remove();
    document.getElementById("thevoiceimage").remove();
    startGame();
  }
  if (ael.ended) clearInterval(interval2);
}, 50);



var gameOver = false; // game over state default set to false.
var mousePosX = 0; // Initial mouse x position
var mousePosY = 0; // Initial mouse y position

function checkCollision() {
  if (!gameOver) {
    
  
  for (let i = 0; i < wallArray.length; i++) {
    
    let wall = wallArray[i];
    if (
      mousePosX > wall.x &&
      mousePosX < wall.x + wall.width &&
      mousePosY > wall.y &&
      mousePosY < wall.y + wall.height
    ) {
      gameOver = true;
      break; 
    }
  }
  }
}
function mouseposition(event){
  mousePosX = event.clientX;
  mousePosY = event.clientY;
}
MainGameCanvas.canvas.addEventListener("mousemove", mouseposition);

function displayGameOver() {
  context.font = "30px Arial";
  context.fillStyle = "red";
  context.fillText("Game Over!", MainGameCanvas.canvas.width / 2 - 80, MainGameCanvas.canvas.height / 2);
}

function scoreDisplay() {
  context.font = "30px Arial";
  context.fillStyle = "white";
  context.fillText("Score: " + points, MainGameCanvas.canvas.width / 12 - 80, MainGameCanvas.canvas.height / 12);
}

//Function to Canvas and element positions
function updateGameArea() {
  MainGameCanvas.clear();
 // TheVoiceImage.newPos();
 // TheVoiceImage.update();
console.log(points);
 if (!gameOver) {
  checkCollision();
  scoreDisplay();
 }
 if (gameOver) {
  
 displayGameOver();
 MainGameCanvas.stop();
 updateScore(localStorage.getItem('user'), points);
 setTimeout(() => {
  window.location.href = "../HTML/loggedinpage.html"
 }, 3000);
 }else{
 for (let i = 0; i < wallArray.length; i++){
  let wall = wallArray[i];
  wall.x += velocityX;
  //wallbottomX = walltopX;
  //context.fillStyle = "red";
  context.drawImage(wall.img, wall.x, wall.y, wall.width, wall.height);
  //context.fillRect(wallbottomX, wallbottomY, wallbottomWidth, wallbottomHeight);
 }
 for (let i = 0; i < starArray.length; i++){
  let star = starArray[i];
  context.drawImage(star.img, star.x, star.y, star.width, star.height);
 }
 }
}

function updateScore(user, sc) {
  if (currentNum >= 0 && currentNum < DataSetLength && DataSetMain[currentNum].username != user) {

    console.log(DataSetMain[currentNum].username)
    currentNum++;
    updateScore(user, sc);

  } else if (currentNum === DataSetLength) {
    console.log("user does not exist.")
    currentNum = 0;
    
    return false;

  } else if (DataSetMain[currentNum].username === user) {
    var stored = DataSetMain;
    console.log("user exists")
    console.log(sc);
    console.log(sc);
    console.log(sc);
    console.log(sc);
    stored[currentNum].score = sc;
    localStorage.setItem('DataSet', JSON.stringify(stored));
    currentNum = 0;
    
    
    return true;
  }
}

function spawnStar(){
  let randPosX = Math.random()* window.innerWidth;
  let randPosY = Math.random()* window.innerHeight;
  let randStar = Math.random()* 1000;
  let randHappen = Math.random()*10;

  let starImg;
if (randHappen >= 9 && randHappen <= 10) {
  

  if (randStar >= 0 && randStar <= 700) {
    starImg = blueStarImg;
  }else if (randStar > 700 && randStar <= 900) {
    starImg = redStarImg;
  }else if (randStar > 900 && randStar <= 1000){
   starImg = goldStarImg;
  }

  let Star1 = {
    img : starImg,
    x : randPosX,
    y : randPosY,
    width : 50,
    height : 50
  }
 starArray.push(Star1);
 setTimeout(() => {
  despawnStar();
}, 3000);

}
}

function despawnStar(){
  let pointer = 0;
  starArray.splice(0, 1);
}

function placeWall(){
  let openingSpace = window.innerHeight/4;
  let randomY = Math.random()* window.innerHeight;
  let wallTop = {
    img : bottomSwordImg,
    x : walltopX,
    y : randomY,
    width: walltopWidth,
    height: walltopHeight
  }
  
  let wallBottom = {
    img : topSwordImg,
    x : wallbottomX,
    y : randomY - walltopHeight - 100,
    width: wallbottomWidth,
    height: wallbottomHeight
  }
  wallArray.push(wallTop);
  wallArray.push(wallBottom);
  points += 50;
}


