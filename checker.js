// The real board is 8*8, we add extra row and column beyond it to make it 10*10
// use -1 to represent to the position not really exist
let board = [
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, 0, 13, 0, 14, 0, 15, 0, 16, -1],
    [-1, 17, 0, 18, 0, 19, 0, 20, 0, -1],
    [-1, 0, 21, 0, 22, 0, 23, 0, 24, -1],
    [-1, 0, 0, 0, 0, 0, 0, 0, 0, -1],
    [-1, 0, 0, 0, 0, 0, 0, 0, 0, -1],
    [-1, 1, 0, 2, 0, 3, 0, 4, 0, -1],
    [-1, 0, 5, 0, 6, 0, 7, 0, 8, -1],
    [-1, 9, 0, 10, 0, 11, 0, 12, 0, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
];

//white and red each has 12 pieces, xy indicates the location on board
//TODO: add kinged to piece, eg. { x: 0, y: 2, color: 'W', king: false },
let whitePieces = [
    { x: 0, y: 2, color: 'W', isCaptured: false },
    { x: 2, y: 2, color: 'W', isCaptured: false },
    { x: 4, y: 2, color: 'W', isCaptured: false },
    { x: 6, y: 2, color: 'W', isCaptured: false },
    { x: 1, y: 1, color: 'W', isCaptured: false },
    { x: 3, y: 1, color: 'W', isCaptured: false },
    { x: 5, y: 1, color: 'W', isCaptured: false },
    { x: 7, y: 1, color: 'W', isCaptured: false },
    { x: 0, y: 0, color: 'W', isCaptured: false },
    { x: 2, y: 0, color: 'W', isCaptured: false },
    { x: 4, y: 0, color: 'W', isCaptured: false },
    { x: 6, y: 0, color: 'W', isCaptured: false }
];
let redPieces = [
    { x: 1, y: 7, color: 'R', isCaptured: false },
    { x: 3, y: 7, color: 'R', isCaptured: false },
    { x: 5, y: 7, color: 'R', isCaptured: false },
    { x: 7, y: 7, color: 'R', isCaptured: false },
    { x: 0, y: 6, color: 'R', isCaptured: false },
    { x: 2, y: 6, color: 'R', isCaptured: false },
    { x: 4, y: 6, color: 'R', isCaptured: false },
    { x: 6, y: 6, color: 'R', isCaptured: false },
    { x: 1, y: 5, color: 'R', isCaptured: false },
    { x: 3, y: 5, color: 'R', isCaptured: false },
    { x: 5, y: 5, color: 'R', isCaptured: false },
    { x: 7, y: 5, color: 'R', isCaptured: false }
];

// players
let players = [{ name: 'white player' }, { name: 'red player' }];
let isWhiteTurn = true;
// if a player must jump rather than normal move
let mustJump = false;
// TODO: need to store the jumped piece location, and check if we can do double jump


//STEP 1, for now just add all direction, later need to check if the piece is king for backwards direction
function mustJumpWhite() {
    const pieces = whitePieces.filter(o => o.isCaptured === false)
    for (const piece of pieces) {
        if (mustJumpInDirection(piece.x, piece.y, 1, 1, 'R')) return true;
        if (mustJumpInDirection(piece.x, piece.y, -1, 1, 'R')) return true;
        if (mustJumpInDirection(piece.x, piece.y, 1, -1, 'R')) return true;
        if (mustJumpInDirection(piece.x, piece.y, -1, -1, 'R')) return true;
    }
    return false;
}

function mustJumpRed() {
    const pieces = redPieces.filter(o => o.isCaptured === false)
    for (const piece of pieces) {
        if (mustJumpInDirection(piece.x, piece.y, 1, -1, 'W')) return true;
        if (mustJumpInDirection(piece.x, piece.y, -1, -1, 'W')) return true;
        if (mustJumpInDirection(piece.x, piece.y, 1, 1, 'W')) return true;
        if (mustJumpInDirection(piece.x, piece.y, -1, 1, 'W')) return true;
    }
    return false;
}

function mustJumpInDirection(x, y, dirX, dirY, color) {
    if (hasPiece(x + dirX, y + dirY)) { // if has piece
        const piece = getPieceByXY(x + dirX, y + dirY);
        if (piece.color === color && noPiece(x + 2 * dirX, y + 2 * dirY)) { // if can jump piece
            return true;
        }
    }
    return false;
}


//STEP 2, check if the selected piece able to move or not in any direction, if not we cannot select this piece
function canMove(x, y) {
    if (isWhite(x, y)) {
        return canMoveWhite(x, y);
    } else if (isRed(x, y)) {
        return canMoveRed(x, y);
    }
}

function canMoveWhite(x, y) {
    if (canMoveInDirection(x, y, 1, 1, 'R')) return true;
    if (canMoveInDirection(x, y, -1, 1, 'R')) return true;
    if (canMoveInDirection(x, y, 1, -1, 'R')) return true;
    if (canMoveInDirection(x, y, -1, -1, 'R')) return true;
    return false;
}

function canMoveRed(x, y) {
    if (canMoveInDirection(x, y, 1, -1, 'W')) return true;
    if (canMoveInDirection(x, y, -1, -1, 'W')) return true;
    if (canMoveInDirection(x, y, 1, 1, 'W')) return true;
    if (canMoveInDirection(x, y, -1, 1, 'W')) return true;
    return false;
}

function canMoveInDirection(x, y, dirX, dirY, color) {
    //if there is a piece, check if we can jump
    if (hasPiece(x + dirX, y + dirY)) {
        const piece = getPieceByXY(x + dirX, y + dirY);
        if (piece.color === color && noPiece(x + 2 * dirX, y + 2 * dirY)) {
            return true;
        }
        //check if we can do a normal move rather than jump, the mustJump is what we get in step 1
    } else if (noPiece(x + dirX, y + dirY) && !mustJump) {
        return true;
    }
    return false;
}


// Helpers
function getPieceByXY(x, y) {
    const num = board[8 - y][x + 1];
    if (num >= 1 && num <= 12) {
        return whitePieces[num - 1];
    } else if (num >= 13 && num <= 24) {
        return redPieces[num - 13];
    }
}

function getPieceByNum(num) {
    if (num >= 1 && num <= 12) {
        return whitePieces[num - 1];
    } else if (num >= 13 && num <= 24) {
        return redPieces[num - 13];
    }
}

function hasPiece(x, y) {
    const num = board[8 - y][x + 1];
    return num >= 1 && num <= 24;
}

function noPiece(x, y) {
    const num = board[8 - y][x + 1];
    return num === 0;
}

function isWhite(x, y) {
    const num = board[8 - y][x + 1];
    return num >= 1 && num <= 12;
}

function isRed(x, y) {
    const num = board[8 - y][x + 1];
    return num >= 13 && num <= 24;
}

function getNum(x, y) {
    return board[8 - y][x + 1];
}

