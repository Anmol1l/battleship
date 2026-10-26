import "../css/style.css";
import { renderBoard, renderUnplacedShips } from "./render.js";
import { Ship } from "./ship.js";
import { Player } from "./player.js";
import { monitorAttacks, handleDragDrop } from "./dom.js";

const boardCanvas1 = document.querySelector(".board1");
let p1 = Player("player1");

// let s1 = Ship(4);
// let s2 = Ship(2);
// let s3 = Ship(3);
// let s4 = Ship(4);
// let s5 = Ship(2);

// p1.board.placeShip(0,0,s1);
// p1.board.placeShip(5,5,s2);
// p1.board.placeShip(9,9,s3);
// p1.board.placeShip(4,4,s4);
// p1.board.placeShip(1,7,s5);


const boardCanvas2 = document.querySelector(".board2");
let p2 = Player("player2");

// let s6 = Ship(4);
// let s7 = Ship(2);
// let s8 = Ship(3);
// let s9 = Ship(4);
// let s10 = Ship(2);

// p2.board.placeShip(0,0,s6);
// p2.board.placeShip(8,5,s7);
// p2.board.placeShip(8,0,s8);
// p2.board.placeShip(2,4,s9);
// p2.board.placeShip(9,7,s10);


renderBoard(p1.board, 1);
renderBoard(p2.board, 2);

monitorAttacks(p1, 1);
monitorAttacks(p2, 2);

window.p1 = p1;
window.p2 = p2;

const shipArea1 = document.querySelector(".buttons-ship1 > .unplaced-ships");
renderUnplacedShips(shipArea1);

const shipArea2 = document.querySelector(".buttons-ship2 > .unplaced-ships");
renderUnplacedShips(shipArea2);

handleDragDrop(p1, 1);
// selectShipsAndPlace(2);