import {
    findValidBoardCoords,
    toggleVertical,
    getRandomCords,
} from "./gameboard.js";

import { renderBoard, clearBoard } from "./render.js";
import { Ship } from "./ship.js";
import { placeShipsComputer } from "./computer.js"

function monitorAttacks(player, boardNum) {
    const board = document.querySelector(`.board${boardNum}`);
    board.addEventListener("click", (e) => {
        if (e.target.matches(".square")) {
            if (e.target.classList.contains("hit")) return;
            const cordsData = e.target.dataset.cords;
            const cord = cordsData.split(",");
            let ship = player.board.receiveAttack(cord[0], cord[1]);
            if (player.board.getBoard()[cord[0]][cord[1]] === 0)
                e.target.classList.add("miss", "hit");
            else {
                e.target.classList.add("success", "hit");
                highlightHitShip(ship, boardNum);
            }

            if (player.checkWin()) {
                alert(`${player.getName()} wins`);
            }
        }
    });
}

function highlightHitShip(ship, boardNum) {
    if (ship) {
        let length = ship.getLength();
        const unplacedShip = document.querySelector(
            `.buttons-ship${boardNum} .unplace-ship:not(.destroyed)[data-length="${length}"]`,
        );

        if (
            +unplacedShip.dataset.length === length &&
            !unplacedShip.classList.contains("destroyed")
        ) {
            const hitbox = unplacedShip.querySelector("span:not(.hit)");
            hitbox.classList.add("hit");
        }

        const hitBoxes = unplacedShip.querySelectorAll('.hit')
        if(hitBoxes.length === length){
            unplacedShip.classList.add('destroyed');
        }

    }
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
    let dropSuccess = true;

    ships.forEach((ship) => {
        ship.addEventListener("dragstart", () => {
            length = ship.dataset.length;
            newShip = Ship(+length);
        });

        ship.addEventListener("dragend", (e) => {
            if (e.dataTransfer.dropEffect !== "none" && dropSuccess) {
                ship.classList.add("placed");
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
            cordsArray = findValidBoardCoords(+cord[0], +cord[1], +length);
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
            if (
                !player.board.placeShip(
                    cordsArray[0][0],
                    cordsArray[0][1],
                    newShip,
                )
            ) {
                dropSuccess = false;
                return;
            }

            clearBoard(boardNum);
            renderBoard(player.board, boardNum);
            dropSuccess = true;
            enableConfirmButton(boardNum);
        }
    });
}

export function rotateButton() {
    const btns = document.querySelectorAll(".rotate");
    btns.forEach((btn) => {
        btn.addEventListener("click", () => {
            const player = btn.dataset.player;
            const unplaceShipContainer = document.querySelector(
                `.buttons-ship${player} .unplaced-ships`,
            );
            const unplaceShips = document.querySelectorAll(
                `.buttons-ship${player} .unplace-ship`,
            );
            unplaceShips.forEach((unplaceShip) => {
                unplaceShip.classList.toggle("vertical");
                toggleVertical();
            });
            unplaceShipContainer.classList.toggle("vertical");
        });
    });
}

export function randomiseButton(player, boardNum) {
    const btn = document.querySelector(`.buttons-ship${boardNum} .randomise`);
    const ships = document.querySelectorAll(
        `.buttons-ship${boardNum} .unplace-ship`,
    );
    btn.addEventListener("click", () => {
        player.board.reset();
        getRandomCords(player);
        clearBoard(boardNum);
        renderBoard(player.board, boardNum);
        ships.forEach((ship) => {
            ship.classList.add("placed");
            ship.draggable = false;
        });
        enableConfirmButton(boardNum)
    });
}

export function resetButton(player, boardNum) {
    const btn = document.querySelector(`.buttons-ship${boardNum} .reset`);
    const ships = document.querySelectorAll(
        `.buttons-ship${boardNum} .unplace-ship`,
    );
    btn.addEventListener("click", () => {
        player.board.reset();
        clearBoard(boardNum);
        renderBoard(player.board, boardNum);
        ships.forEach((ship) => {
            ship.classList.remove("placed");
            ship.draggable = true;
        });
        enableConfirmButton(boardNum)
    });
}

export function confirmAndStart(player, boardNum) {
    const btn = document.querySelector(`.buttons-ship${boardNum} .confirm`);
    btn.addEventListener("click", () => {
        const placedShips = document.querySelectorAll(
            `.board${boardNum} > .ship`,
        );
        placedShips.forEach((ship) => {
            ship.classList.add("hide");
        });
        const btns = document.querySelectorAll(`.buttons-ship${boardNum} .btn`);
        btns.forEach((btn) => {
            btn.disabled = true;
        });
        monitorAttacks(player, boardNum)
        if(player.isComputer())
            placeShipsComputer();
    });
}

// enable confirm button if all ships placed
function enableConfirmButton(boardNum) {
    const ships = document.querySelectorAll(`.buttons-ship${boardNum} .placed`);
    const btn = document.querySelector(`.buttons-ship${boardNum} .confirm`);
    if (ships.length >= 4) {
        btn.disabled = false;
    } else {
        btn.disabled = true;
    }
}
