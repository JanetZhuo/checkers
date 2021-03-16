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
//if a piece is captured, remove it from the array.(we can also add isCaptured if we want to leave it in array)
//TODO: add kinged to piece, eg. { x: 0, y: 2, color: 'W', king: false },
let whitePieces = [
    { x: 0, y: 2, color: 'W' },
    { x: 2, y: 2, color: 'W' },
    { x: 4, y: 2, color: 'W' },
    { x: 6, y: 2, color: 'W' },
    { x: 1, y: 1, color: 'W' },
    { x: 3, y: 1, color: 'W' },
    { x: 5, y: 1, color: 'W' },
    { x: 7, y: 1, color: 'W' },
    { x: 0, y: 0, color: 'W' },
    { x: 2, y: 0, color: 'W' },
    { x: 4, y: 0, color: 'W' },
    { x: 6, y: 0, color: 'W' }
];
let redPieces = [
    { x: 1, y: 7, color: 'R' },
    { x: 3, y: 7, color: 'R' },
    { x: 5, y: 7, color: 'R' },
    { x: 7, y: 7, color: 'R' },
    { x: 0, y: 6, color: 'R' },
    { x: 2, y: 6, color: 'R' },
    { x: 4, y: 6, color: 'R' },
    { x: 6, y: 6, color: 'R' },
    { x: 1, y: 5, color: 'R' },
    { x: 3, y: 5, color: 'R' },
    { x: 5, y: 5, color: 'R' },
    { x: 7, y: 5, color: 'R' }
];

// players
let players = [{ name: 'white player' }, { name: 'red player' }];
let isWhiteTurn = true;
// if a player must jump rather than normal move
let mustJump = false;
// TODO: need to store the jumped piece location, and check if we can do double jump
