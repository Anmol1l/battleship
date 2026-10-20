import { Player } from "./player.js";

export function monitorAttacks(player) {
    const squares = document.querySelectorAll('.square');
    squares.forEach(square => {
        square.addEventListener('click', () => {
            const cordsData = square.dataset.cords;
            const cord = cordsData.split(",");
            player.board.receiveAttack(cord[0],cord[1]);
            if(player.board.getBoard()[cord[0]][cord[1]] === 0)
                square.classList.add('miss', 'hit')
            else square.classList.add('success', 'hit')
        })
    })
}