import "../css/style.css";
import { renderBoard, renderUnplacedShips } from "./render.js";
import { Player } from "./player.js";
import {
    handleDragDrop,
    rotateButton,
    randomiseButton,
    resetButton,
    confirmAndStart,
} from "./dom.js";

export let p1 = Player("player1");
export let p2 = Player("player2", true);

renderBoard(p1.board, 1);
renderBoard(p2.board, 2);

window.p1 = p1;
window.p2 = p2;

renderUnplacedShips(1);
renderUnplacedShips(2);

handleDragDrop(p1, 1);
handleDragDrop(p2, 2);

rotateButton();
randomiseButton(p1, 1);
randomiseButton(p2, 2);
resetButton(p1, 1);
resetButton(p2, 2);

confirmAndStart(p1, 1);
confirmAndStart(p2, 2);