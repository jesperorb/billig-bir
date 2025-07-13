export const getRandomIntInclusive = (
	min: number = -1_000_000,
	max: number = 0,
) => {
	const randomBuffer = new Uint32Array(1);
	crypto.getRandomValues(randomBuffer);

	let randomNumber = randomBuffer[0] / (0xffffffff + 1);

	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(randomNumber * (max - min + 1)) + min;
};
