export function monitorAttacks(player, boardNum) {
    const squares = document.querySelectorAll(`.board${boardNum} > .square`);
    squares.forEach(square => {
        square.addEventListener('click', () => {
            if(square.classList.contains('hit'))
                return;
            const cordsData = square.dataset.cords;
            const cord = cordsData.split(",");
            player.board.receiveAttack(cord[0],cord[1]);
            if(player.board.getBoard()[cord[0]][cord[1]] === 0)
                square.classList.add('miss', 'hit')
            else square.classList.add('success', 'hit')

            if(player.checkWin()) {
                alert(`${player.getName()} wins`)
            }
        })
    })
}