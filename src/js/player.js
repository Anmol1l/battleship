import { Gameboard } from "./gameboard.js";

export function Player(canvas) {
    let board = Gameboard();
    return { board, canvas }
}