import "../css/style.css";
import { renderBoard, renderUnplacedShips } from "./render.js";
import { Player } from "./player.js";
import { monitorAttacks, handleDragDrop, rotateButton, randomiseButton } from "./dom.js";


let p1 = Player("player1");
let p2 = Player("player2");

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
handleDragDrop(p2, 2);

rotateButton()
randomiseButton(p1, 1);
randomiseButton(p2, 2);