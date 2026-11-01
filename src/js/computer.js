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

function isValidIndex(row, col) {
    return row >= 0 && row <= 9 && col >= 0 && col <= 9;
}

let cordsArray = [];
let successHit = false;

function getAttackCords() {
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

let cordsSwitch = [0, 0, 0, 0];
function getNearestCordsOnHit() {
    let cords = cordsArray[0];
    if (isValidIndex(cords[0] + 1, cords[1]) && !cordsSwitch[0]) {
        cordsArray.push([cords[0] + 1, cords[1]]);
        return 0;
    } else if (isValidIndex(cords[0], cords[1] + 1) && !cordsSwitch[1]) {
        cordsArray.push([cords[0], cords[1] + 1]);
        return 1;
    } else if (isValidIndex(cords[0] - 1, cords[1]) && !cordsSwitch[2]) {
        cordsArray.push([cords[0] - 1, cords[1]]);
        return 2;
    } else if (isValidIndex(cords[0], cords[1] - 1) && !cordsSwitch[3]) {
        cordsArray.push([cords[0], cords[1] - 1]);
        return 3;
    } else {
        cordsArray = [];
        cordsSwitch = [0, 0, 0, 0];
        return null;
    }
}

export function attackComputer(player) {
    return new Promise((resolve) => {
        const board = document.querySelector(".board1");
        let attackCord;
        let changeCordSwitch;
        if (successHit === false && cordsArray.length === 0) {
            attackCord = getAttackCords();
            cordsSwitch = [0, 0, 0, 0];
        } else {
            while (true) {
                changeCordSwitch = getNearestCordsOnHit();
                attackCord = cordsArray.at(-1);
                if(!attackCord) 
                    attackCord = getAttackCords();
                if (trackAttack[attackCord[0]][attackCord[1]]) {
                    if(changeCordSwitch === null) break;
                    cordsSwitch[changeCordSwitch] = 1;
                    continue;
                } else {
                    trackAttack[attackCord[0]][attackCord[1]] = 1;
                    break;
                }
            }
        }
        const square = board.querySelector(
            `.square[data-cords="${attackCord[0]},${attackCord[1]}"]`,
        );

        let ship = player.board.receiveAttack(attackCord[0], attackCord[1]);
        if (player.board.getBoard()[attackCord[0]][attackCord[1]] === 0) {
            square.classList.add("miss", "hit");
            successHit = false;
            resolve("miss");
            cordsSwitch[changeCordSwitch] = 1;
        } else {
            square.classList.add("success", "hit");
            highlightHitShip(ship, 1);
            cordsArray = [[attackCord[0], attackCord[1]]];
            successHit = true;
            resolve("success");
        }
    });
}
