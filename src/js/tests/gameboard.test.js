import { Gameboard } from "../gameboard.js";
import { Ship } from "../ship.js";

describe("Gameboard", () => {
    let board = Gameboard();
    test("ship is placedCorrectly", () => {
        let ship1 = Ship(3)
        board.placeShip(5,5,ship1)
        expect(board.getBoard()[5][5]).toBe(ship1);
        expect(board.getBoard()[5][6]).toBe(ship1);
        expect(board.getBoard()[5][7]).toBe(ship1);
    });
});
