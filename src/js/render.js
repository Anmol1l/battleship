import { Ship } from "./ship.js";

export function renderBoard(board, canvas) {
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

function renderShip(ship, canvas) {
    const shipBody = document.createElement("div");
    shipBody.classList.add("unplace-ship");
    shipBody.dataset.length = `${ship.getLength()}`
    shipBody.draggable = true;

    for (let i = 0; i < ship.getLength(); i++) {
        const hitBox = document.createElement("span");
        hitBox.classList.add("hitBox");
        shipBody.appendChild(hitBox);
    }
    canvas.appendChild(shipBody);
}

export function renderUnplacedShips(canvas) {
    let s1 = Ship(4);
    let s2 = Ship(2);
    let s3 = Ship(3);
    let s4 = Ship(4);
    let s5 = Ship(2);

    renderShip(s1, canvas);
    renderShip(s2, canvas);
    renderShip(s3, canvas);
    renderShip(s4, canvas);
    renderShip(s5, canvas);
}
