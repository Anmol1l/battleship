import { Gameboard } from "../gameboard.js";
import { Ship } from "../ship.js";

describe("Gameboard", () => {
    let board = Gameboard();
    let ship1 = Ship(3);
    test("ship is placedCorrectly", () => {
        board.placeShip(5, 5, ship1);
        expect(board.getBoard()[5][5]).toBe(ship1);
        expect(board.getBoard()[5][6]).toBe(ship1);
        expect(board.getBoard()[5][7]).toBe(ship1);
    });

    test("ship is receiving attacks", () => {
        board.receiveAttack(5, 5);
        expect(ship1.getHits()).toBe(1);
    });

    test ('does not attack if a box already hit', () => {
        expect(board.receiveAttack(5, 5)).toBe(-1);
    })

    test ('logs missed attacks', () => {
        board.receiveAttack(0,0);
        expect(board.getMissedAttacks()).toContain('0,0')
    })

    test('check if all ships destroyed', () => {
        expect(board.allShipsDestroyed()).toBe(false);
        board.receiveAttack(5, 6);
        board.receiveAttack(5, 7);
        expect(board.allShipsDestroyed()).toBe(true);
    })
});
