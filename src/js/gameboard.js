import { Ship } from "./ship.js";

function isValidIndex(row, col) {
    return row >= 0 && row <= 9 && col >= 0 && col <= 9;
}

let findCordsVertical = false;

export function toggleVertical() {
    findCordsVertical = !findCordsVertical;
}

function findValidBoardCoordsVert(row, col, length) {
    let cordArray = [];
    if (isValidIndex(row + (length - 1), col)) {
        for (let i = 0; i < length; i++) {
            cordArray.push([row + i, col]);
        }
        return cordArray;
    }
    for (let i = 0; i < length; i++) {
        cordArray.push([row - i, col]);
    }
    return cordArray;
}

export function findValidBoardCoords(row, col, length) {
    if (findCordsVertical) {
        return findValidBoardCoordsVert(row, col, length);
    } else {
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
}

export function Gameboard() {
    const rows = 10;
    const cols = 10;
    let board = Array.from({ length: rows }, () => Array(cols).fill(0));
    function getBoard() {
        return board;
    }

    function reset() {
        board = Array.from({ length: rows }, () => Array(cols).fill(0));
    }

    const shipsPlaced = [];

    function placeShip(row, col, ship) {
        const cordsArr = findValidBoardCoords(row, col, ship.getLength());
        for (let cord of cordsArr) {
            if (!Number.isInteger(board[cord[0]][cord[1]])) return false;
        }
        shipsPlaced.push(ship);
        for (let cord of cordsArr) {
            board[cord[0]][cord[1]] = ship;
        }
        return true;
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
            return ship;
        } else {
            storeMissedAttacks.push(`${row},${col}`);
            return null;
        }
    }

    function allShipsDestroyed() {
        for (let ship of shipsPlaced) {
            if (!ship.isSunk()) return false;
        }
        return true;
    }

    return {
        rows,
        cols,
        placeShip,
        getBoard,
        reset,
        receiveAttack,
        getMissedAttacks,
        getHitAttacks,
        allShipsDestroyed,
    };
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomCords(player) {
    const shipLengths = [4, 2, 3, 4, 2];
    for (const ship of shipLengths) {
        const vertical = getRandomInt(0,1);
        if(vertical) toggleVertical();
        while (true) {
            let row = getRandomInt(0, 9);
            let col = getRandomInt(0, 9);
            let newShip = Ship(ship);
            if (player.board.placeShip(row, col, newShip)) break;
        }
    }
    findCordsVertical = false;
}
