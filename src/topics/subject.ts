import { Observable, Subject } from "rxjs";

const numbers$ = new Observable<number>(subscriber => {
	subscriber.next(Math.round(Math.random()*100));
})

const numbersRandom$ = new Subject<number>();

const observador1 = {
	next: (value: number) => {
		console.log("the value is: ", value);
	}
}

const observador2 = {
	next: (value: number) => {
		console.log("the value is2: ", value);
	}
}



const main = () => {
	// numbers$.subscribe(observador1);
	// numbers$.subscribe(observador2);

	numbersRandom$.subscribe(observador1);
	numbersRandom$.subscribe(observador2);

	numbers$.subscribe(numbersRandom$)
	numbersRandom$.next(Math.round(Math.random()*100));
}

export {
	main
}
