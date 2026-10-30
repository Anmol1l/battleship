import { Ship } from "./ship.js";

export function renderBoard(board, boardNum) {
    const canvas = document.querySelector(`.board${boardNum}`);
    for (let i = 0; i < board.rows; i++) {
        for (let j = 0; j < board.cols; j++) {
            const square = document.createElement("div");
            square.classList.add("square");
            square.dataset.cords = `${i},${j}`;
            if (board.getBoard()[i][j]) {
                square.classList.add("ship");
            }
            canvas.appendChild(square);
        }
    }
}

function renderShip(ship, boardNum) {
    const canvas = document.querySelector(`.buttons-ship${boardNum} > .unplaced-ships`);
    const shipBody = document.createElement("div");
    shipBody.classList.add("unplace-ship");
    shipBody.dataset.length = `${ship.getLength()}`
    shipBody.dataset.player = boardNum;
    shipBody.draggable = true;

    for (let i = 0; i < ship.getLength(); i++) {
        const hitBox = document.createElement("span");
        hitBox.classList.add("hitBox");
        shipBody.appendChild(hitBox);
    }
    canvas.appendChild(shipBody);
}

export function renderUnplacedShips(boardNum) {
    let s1 = Ship(4);
    let s2 = Ship(2);
    let s3 = Ship(3);
    let s4 = Ship(4);
    let s5 = Ship(2);

    renderShip(s1, boardNum);
    renderShip(s2, boardNum);
    renderShip(s3, boardNum);
    renderShip(s4, boardNum);
    renderShip(s5, boardNum);
}

export function clearBoard(boardNum) {
    const board = document.querySelector(`.board${boardNum}`);
    board.replaceChildren();
} 
