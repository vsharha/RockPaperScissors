let player1;
let player2;

let p1winCounter = 0;
let p2winCounter = 0;
let gameStatus = "";

const buttons = document.querySelectorAll("button");
const p1display = document.querySelector("#p1");
const p2display = document.querySelector("#p2");
const statusDisplay = document.querySelector("#status");
const p1winDisplay = document.querySelector("#wins h2");
const p2winDisplay = document.querySelector("#losses h2");

const style = getComputedStyle(document.body);

const rps = ["🪨", "📄", "✂️"];

function getCSSvar(varName) {
	return style.getPropertyValue("--" + varName);
}

function onReady() {
	for (let button of buttons) {
		button.addEventListener("click", function () {
			processInput(this);
		});
	}
}

window.onload = onReady();

// random

function randint(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function rchoice(array) {
	return array[randint(0, array.length)];
}

// game

function checkWin() {
	if (player1 == player2) {
		gameStatus = "Draw!";
		statusDisplay.style.background = getCSSvar("draw-color");
		return;
	}

	if (
		(player1 == "📄" && player2 == "🪨") ||
		(player1 == "✂️" && player2 == "📄") ||
		(player1 == "🪨" && player2 == "✂️")
	) {
		p1winCounter++;
		statusDisplay.style.background = getCSSvar("win-color");
		gameStatus = "You won!";
	} else {
		p2winCounter++;
		statusDisplay.style.background = getCSSvar("loss-color");
		gameStatus = "You lost!";
	}
}

function processInput(el) {
	statusDisplay.style.width = getCSSvar("status-width");
	statusDisplay.style.padding = "0.5rem";
	document.querySelector("#players").style.display = "grid";

	player1 = el.innerHTML;
	player2 = rchoice(rps);

	p1display.innerHTML = player1;
	p2display.innerHTML = player2;

	checkWin();

	statusDisplay.innerHTML = gameStatus;
	p1winDisplay.innerHTML = p1winCounter;
	p2winDisplay.innerHTML = p2winCounter;
}
