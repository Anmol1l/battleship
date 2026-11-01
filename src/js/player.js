import { Gameboard } from "./gameboard.js";

export function Player(name, ai = false) {
    const playerName = name;
    const computer = ai;
    let board = Gameboard();
    function getName() {
        return playerName;
    }
    function isComputer() {
        return computer
    }
    function checkIfLose() {
        return board.allShipsDestroyed();
    }
    return { board, getName, isComputer, checkIfLose };
}