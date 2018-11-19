// when selecting tile, you need to adjust fillgrid and enable player fill grid with a modifier of the selected tile


const grid = {};
grid.correctCount = 0;
grid.rows = 4;
grid.answerGrid = [];
grid.tileClassArray = [];
grid.playerGrid = [];
grid.tileStyle = '';
grid.initialTimer = 0;
grid.peekTimer = 10;
grid.countdown = 15;
grid.playerTimer = 0;
grid.imageObjects = {
  pug: `<img class='pug' src='assets/pug.png' alt='smiling pug dog sitting on floor'>`,
  salad: `<img class='salad' src='assets/salad.png' alt='cartoon image of salad in a bowl'>`,
  coffee: `<img class='coffee' src='assets/coffee.png' alt='cartoon image of coffee in a cup with coffee beans beside it'>`
}

grid.init = function() {
  grid.optionsCheck();
  grid.startGame();
}

grid.startGame = function() {
  // Starts the game as soon as 'Start!' button is pushed
  $('form').on('submit', function(event) {
    event.preventDefault();

    // If the game still running, reset all necessary functions to prevent errors/bugs
    grid.reset();

    // Randomly fills the grid
    grid.answerGrid = grid.randomGrid(grid.rows);
    grid.fillGrid(grid.answerGrid);

    // Gives the player 10 seconds to look at the answer grid (peek timer)
    grid.peekTimer = 10;
    grid.initialTimer = setInterval(grid.peekPhase, 1000)
  });
}

grid.peekPhase = function () {
  // As soon as the peek timer runs out...
  if (grid.peekTimer < 0) {

    // Stops the timer from counting down to negative values, wipe out the grid, and allow the player the interact the grid and toggle the tiles they need to replicate the answer grid
    clearInterval(grid.initialTimer);
    grid.clearGrid();
    grid.playerFillGrid();

    // Gives the player a countdown timer to play the game
    grid.countdown = 15;
    grid.playerTimer = setInterval(grid.playerPhase, 1000);
  }

  // Adds an extra '0' in the displayed timer when the timer hits single digits
  else if (grid.peekTimer < 10) {
    $('.game-menu-timer').html('0:0' + grid.peekTimer);
  }
  else {
    $('.game-menu-timer').html('0:' + grid.peekTimer);
  }
  grid.peekTimer--;
}

grid.playerPhase = function () {
  // During any point in the game after the peek timer, player can force the game to check his/her answer and end the game via 'Check!' button
  grid.forceCheck();

  // As soon as the countdown timer runs out...
  if (grid.countdown < 0) {

    // Stops the timer from counting down to negative values, disables the interaction of toggling the grid tiles...
    clearInterval(grid.playerTimer);
    grid.disablePlayerFillGrid();

    // ...Checks the results of the player's grid in relation to the answer grid and output the results (accuracy percentage)
    grid.playerGuessToArray();
    grid.displayResults();
  }

  // Adds an extra '0' in the displayed timer when the timer hits single digits
  else if (grid.countdown < 10) {
    $('.game-menu-timer').html('0:0' + grid.countdown);
  }

  else {
    $('.game-menu-timer').html('0:' + grid.countdown);
  }

  grid.countdown--;
}

grid.optionsCheck = function() {
  // listens to buttons in the 'Options' section
  $('.game-options__container').on('click', function() {
    grid.reset();
    // grid.hideResults();
    let difficulty = $('input[name=level]:checked').val();
    grid.tileStyle = $('input[name=tile]:checked').val();
    $('.game-menu-difficulty__display').html(difficulty);
    if (difficulty === 'easy') {
      grid.changeGrid(3);
    }
    else if (difficulty === 'medium') {
      grid.changeGrid(4);
    }
    else if (difficulty === 'hard') {
      grid.changeGrid(5);
    }
    else if (difficulty === 'wizard') {
      grid.changeGrid(6);
    }

    if (grid.tileStyle === 'pug' || grid.tileStyle === 'coffee' || grid.tileStyle === 'salad') {
      $('.tile').html(grid.imageObjects[grid.tileStyle]);
    }
    else if (grid.tileStyle === 'default') {
      $('.tile').empty();
      $('.tile').addClass('correct-tile');
      grid.tileStyle = '';
    }
  });
}

