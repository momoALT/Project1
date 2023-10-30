//----------------- GAME FUNCTIONS -------------------

function startGame() {
    myGameArea.start();
  }

  var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
      
      console.log('fhjsh')
        this.canvas.width = window. innerWidth;
        this.canvas.height = window. innerHeight;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    }
  }

  document.addEventListener('DOMContentLoaded', function() {
    startGame()
}, false); 