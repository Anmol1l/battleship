import { findValidBoardCoords } from "./gameboard.js";
import { renderBoard, clearBoard } from "./render.js";
import { Ship } from "./ship.js";

export function monitorAttacks(player, boardNum) {
    const squares = document.querySelectorAll(`.board${boardNum} > .square`);
    squares.forEach((square) => {
        square.addEventListener("click", () => {
            if (square.classList.contains("hit")) return;
            const cordsData = square.dataset.cords;
            const cord = cordsData.split(",");
            player.board.receiveAttack(cord[0], cord[1]);
            if (player.board.getBoard()[cord[0]][cord[1]] === 0)
                square.classList.add("miss", "hit");
            else square.classList.add("success", "hit");

            if (player.checkWin()) {
                alert(`${player.getName()} wins`);
            }
        });
    });
}

function clearHighlights(boardNum) {
    const squares = document.querySelectorAll(`.board${boardNum} > .square`);
    squares.forEach((square) => {
        square.style.backgroundColor = "";
    });
}

export function handleDragDrop(player, boardNum) {
    const ships = document.querySelectorAll(
        `.buttons-ship${boardNum} .unplace-ship`,
    );
    let length = null;
    let newShip = null;

    ships.forEach((ship) => {
        ship.addEventListener("dragstart", () => {
            length = ship.dataset.length;
            newShip = Ship(length);
        });

        ship.addEventListener('dragend', () => {
        clearHighlights(boardNum);
        })
    });

    let cordsArray;
    const squares = document.querySelectorAll(`.board${boardNum} > .square`);
    squares.forEach((square) => {
        square.addEventListener("dragenter", () => {
            clearHighlights(boardNum);
            const cordsData = square.dataset.cords;
            const cord = cordsData.split(",");
            cordsArray = findValidBoardCoords(+cord[0], +cord[1], length);
            for (const cord of cordsArray) {
                const data = cord.join(",");
                const box = document.querySelector(
                    `.board${boardNum} > div[data-cords="${data}"]`,
                );
                box.style.backgroundColor = "skyblue";
            }
        });

        square.addEventListener('dragover', (e) => {
            e.preventDefault();
        })

        square.addEventListener('drop', () => {
            player.board.placeShip(cordsArray[0][0], cordsArray[0][1], newShip);
        })

    });
}