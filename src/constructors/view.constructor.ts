import { COLOR } from "../models/color.enum";

class View {
	constructor(
		private maxIndex: number,
		private maxRow: number,
		private wordleRows: Element[],
	){}

	public colorLetter = (color: COLOR, index: number, row: number): void => {
		const className: string = "wordle__letter--filled";
		const classNameColor: string = `wordle__letter--${color}`;

		this.wordleRows[row].children[index].classList.add(...[className, classNameColor]);
	}

	public removeColorLetter = (index: number, row: number): void => {
		const styles: string = "wordle__letter";
		this.wordleRows[row].children[index].className = styles;
	}

	public resetGrid = (): void => {
		for (let row = 0; row < this.maxRow; row++) {
			for (let index = 0; index < this.maxIndex; index++) {
				this.removeColorLetter(index, row);
				this.wordleRows[row].children[index].textContent = " ";
			}
		}
	}

	public deleteLetter = (row: number, index: number): void => {
		if (row < this.maxRow) {
			this.wordleRows[row].children[index].textContent = " ";
		}
	};

	public writeLetter = (letter: string, row: number, index: number) => {
		if (row < this.maxRow) {
			// console.log(row)
			// console.log(this.maxRow)
			this.wordleRows[row].children[index].textContent = letter;
		}
	}
}

export {
	View
}
