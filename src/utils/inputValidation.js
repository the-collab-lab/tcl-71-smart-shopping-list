export const inputHasValue = (value) => {
	return value.trim().length === 0 ? false : true;
};

export const hasSameValue = (string, value) => {
	const regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~\s]/g;
	const stringOne = string.toLowerCase().replace(regex, '');
	const stringTwo = value.toLowerCase().replace(regex, '');
	return stringOne === stringTwo ? true : false;
};
