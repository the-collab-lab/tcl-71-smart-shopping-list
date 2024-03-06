export const inputHasValue = (value) => {
	return value.trim().length === 0 ? false : true;
};

export const inputHasOnlyNUmbers = (string) => {
	return !!string.match(/^\d+$/);
};

export const inputHasRepeatedValue = (string, value) => {
	const regex = /[^a-z]/g;
	const stringOne = string.toLowerCase().replace(regex, '');
	const stringTwo = value.toLowerCase().replace(regex, '');
	return stringOne === stringTwo ? true : false;
};
