//----------------- GAME FUNCTIONS -------------------
var TheVoiceImage = new Image();
var gameCanvas;
TheVoiceImage.src = 'thevoiceface.png'
function startGame() {
  
    myGameArea.start();
  }

  var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
      var centerimg = window.innerWidth / 2;
      TheVoiceImage = new component(300, 300, "thevoiceface.png", centerimg, 120, "image");
      
      gameCanvas = this.canvas
      
        gameCanvas.width = window. innerWidth;
        gameCanvas.height = window. innerHeight;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
  }
  function component(width, height, color, x, y, type) {
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
    this.update = function() {
        ctx = myGameArea.context;
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
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;        
    }
}


//Game assets

var audio = new Audio('thevoicestart1.mp3');

  //Game Loader
  document.addEventListener('DOMContentLoaded', function() {
    startGame()
    
    audio.play();
}, false); 


function updateGameArea() {
  myGameArea.clear();
  TheVoiceImage.newPos();
  TheVoiceImage.update();
}
