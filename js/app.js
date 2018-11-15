
const grid = {};
grid.rows = 5;
grid.answerGrid = [];
grid.playerGrid = [];
grid.tileClassArray = [];

const timer = {};
timer.initialTime = 20;

$(function() {

  grid.randomGrid = function(rows) {
    filledGrid = []
    for (let currRow = 0; currRow < Math.pow(rows, 2); currRow++) {
      filledGrid.push(_.sample([true, false]));
    }
    return filledGrid;
  }

  grid.fillGrid = function(gridArray) {
    for (let currItem = 0; currItem < gridArray.length; currItem++) {
      if (gridArray[currItem] === true) {
        console.log($(".tile-" + (currItem + 1)));
        $(".tile-" + (currItem+1)).addClass("correct-tile"); 
      }
    }
  }

  grid.playerFillGrid = function() {
    $('.tile').on('click', function() {
      $(this).toggleClass("correct-tile");
    })
  } 

  grid.playerGuessToArray = function() {
    grid.playerGrid = [];
    $('.grid-container > .tile').each(function () {
      // iterate through each child in the .grid-container
      if ($(this).hasClass("correct-tile")) {
        grid.playerGrid.push(true);
      }
      else {
        grid.playerGrid.push(false)
      }
    })
    console.log(grid.tileClassArray);
  }

  grid.accuracyCheck = function(playerArray, answerArray) {
    let correctCount = 0;
    for (let arrayItemCheck = 0; arrayItemCheck < playerArray.length; arrayItemCheck++) {
      if (playerArray[arrayItemCheck] === answerArray[arrayItemCheck]) {
        correctCount++;
      }
    }
    return Math.floor(correctCount / playerArray.length * 100);
  }

  grid.clearGrid = function() {
    $(".tile").removeClass("correct-tile");
  }

  timer.gameTimer = function() {
    if (timer.initialTime < 0) {
      console.log("timer ended");
      clearInterval(timerFunction);
      return true;
      // quit game, display results
    }
    else if (timer.initialTime < 10) {
      $(".timer").html("0:0" + timer.initialTime);
      timer.initialTime--;
      console.log(timer.initialTime);
    }
    else {
      $(".timer").html("0:" + timer.initialTime);
      timer.initialTime--;
      console.log(timer.initialTime);
    }
  }

  

  grid.answerGrid = grid.randomGrid(grid.rows);
  grid.fillGrid(grid.answerGrid);
  let timerFunction = setInterval(timer.gameTimer, 1000);

  

  // console.log(grid.answerGrid);

  // function obstacleMove(tileRow) {
  //   let speed = 200;
  //   let delayTime = 1000;
  //   let frame = 1;
  //   let xPosition = 1;

  //   while (true) {
  //     // reset the frames to 1 based on the row
  //     if (frame % 6 == 0) {
  //       xPosition = 1;
  //     }

  //     // ** replace .box with .tile in future **
  //     let currPosition = $('.tile-x' + xPosition + tileRow);

  //     setInterval(() => drawObstacle(currPosition), (frame - 1) * (delayTime + speed));

  //     frame++;
  //     xPosition++;
  //   }
  // };

  // function drawObstacle(position) {
  //   // removes all instance of the obstacle
  //   $('.tile').removeClass("obstacle-salad");
  //   // adds the obstacle at the specified argument
  //   position.addClass("obstacle-salad");
  //   // checks if the pug is there, if so, remove it
  //   if (position.hasClass("pug")) {
  //     position.removeClass("pug");
  //   }
  // }

  // obstacleMove('y1');
});




