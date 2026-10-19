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

findValidBoardCoords(9, 9, 1);

export function Gameboard() {
    const rows = 10;
    const cols = 10;
    const board = Array.from({ length: rows }, () => Array(cols).fill(0));
    function getBoard() {
        return board;
    }

    const shipsPlaced = [];

    function placeShip(row, col, ship) {
        const cordsArr = findValidBoardCoords(row, col, ship.getLength());
        shipsPlaced.push(ship);
        for (let cord of cordsArr) {
            board[cord[0]][cord[1]] = ship;
        }
    }

    const storeMissedAttacks = [];
    function getMissedAttacks() {
        return storeMissedAttacks;
    }

    const storeHitAttacks = [];
    function getHitAttacks() {
        return storeHitAttacks;
    }

    function checkIfHit(row, col) {
        return storeHitAttacks.includes(`${row},${col}`);
    }

    function receiveAttack(row, col) {
        if (checkIfHit(row, col)) return -1;

        if (board[row][col]) {
            let ship = board[row][col];
            ship.hit();
            storeHitAttacks.push(`${row},${col}`);
        } else {
            storeMissedAttacks.push(`${row},${col}`);
        }
    }

    function allShipsDestroyed() {
        for (let ship of shipsPlaced) {
            if (!ship.isSunk()) return false;
        }
        return true;
    }

    return {
        placeShip,
        getBoard,
        receiveAttack,
        getMissedAttacks,
        getHitAttacks,
        allShipsDestroyed,
    };
}