import { Gameboard } from "./gameboard.js";
import { renderBoard } from "./render.js";

export function Player(canvas) {
    let board = Gameboard();
    return { board, canvas }
}

const boardCanvas1 = document.querySelector(".board1");
let p1 = Player();


const boardCanvas2 = document.querySelector(".board2");
let p2 = Player();


renderBoard(p1.board, boardCanvas1);
renderBoard(p2.board, boardCanvas2);
