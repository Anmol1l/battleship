import { Ship } from "./ship.js";

function isValidIndex(row, col) {
    return row >= 0 && row <= 9 && col >= 0 && col <= 9;
}

export function findValidBoardCoords(row, col, length) {
    let cordArray = [];
    if (isValidIndex(row, col + (length - 1))) {
        for (let i = 0; i < length; i++) {
            cordArray.push([row, col + i]);
        }
        return cordArray;
    }
    for (let i = 0; i < length; i++) {
        cordArray.push([row, col - i]);
    }
    return cordArray;
}

findValidBoardCoords(9, 9, 10);

export function Gameboard() {
    const rows = 10;
    const cols = 10;
    const board = Array.from({ length: rows }, () => Array(cols).fill(0));

    function placeShip() {
        // return findValidBoardCoords(0,0,2);
    }
    return { placeShip };
}
