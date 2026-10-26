import { findValidBoardCoords } from "./gameboard.js";
import { renderBoard, clearBoard } from "./render.js";
import { Ship } from "./ship.js";

export function monitorAttacks(player, boardNum) {
    const board = document.querySelector(`.board${boardNum}`);
    board.addEventListener('click', (e) => {
        if(e.target.matches(".square")) {
            if (e.target.classList.contains("hit")) return;
            const cordsData = e.target.dataset.cords;
            const cord = cordsData.split(",");
            player.board.receiveAttack(cord[0], cord[1]);
            if (player.board.getBoard()[cord[0]][cord[1]] === 0)
                e.target.classList.add("miss", "hit");
            else e.target.classList.add("success", "hit");

            if (player.checkWin()) {
                alert(`${player.getName()} wins`);
            }
        }
    })
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
            newShip = Ship(+length);
        });

        ship.addEventListener("dragend", (e) => {

            if(e.dataTransfer.dropEffect !== 'none') {
                ship.classList.add('placed')
                ship.draggable = false;
            }
            clearHighlights(boardNum);
        });
    });

    let cordsArray;
    const board = document.querySelector(`.board${boardNum}`);
    board.addEventListener("dragenter", (e) => {
        if (e.target.matches(".square")) {
            clearHighlights(boardNum);
            const cordsData = e.target.dataset.cords;
            const cord = cordsData.split(",");
            cordsArray = findValidBoardCoords(+cord[0], +cord[1], length);
            for (const cord of cordsArray) {
                const data = cord.join(",");
                const box = document.querySelector(
                    `.board${boardNum} > div[data-cords="${data}"]`,
                );
                box.style.backgroundColor = "skyblue";
            }
        }
    });

    board.addEventListener("dragover", (e) => {
        if (e.target.matches(".square") && !e.target.matches(".ship"))
            e.preventDefault();
    });

    board.addEventListener("drop", (e) => {
        if (e.target.matches(".square") && !e.target.matches(".ship")) {
           if(!player.board.placeShip(cordsArray[0][0], cordsArray[0][1], newShip))
                return;

            clearBoard(boardNum);
            renderBoard(player.board, boardNum);
        }
    });
}
