import { findValidBoardCoords } from "./gameboard.js";

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

function clearAll(boardNum) {
    const squares = document.querySelectorAll(`.board${boardNum} > .square`);
    squares.forEach((square) => {
        square.style.backgroundColor = "";
    });
}

export function selectShipsAndHighlight(boardNum) {
    const ships = document.querySelectorAll(
        `.buttons-ship${boardNum} .unplace-ship`,
    );

    ships.forEach((ship) => {
        ship.addEventListener("dragstart", () => {
            const length = ship.dataset.length;
            highlightOnBoard(boardNum, length);
        });
    });
}

export function highlightOnBoard(boardNum, length) {
    const squares = document.querySelectorAll(`.board${boardNum} > .square`);
    squares.forEach((square) => {
        let cordsData;
        let cordsArray;
        square.addEventListener("dragenter", () => {
            clearAll(boardNum);
            cordsData = square.dataset.cords;
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
    });

    const ships = document.querySelectorAll(
        `.buttons-ship${boardNum} .unplace-ship`,
    );
    ships.forEach((ship) => {
        ship.addEventListener("dragend", () => {
            clearAll(boardNum);
        });
    });
}
