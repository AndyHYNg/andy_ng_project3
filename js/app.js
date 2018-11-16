
const grid = {};
grid.rows = 4;
grid.answerGrid = [];
grid.playerGrid = [];
grid.tileClassArray = [];

const timer = {};
timer.initialTimer = 0;
timer.peekTimer = 0;
timer.countdown = 0;
timer.playerTimer = 0;

grid.init = function() {
  grid.difficultyCheck();
  grid.checkStart();
}

grid.checkStart = function() {
  // Starts the game as soon as 'Start!' button is pushed
  $("form").on('submit', function(event){
    event.preventDefault();

    // If the game still running, reset all necessary functions to prevent errors/bugs
    grid.reset();

    // Randomly fills the grid
    grid.answerGrid = grid.randomGrid(grid.rows);
    grid.fillGrid(grid.answerGrid);

    // Gives the player 10 seconds to look at the answer grid (peek timer)
    timer.peekTimer = 10;
    timer.initialTimer = setInterval(function () {

      // As soon as the peek timer runs out...
      if (timer.peekTimer < 0) {

        // Stops the timer from counting down to negative values, wipe out the grid, and allow the player the interact the grid and toggle the tiles they need to replicate the answer grid
        clearInterval(timer.initialTimer);
        grid.clearGrid();
        grid.playerFillGrid();

        // Gives the player a countdown timer to play the game
        timer.countdown = 10;
        timer.playerTimer = setInterval(function () {

          // During any point in the game after the peek timer, player can force the game to check his/her answer and end the game via 'Check!' button
          grid.forceCheck();

          // As soon as the countdown timer runs out...
          if (timer.countdown < 0) {

            // Stops the timer from counting down to negative values, disables the interaction of toggling the grid tiles...
            clearInterval(timer.playerTimer);
            grid.disablePlayerFillGrid();

            // ...Checks the results of the player's grid in relation to the answer grid and output the results (accuracy percentage)
            grid.playerGuessToArray();
            console.log(grid.accuracyCheck(grid.playerGrid, grid.answerGrid));
            grid.displayResults();
          }

          // Adds an extra '0' in the displayed timer when the timer hits single digits
          else if (timer.countdown < 10) {
            $(".timer").html("0:0" + timer.countdown);
            console.log(timer.countdown);
          }

          else {
            $(".timer").html("0:" + timer.countdown);
            console.log(timer.countdown);
          }

          timer.countdown--;
        }, 1000);
      }

      // Adds an extra '0' in the displayed timer when the timer hits single digits
      else if (timer.peekTimer < 10) {
        $(".timer").html("0:0" + timer.peekTimer);
        console.log(timer.peekTimer);
      }
      else {
        $(".timer").html("0:" + timer.peekTimer);
        console.log(timer.peekTimer);
      }
      timer.peekTimer--;
    }, 1000)
  });
}

grid.difficultyCheck = function() {
  // listens to buttons in the 'Options' section
  $(".game-options__container").on("click", function() {
    grid.reset();
    // grid.hideResults();
    let difficulty = $('input[name=level]:checked').val();
    let tileStyle = $('input[name=tile]:checked').val();
    if (difficulty === "easy") {
      grid.changeGrid(3);
    }
    else if (difficulty === "medium") {
      grid.changeGrid(4);
    }
    else if (difficulty === "hard") {
      grid.changeGrid(5);
    }
    else if (difficulty === "wizard") {
      grid.changeGrid(6);
    }
    if (tileStyle === "pug") {
      $('.correct-tile').css('background-image', `url("../../assets/pug.png")`);
    }
  });
}

grid.changeGrid = function(rows) {
  // change the grid layout based on number of rows specified
  grid.rows = rows;
  $('.grid-container').empty();
  for (let count = 0; count < Math.pow(rows, 2); count++) {
    $('.grid-container').append(`<div class="tile tile-${count + 1}"></div>`);
  }
  $('.grid-container').css(`grid-template-columns`, `repeat(${rows}, calc(100%/${rows})`);
}

grid.randomGrid = function (rows) {
  filledGrid = [];
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

grid.reset = function() {
  // reset the game
  grid.clearGrid();
  grid.hideResults();
  grid.disablePlayerFillGrid();
  clearInterval(timer.initialTimer);
  clearInterval(timer.playerTimer);
}

grid.forceCheck = function() {
  // 'Check!' button interaction
  $('.game-menu__check-button').on('click', function() {
    console.log("clicked me");
    grid.playerGuessToArray();
    grid.accuracyCheck(grid.playerGrid, grid.answerGrid);
    grid.displayResults();
    clearInterval(timer.initialTimer);
    clearInterval(timer.playerTimer);
  });
}

grid.playerFillGrid = function () {
  // allow the player to toggle the HTML tiles
  $('.tile').on('click', function () {
    $(this).toggleClass("correct-tile");
  })
}

grid.disablePlayerFillGrid = function () {
  $('.tile').off('click');
}

grid.displayResults = function() {
  $('.game-results').removeClass('game-results--hidden');
  $('.game-results__accuracy').html(`Accuracy: ${grid.accuracyCheck(grid.playerGrid, grid.answerGrid)}%`);
}

grid.hideResults = function() {
  $('.game-results').addClass('game-results--hidden');
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

$(function() {
  grid.init();
});




