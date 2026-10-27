import { Gameboard } from "./gameboard.js";

export function Player(name) {
    const playerName = name;
    const computer = true;
    let board = Gameboard();
    function getName() {
        return playerName;
    }
    function isComputer() {
        return computer
    }
    function checkWin() {
        return board.allShipsDestroyed();
    }
    return { board, getName, isComputer, checkWin };
}