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

/**
 * Return whether if a date is more than 24 hours ago
 * @param {Object} date - Date to compare
 */
export const isMoreThanADayAgo = (date) => {
	let now = new Date();
	const dateInMiliseconds = date.seconds * 1000;
	const diff = now - dateInMiliseconds;
	return ONE_DAY_IN_MILLISECONDS < diff;
};
