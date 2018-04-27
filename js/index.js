/*jshint loopfunc: true */
class game {
  constructor(strictMode) {
    this.strictMode = strictMode;
  }
  resetGame() {
    currentMoves = [];
    count = 0;
    $("#status").html(" ");
    this.switchClick("none");
    
  }
  setStrict() {
    if (this.strictMode) {
      $("#mode").toggleClass("btn-danger");
      $("#mode").text("Strict Mode:OFF");
      this.strictMode = false;
    } else {
      $("#mode").toggleClass("btn-danger");
      $("#mode").text("Strict Mode:ON");
      this.strictMode = true;
    }
  }

  showMoves() {
    let c = 0;
    let moves = setInterval(() => {
      this.playGame(currentMoves[c]);
      c += 1;
      if (c >= currentMoves.length) {
        clearInterval(moves);
        c = 0;
      }
    }, 2000);
    playerMoves = [];
  }

  playGame(colorID) {
    $(colorID).toggleClass("hover");
    this.soundPlay(colorID);
    setTimeout(() => {
      $(colorID).toggleClass("hover");
    }, 400);
  }
  playerTurn(x) {
    if (
      currentMoves[playerMoves.length - 1] !==
      playerMoves[playerMoves.length - 1]
    ) {
      if (this.strictMode) {
        alert("Oooops, restart!");
        this.resetGame();
        this.addCount();
        this.switchClick("auto");
      } else {
        alert("Show current moves again!");
  
        this.showMoves();
        
      }
    } else {
      console.log("Good move!!!");
      this.playGame(x);
      let sameMoves = currentMoves.length === playerMoves.length;
      if (sameMoves) {
        if (count == maxLevel) {
          setTimeout(() => {
         alert("Congratulations! You win the game!");
    }, 500);
          
         this.resetGame(); 
          
        } else {
          this.addCount();
          
        }
      }
    }
  }

  addToPlayer(field) {
    playerMoves.push(field);

    this.playerTurn(field);
  }

  addCount() {
    if (count <= maxLevel) {
      this.generateMove();
      count += 1;
      $("#status").html(`Round: ${count}`);
    }
  }

  generateMove() {
    let move = Math.floor(Math.random() * possibilities.length);
    currentMoves.push(possibilities[move]);
    this.showMoves();
  }
  soundPlay(color) {
    let sound = {
      blue: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
      red: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
      orange: new Audio(
        "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"
      ),
      green: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3")
    };
    switch (color) {
      case "#red":
        sound.red.play();
        break;
      case "#green":
        sound.green.play();
        break;
      case "#blue":
        sound.blue.play();
        break;
      case "#orange":
        sound.orange.play();
        break;
    }
  }

  switchClick(value) {
    document.getElementById("red").style.pointerEvents = value;
    document.getElementById("green").style.pointerEvents = value;
    document.getElementById("blue").style.pointerEvents = value;
    document.getElementById("orange").style.pointerEvents = value;
  }
} //end of class

const maxLevel = 20;
var count = 0,
  currentMoves = [],
  playerMoves = [],
  possibilities = ["#red", "#blue", "#green", "#orange"],
  strict = false;

$(() => {
  var s = new game(strict);
  s.switchClick("none");
  $("#mode").click(() => {
    s.setStrict();
    s.resetGame();
  });

  $("#reset").click(() => {
    s.resetGame();
  });

  $("#start").click(e => {
    s.resetGame();
    s.addCount();
    s.switchClick("auto");

    e.preventDefault();
  });

  for (let item of possibilities) {
    $(item).click(() => {
      s.addToPlayer(item);
      
    });
  }
});