$(function() {

  let rows = 5;
  let answerGrid = [];

  // get an array of true/false with respect to # of squares in 
  function randomGrid(rows) {
    filledGrid = []
    for (let currRow = 0; currRow < Math.pow(rows, 2); currRow++) {
      filledGrid.push(_.sample([true, false]));
    }
    return filledGrid;
  }

  function fillGrid(gridArray) {
    for (let currItem = 0; currItem < gridArray.length; currItem++) {
      if (gridArray[currItem] === true) {
        console.log($(".tile-" + (currItem + 1)));
        $(".tile-" + (currItem+1)).addClass("correct-tile"); 
      }
    }
  }

  answerGrid = randomGrid(rows);
  fillGrid(answerGrid);
  console.log(answerGrid);

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

  //     setTimeout(() => drawObstacle(currPosition), (frame - 1) * (delayTime + speed));

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




