import { Gameboard } from "./gameboard.js";

export function renderBoard(board, canvas) {

    for (let i = 0; i < board.rows; i++) {
        for (let j = 0; j < board.cols; j++) {
            const square = document.createElement('div');
            square.classList.add('square');
            square.dataset.cords = `${i},${j}`;
            canvas.appendChild(square);
        }
    }
}