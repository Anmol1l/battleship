import { Gameboard } from "./gameboard.js";

export function Player(name) {
    const playerName = name;
    let board = Gameboard();
    function getName() {
        return playerName;
    }
    function checkWin() {
        return board.allShipsDestroyed();
    }
    return { board, getName, checkWin };
}