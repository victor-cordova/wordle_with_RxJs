import { Subject } from "rxjs";
import { getRandomNumber } from "../assets";
import { COLOR } from "../models/color.enum";
import { View } from "./view.constructor";
import WORD_LIST from "../wordList.json";

class Wordle {

	constructor(
		private maxIndex: number,
		private maxRow: number,
		private view: View,
		private userLoses$: Subject<unknown>,
		private userWin$: Subject<unknown>,
		private onKeyMulti$: Subject<KeyboardEvent>,
		private index: number = 0,
		private rowIndex: number = 0,
		private compareWord: string[] = [],
		private word?: string[],
		private correcLetter: number = 0,
	){
		this.maxIndex--;
		this.maxRow--;
		this.chooseWord();
	}

	private alterWordle = (addingLetter: boolean): void => {

		if (addingLetter) {
			// if (this.maxIndex > this.index) {
				this.alterIndex(true);
			// }
			// else {
			// 	this.alterIndex(true, true);
			// 	this.alterRowIndex(true);
			// }
		} else {
			if (this.index !== 0) {
				this.alterIndex(false);
				// this.alterRowIndex(false);
			}
			// else if(this.index !== 0){
			// 	// this.alterIndex(false);
			// }
		}
	}

	private resetCorrectWord = () => {
		this.correcLetter = 0;
	}

	private letterExist = (compareLetter: string): boolean | undefined => {
		return this.word?.includes(compareLetter);
	}

	private checkTry = () => {
		if (this.correcLetter === this.maxIndex + 1) {
			// console.log("There are some correct letters: " ,this.correcLetter);
			// console.log("The max index is: " ,this.maxIndex);
			this.userWin$.next(null);
			this.onKeyMulti$.unsubscribe();
		} else if (this.rowIndex === this.maxRow) {
			this.onKeyMulti$.unsubscribe();
			this.userLoses$.next(null);
		}
	}

	//Alter DOM
	public colorGrid() {
		for (let index = 0; index <= this.maxIndex; index++) {
			// console.log(compareWord[index]);
			// console.log(compareWord);
			// userWin$.next(null);
			if (this.letterExist(this.compareWord[index]) && this.word) {
				if (this.compareWord[index] === this.word[index]) {
					this.view.colorLetter(COLOR.green, index, this.rowIndex);
					// this.colorLetter(COLOR.green, index);
					this.correcLetter+=1;
				} else {
					this.view.colorLetter(COLOR.yellow, index, this.rowIndex);
					// this.colorLetter(COLOR.yellow, index);
					// this.
				}
			} else {
				// console.log("hola")
				this.view.colorLetter(COLOR.grey, index, this.rowIndex);
			}
			// console.log("There are some correct letters: " ,this.correcLetter);
			// console.log("The max index is: " ,this.maxIndex);
		}
		this.checkTry()
		// if (this.correcLetter === this.maxIndex + 1) {
		// 	// console.log("There are some correct letters: " ,this.correcLetter);
		// 	// console.log("The max index is: " ,this.maxIndex);
		// 	userWin$.next(null);
		// }
		// this.alterIndex(true, true);
		// this.alterRowIndex(true);
		this.readyNextArrow();
		// this.resetCorrectWord();
	}

	private resetCompareWord = () => {
		while (this.compareWord.length > 0) {
			this.compareWord.pop();
		}
	}

	private readyNextArrow = () => {
		this.alterIndex(true, true);
		this.alterRowIndex(true);
		this.resetCorrectWord();
		this.resetCompareWord();
	}

	public restartGame = () => {

		this.chooseWord();
		this.alterIndex(true, true);
		this.alterRowIndex(true, true);
		this.resetCompareWord();
		this.view.resetGrid();
	}

	public chooseWord = () => {
		this.word = WORD_LIST[getRandomNumber(WORD_LIST.length)].split("");
		console.log(this.word);
	}

	// Alter DOM
	public writeLetter = (letter: string): void => {
		if(this.index <= this.maxIndex) {
			const capitalLetter: string = letter.toUpperCase();

			this.view.writeLetter(capitalLetter, this.rowIndex, this.index);
			this.compareWord[this.index] = capitalLetter;
			this.alterWordle(true);
		}
	};

	//Alter DOM
	public deleteLetter = () => {
		this.alterWordle(false);
		this.view.deleteLetter(this.rowIndex, this.index);
	};

	public alterIndex = (isIncreasing: boolean, atBeginning?: boolean): void => {
		if (atBeginning === undefined) {
			if(isIncreasing) {
				this.index++;
			} else {
				this.index--;
			}
		} else {
			if (isIncreasing && atBeginning){
				this.index = 0;
			}
		}

	}

	private alterRowIndex = (isIncreasing: boolean, reset?: boolean): void => {
		if(isIncreasing && this.rowIndex <= this.maxRow) {
			this.rowIndex++;
		}
		if (isIncreasing && reset) {
			this.rowIndex = 0;
		}
	}

}

export {
	Wordle,
}
