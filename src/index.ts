import "../src/styles/main.css"
import { asyncScheduler, from, fromEvent, interval, scheduled, Subject, Subscription, timer } from "rxjs";
import { main } from "./topics/subject";
import { COLOR } from "./models/color.enum";
import { View } from "./constructors/view.constructor";
import { Wordle } from "./constructors/wordle.constructor";

const onKey$ = fromEvent<KeyboardEvent>(document, "keydown"); //Se crea el observable que lanza un
//evento cuando se presione una tecla.

const restartButton = document.querySelector(".restart__button") as HTMLButtonElement;

const onKeyMulti$ = new Subject<KeyboardEvent>();
const userWin$ = new Subject();
const userLoses$ = new Subject();
const onRestart$ = fromEvent<MouseEvent>(restartButton, "click");

const wordleRows: Element[] = Array.from(document.querySelectorAll(".wordle__row"));

const words: string[] = [
	"atlas",
	"mouse",
	"vaso",
	"lapiz",
	"crema",
	"pais",
]

// const compareWord: string[] = [];

// main()

const regex: RegExp = /[a-z]/i;

const maxIndex: number = 5;
const maxRowIndex: number = 6;

const view = new View(maxIndex, maxRowIndex, wordleRows);
const wordle = new Wordle(maxIndex, maxRowIndex, view, userLoses$, userWin$, onKeyMulti$);

const observatorLetter = { //Se crea el observador que indica como usará la data obtenida.
	next: (event: KeyboardEvent) => {
		const keyPressed = event.key;

		if (keyPressed.match(regex) && keyPressed.length === 1) {
			wordle.writeLetter(keyPressed);
		}
	},
	complete: () => {
		console.log("There is no more events");
	},
	error: (error: Error) => {
		console.log("Something went wrong: ", error.message);
	}
}

const observatorBackSpace = { //Se crea el observador que indica como usará la data obtenida.
	next: (event: KeyboardEvent) => {
		const keyPressed = event.key;

		if (keyPressed === "Backspace") {
			// wordle.alterIndex(false);
			wordle.deleteLetter();
			// wordle.alterIndex(false);
		}
	},
	complete: () => {
		console.log("There is no more events");
	},
	error: (error: Error) => {
		console.log("Something went wrong: ", error.message);
	}
}

const observatorEnter = {
	next: (event: KeyboardEvent) => {
		const keyPressed = event.key;

		// console.log(keyPressed);
		if (keyPressed === "Enter") {
			wordle.colorGrid();
		}
	},
	complete: () => {
		console.log("There is no more events");
	},
	error: (error: Error) => {
		console.log("Something went wrong: ", error.message);
	}
}

const observatorRestart = {
	next: (event: MouseEvent) => {
		console.log(event);
		wordle.restartGame();
		// const keyPressed = event.key;

		// console.log(keyPressed);
		// if (keyPressed === "Enter") {
		// 	wordle.colorGrid();
		// }
	},
	complete: () => {
		console.log("There is no more events");
	},
	error: (error: Error) => {
		console.log("Something went wrong: ", error.message);
	}
}


onKeyMulti$.subscribe(observatorLetter);
onKeyMulti$.subscribe(observatorBackSpace);
onKeyMulti$.subscribe(observatorEnter);
// onKey$.
onKey$.subscribe(onKeyMulti$); //Se subscribe el observador al observable.
// onKey$.subscribe(observatorBackSpace);

onRestart$.subscribe(observatorRestart);
userWin$.subscribe({
	next: (value) => {
		console.log("the user Won.")
	}
})

userLoses$.subscribe({
	next: (value) => {
		console.log("the user Losed.")
	}
})