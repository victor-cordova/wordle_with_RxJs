// import { map } from "rxjs/operators";
import { reduce, map, filter, scheduled, asyncScheduler } from "rxjs";

const numbers$ = scheduled<number>([1, 2, 3, 4, 5, 7, 4], asyncScheduler)



export const main = () => {

	const numbersFiltered$ = numbers$.pipe( //Se coloca la funcion pipe para poder empezar a usar los operadores
	//Por medio de este se pueden enlazar los operadores.
		map(value => value * 3),
		filter(value => value < 5)
	);
	numbersFiltered$.subscribe(console.log);
	numbers$.subscribe(console.log);
}
