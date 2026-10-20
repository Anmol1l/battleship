export function Ship(l) {
    const length = l;
    let hits = 0;
    const color = "pink";

    function getColor() {
        return color;
    }

    function getLength() {
        return length;
    }
    function getHits() {
        return hits;
    }

    function hit() {
        if (hits < length) hits++;
        else {
            return "The ship has sunk";
        }
    }

    function isSunk() {
        return length === hits;
    }

    return { getLength, getHits, hit, isSunk, getColor };
}
