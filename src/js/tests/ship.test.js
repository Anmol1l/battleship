import { Ship } from "../ship.js";

describe("Ship Object", () => {
    let ship;
    beforeAll(() => {
        ship = Ship(4);
    });
    test("length argument must be integer", () => {
        expect(ship.getLength()).toBe(4);
    });

    test("hit should incresase by 1", () => {
        ship.hit();
        expect(ship.getHits()).toBe(1);
    });

    test("check if ship is sunk", () => {
        expect(ship.isSunk()).toBe(false);
        ship.hit();
        ship.hit();
        ship.hit();
        expect(ship.isSunk()).toBe(true);
    });
});
