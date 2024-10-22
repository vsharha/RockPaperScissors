let player1: string;
let player2: string;

let p1winCounter = 0;
let p2winCounter = 0;
let gameStatus = "";

const buttons: NodeListOf<HTMLElement> = document.querySelectorAll("button");
const p1display: HTMLElement = document.querySelector("#p1");
const p2display: HTMLElement = document.querySelector("#p2");
const statusDisplay: HTMLElement = document.querySelector("#status");
const p1winDisplay: HTMLElement = document.querySelector("#wins h2");
const p2winDisplay: HTMLElement = document.querySelector("#losses h2");

const style = getComputedStyle(document.body);

const rps = ["🪨", "📄", "✂️"];

function getCSSvar(varName: string) {
	return style.getPropertyValue("--" + varName);
}

function onReady() {
	for (let button of buttons) {
		button.addEventListener("click", function () {
			processInput(this);
		});
	}
}

window.onload = onReady;

// random

function randint(min: number, max: number) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function rchoice(array: Array<any>) {
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

function processInput(el: HTMLElement) {
	statusDisplay.style.width = getCSSvar("status-width");
	statusDisplay.style.padding = "0.5rem";
	(document.querySelector("#players") as HTMLElement).style.display = "grid";

	player1 = el.innerHTML;
	player2 = rchoice(rps);

	p1display.innerHTML = player1;
	p2display.innerHTML = player2;

	checkWin();

	statusDisplay.innerHTML = gameStatus;
	p1winDisplay.innerHTML = p1winCounter.toString();
	p2winDisplay.innerHTML = p2winCounter.toString();
}
