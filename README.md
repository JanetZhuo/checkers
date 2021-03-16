# Checkers
Code in plain js, not executable at the moment, just to show the logic when move pieces.
The board is 8*8, and has 12 white pieces and 12 red pieces, has two players.

## &sect; Several Rules
- When you can jump, you must jump
- Man can become King

## &sect; $TODO
- Store the position when a piece jumped, to see if there is DOUBLE JUMP
- Check kinged of piece for backward moves, and change man to king when applicable
- Set timer for each turn, calculate the steps and score
- Check if there is a winner and game over

## &sect; Steps
- STEP 1: 
 We need to check if the player must jump, if so we must to do the jump rather than other normal move. Eg. white player is must jump to kill red piece 
 - STEP 2:
 We need to check if this piece we selected is moveable, if not then the move is not valid
- STEP 3:
 We get all possible moves for this piece, assume we know where we're going to move and check if the move is one of the possible moves
- STEP 4: 
 If all good, we'll do a move and switch turns

 ## &sect; Potential solution
 - Use string to present positions of the pieces and movements
 - Check https://en.wikipedia.org/wiki/Portable_Draughts_Notation for more info