## pugger/dugger ft. dug ##
## a take on retro frogger ##

objective: have the player (dug) reach from the finish line (top row of grid) without running into any obstacles

## dug (player) ##

- Have jQuery keypresses
    - moveUp() => moves the player up one tile up (y+1) provided it is not a north edge (in which the player does not move), then calls checkObstacle(), then calls checkWinCondition()
    - moveDown() => moves the player up one tile up (y-1) provided it is not a south edge (in which the player does not move), then calls checkObstacle(), then calls checkWinCondition()
    - moveLeft() => moves the player up one tile up (x-1) provided it is not a west edge (in which the player does not move), then calls checkObstacle(), then calls checkWinCondition()
    - moveRight() => moves the player up one tile up (x+1) provided it is not an east edge (in which the player does not move), then calls checkObstacle(), then calls checkWinCondition()

## obstacles ##

- Obstacles very in different bg-images, animation speed, and direction (left or right)
    - animation speed and direction are chosen at random (in the case for animation speed, from a range set)
- Obstacles' pseudo-code:
    a. have a function loop infinitely which takes a bg-image, random animation speed, and random left/right direction
    b. set a setTimeout with millisecond given by the random animation speed
    c. check if it goes left or right (if left, run a decrement for-loop, otherwise run an increment for-loop)
    d.  i) removeClass of obstacle-a, then draw obstacle-a (addClass) at the starting position (this is fixed for simplicity)
        ii) call checkObstacle()
        iii) loop i) with incrementing/decrementing x-axis
        iv) consider break conditions (a. when player wins, b. when timer runs out, c. when player ran out of lives)

## main game (pre-loop) ##

1. drawDug
2. drawObstacles * 4
3. startTimer

## main game (loop) ##

1. checkTimer
1. checkObstacleCollision
2. event listenener for player move
3. checkWinCondition

## additional consideration ##

a. if dug has "health points" - 3HP - will need to consider
b. multiple end points dug needs to go to fulfill win condition