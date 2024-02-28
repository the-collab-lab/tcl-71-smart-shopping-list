const ONE_DAY_IN_MILLISECONDS = 86400000;

/**
 * Get a new JavaScript Date that is `offset` days in the future.
 * @example
 * // Returns a Date 3 days in the future
 * getFutureDate(3)
 * @param {number} offset
 */
export function getFutureDate(offset) {
	return new Date(Date.now() + offset * ONE_DAY_IN_MILLISECONDS);
}

export const isMoreThanADayAgo = (date) => {
	let now = new Date();
	const dateInMiliseconds = date.seconds * 1000;
	const oneDayInMiliseconds = 60 * 60 * 24 * 1000;
	const diff = now - dateInMiliseconds;
	return oneDayInMiliseconds > diff;
};