grid.changeGrid = function(rows) {
  // change the grid layout based on number of rows specified
  grid.rows = rows;
  $('.grid-container').empty();
  for (let count = 0; count < Math.pow(rows, 2); count++) {
    $('.grid-container').append(`<div class='tile tile-${count + 1}'></div>`);
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
  $('.tile').empty();
  for (let currItem = 0; currItem < gridArray.length; currItem++) {
    if (gridArray[currItem] === true) {
      $('.tile-' + (currItem + 1)).addClass('correct-tile');
      if (grid.tileStyle !== '') {
        $('.correct-tile').html(grid.imageObjects[grid.tileStyle]);
      }
    }
  }
}

grid.reset = function() {
  // reset the game
  grid.clearGrid();
  grid.hideResults();
  grid.disablePlayerFillGrid();
  grid.disableForceCheck();
  clearInterval(grid.initialTimer);
  clearInterval(grid.playerTimer);
  $('.game-menu-timer').html('0:10');
}

grid.forceCheck = function() {
  // 'Check!' button interaction
  $('.game-menu__check-button').on('click', function() {
    grid.playerGuessToArray();
    grid.accuracyCheck(grid.playerGrid, grid.answerGrid);
    grid.displayResults();
    clearInterval(grid.initialTimer);
    clearInterval(grid.playerTimer);
  });
}

grid.playerFillGrid = function () {
  // allow the player to toggle the HTML tiles
  $('.tile').on('click', function () {
    $(this).toggleClass('correct-tile');
    if ($(this).children().hasClass(grid.tileStyle)) {
      $(this).empty();
    }
    else {
      $(this).html(grid.imageObjects[grid.tileStyle]);
    }
  });
}

grid.disablePlayerFillGrid = function () {
  $('.tile').off('click');
}

grid.disableForceCheck = function() {
  $('.game-menu__check-button').off('click');
}

grid.displayResults = function() {
  grid.disablePlayerFillGrid();
  $('.game-results__accuracy').html(`Accuracy: ${grid.accuracyCheck(grid.playerGrid, grid.answerGrid)}%`);
  $('.game-results__total').html(`Correct tiles: ${grid.correctCount} / ${Math.pow(grid.rows, 2)}`);
  $('.game').css('overflow', 'hidden');
  $('.game-results').fadeIn('slow', function () {
    $('.game-results').css('display', 'block');
  });
  $('.game-results-button').on('click', function() {
    grid.hideResults();
  });
}

grid.hideResults = function() {
  $('.game').css('overflow', 'auto');
  $('.game-results').fadeOut('slow', function() {
    // $('game-results').css('display', 'none');
  });
}

grid.playerGuessToArray = function () {
  grid.playerGrid = [];
  $('.grid-container > .tile').each(function () {
    // iterate through each child in the .grid-container and check if they are selected or not
    if ($(this).hasClass('correct-tile')) {
      grid.playerGrid.push(true);
    }
    else {
      grid.playerGrid.push(false)
    }
  })
}

grid.accuracyCheck = function (playerArray, answerArray) {
  // returns a percentage of how accurate the player's grid with the answer grid
  grid.correctCount = 0;
  for (let arrayItemCheck = 0; arrayItemCheck < playerArray.length; arrayItemCheck++) {
    if (playerArray[arrayItemCheck] === answerArray[arrayItemCheck]) {
      grid.correctCount++;
    }
  }
  return Math.floor(grid.correctCount / playerArray.length * 100);
}

grid.clearGrid = function () {
  // clears the HTML grid
  $('.tile').removeClass('correct-tile');
  $('.tile').empty();
}

$(function() {
  grid.init();
});




