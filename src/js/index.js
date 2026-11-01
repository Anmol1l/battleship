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

export let p1;
export let p2;

const vsPlayerBtn = document.querySelector(".vsPlayer");
const dialog = document.querySelector("#startDialog");
const vsComputerBtn = document.querySelector(".vsCom");

dialog.showModal();

vsPlayerBtn.addEventListener("click", () => {
    startvsPlayer();
    dialog.close();
});

vsComputerBtn.addEventListener("click", () => {
    startvsCom();
    dialog.close();
});

function startvsPlayer() {
    p1 = Player("Player1");
    p2 = Player("Player2");
    initialise();
}

function startvsCom() {
    p1 = Player("You");
    p2 = Player("Computer", true);
    initialise();
}

export async function check() {
    const results = await Promise.all([confirmAndStart(1), confirmAndStart(2)]);
    if (results.every(Boolean)) {
        startGame();
    }
}
check();

function checkWin(p1, p2) {
    if(p1.checkIfLose()) {
        alert(`${p2.getName()} Won`)
    }
    if(p2.checkIfLose()) {
        alert(`${p1.getName()} Won`)
    }
}

export async function startGame() {
    if (p2.isComputer()) {
        startGameComputer();
        return;
    }
    let p1Turn = true;
    let p2Turn = false;
    const board1 = document.querySelector(".board1");
    const board2 = document.querySelector(".board2");
    while (!p1.checkIfLose() && !p2.checkIfLose()) {
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
    checkWin(p1,p2);
}

async function startGameComputer() {
    let p1Turn = true;
    let p2Turn = false;
    const board1 = document.querySelector(".board1");
    const board2 = document.querySelector(".board2");
    while (!p1.checkIfLose() && !p2.checkIfLose()) {
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
    checkWin(p1, p2)
}

function initialise() {
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
}
