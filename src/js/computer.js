import { highlightHitShip } from "./dom.js";

export function placeShipsComputer() {
    const randomBtn = document.querySelector(".buttons-ship2 .randomise");
    randomBtn.click();
    const confirmBtn = document.querySelector(".buttons-ship2 .confirm");
    confirmBtn.click();
}
const rows = 10;
const cols = 10;
let trackAttack = Array.from({ length: rows }, () => Array(cols).fill(0));

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getAttackCords() {
    let row;
    let col;
    while (true) {
        row = getRandomInt(0, 9);
        col = getRandomInt(0, 9);
        if (!trackAttack[row][col]) {
            trackAttack[row][col] = 1;
            break;
        }
    }
    return [row, col];
}

export function attackComputer(player) {
    const board = document.querySelector(".board1");
    const attackCord = getAttackCords();
    const square = board.querySelector(
        `.square[data-cords="${attackCord[0]},${attackCord[1]}"]`,
    );

    let ship = player.board.receiveAttack(attackCord[0], attackCord[1]);
    if (player.board.getBoard()[attackCord[0]][attackCord[1]] === 0)
        square.classList.add("miss", "hit");
    else {
        square.classList.add("success", "hit");
        highlightHitShip(ship, 1);
    }

    if (player.checkWin()) {
        alert(`${player.getName()} wins`);
    }
}
