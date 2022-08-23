export const getRandomNumber = (length: number): number => {
	const random: number = Math.floor(Math.random() * (length - 0) + 0);
	// console.log(random);
	return random;
}

