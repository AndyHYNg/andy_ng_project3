
const grid = {};
grid.rows = 5;
grid.answerGrid = [];
grid.playerGrid = [];
grid.tileClassArray = [];

const timer = {};
timer.initialTime = 20;
timer.timerFunction;

//Jenny: put playerfillgrid and the game timer inside cleargrid, put cleargrid inside the first game timer, put first game timer inside fillgrid (calls only)

grid.init = function() {
  //do these simultaneously
  grid.answerGrid = grid.randomGrid(grid.rows);
  grid.fillGrid(grid.answerGrid);
  let peekTimer = 10;
  let initialTimer = setInterval(function() {

    if (peekTimer < 0) {
      console.log(peekTimer);
      clearInterval(initialTimer);
      grid.clearGrid();
      grid.playerFillGrid();

      let countdown = 10;
      let playerTimer = setInterval(function() {

        if (countdown < 0) {
          console.log(countdown);
          clearInterval(playerTimer);
          grid.playerGuessToArray();
          console.log(grid.accuracyCheck(grid.playerGrid, grid.answerGrid));
        }

        else if (countdown < 10) {
          $(".timer").html("0:0" + countdown);
          console.log(countdown);
        }
        
        else {
          $(".timer").html("0:" + countdown);
          console.log(countdown);
        }

        countdown--;
      }, 1000);
    }
    else if (peekTimer < 10) {
      $(".timer").html("0:0" + peekTimer);
      console.log(peekTimer);
    }
    else {
      $(".timer").html("0:" + peekTimer);
      console.log(peekTimer);
    }
    peekTimer--;
  }, 1000)

  //do these after first timer
  // grid.clearGrid();
  // grid.playerFillGrid();
  // timer.gameTimer(30);

  // //do this after timer runs out
  // grid.playerGuessToArray();
  // grid.accuracyCheck(grid.playerGrid, grid.answerGrid);
}

grid.randomGrid = function (rows) {
  filledGrid = []
  // _.sample random chooses one element in the array of elements in the argument
  for (let currRow = 0; currRow < Math.pow(rows, 2); currRow++) {
    filledGrid.push(_.sample([true, false]));
  }
  return filledGrid;
}

grid.fillGrid = function (gridArray) {
  // given an array of boolean items, fill the HTML grid
  for (let currItem = 0; currItem < gridArray.length; currItem++) {
    if (gridArray[currItem] === true) {
      console.log($(".tile-" + (currItem + 1)));
      $(".tile-" + (currItem + 1)).addClass("correct-tile");
    }
  }

}

grid.playerFillGrid = function () {
  // allow the player to toggle the HTML tiles
  $('.tile').on('click', function () {
    $(this).toggleClass("correct-tile");
  })
}

grid.playerGuessToArray = function () {
  grid.playerGrid = [];
  $('.grid-container > .tile').each(function () {
    // iterate through each child in the .grid-container and check if they are selected or not
    if ($(this).hasClass("correct-tile")) {
      grid.playerGrid.push(true);
    }
    else {
      grid.playerGrid.push(false)
    }
  })
  console.log(grid.tileClassArray);
}

grid.accuracyCheck = function (playerArray, answerArray) {
  // returns a percentage of how accurate the player's grid with the answer grid
  let correctCount = 0;
  for (let arrayItemCheck = 0; arrayItemCheck < playerArray.length; arrayItemCheck++) {
    if (playerArray[arrayItemCheck] === answerArray[arrayItemCheck]) {
      correctCount++;
    }
  }
  return Math.floor(correctCount / playerArray.length * 100);
}

grid.clearGrid = function () {
  // clears the HTML grid
  $(".tile").removeClass("correct-tile");
}


//broken
timer.gameTimer = function (seconds) {

}

$(function() {
  grid.init();
});




