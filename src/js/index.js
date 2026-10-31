import "../css/style.css";
import { renderBoard, renderUnplacedShips } from "./render.js";
import { Player } from "./player.js";
import {
    handleDragDrop,
    rotateButton,
    randomiseButton,
    resetButton,
    confirmAndStart,
    monitorAttacks,
} from "./dom.js";

import { attackComputer } from "./computer.js";

export let p1 = Player("player1");
export let p2 = Player("player2", true);

renderBoard(p1.board, 1);
renderBoard(p2.board, 2);

window.p1 = p1;
window.p2 = p2;

renderUnplacedShips(1);
renderUnplacedShips(2);

handleDragDrop(p1, 1);
handleDragDrop(p2, 2);

rotateButton();
randomiseButton(p1, 1);
randomiseButton(p2, 2);
resetButton(p1, 1);
resetButton(p2, 2);

export async function check() {
    const results = await Promise.all([confirmAndStart(1), confirmAndStart(2)]);
    if (results.every(Boolean)) {
        startGame();
    }
}
check();

export async function startGame() {
    if (p2.isComputer()) {
        startGameComputer();
        return;
    }
    let p1Turn = true;
    let p2Turn = false;
    const board1 = document.querySelector(".board1");
    const board2 = document.querySelector(".board2");
    while (!p1.checkWin() && !p2.checkWin()) {
        if (p1Turn) {
            board1.classList.add("higlight-turn");
            let result = await monitorAttacks(p1, 1);
            if (result === "success") continue;
            p2Turn = true;
            p1Turn = false;
            board1.classList.remove("higlight-turn");
        } else if (p2Turn) {
            board2.classList.add("higlight-turn");
            let result = await monitorAttacks(p2, 2);
            if (result === "success") continue;
            p1Turn = true;
            p2Turn = false;
            board2.classList.remove("higlight-turn");
        }
    }
}

async function startGameComputer() {
    console.log("hi");
    let p1Turn = true;
    let p2Turn = false;
    const board1 = document.querySelector(".board1");
    const board2 = document.querySelector(".board2");
    while (!p1.checkWin() && !p2.checkWin()) {
        if (p1Turn) {
            board1.classList.add("higlight-turn");
            let result = await attackComputer(p1, 1);
            if (result === "success") continue;
            p2Turn = true;
            p1Turn = false;
            board1.classList.remove("higlight-turn");
        } else if (p2Turn) {
            board2.classList.add("higlight-turn");
            let result = await monitorAttacks(p2, 2);
            if (result === "success") continue;
            p1Turn = true;
            p2Turn = false;
            board2.classList.remove("higlight-turn");
        }
    }
}
