const checkForUniqness = (values, uniqeField) => {
	const numbers = (values || []).map((item) => item[uniqeField]);
	let newContainerNumbers = new Set(numbers);
	newContainerNumbers = [...newContainerNumbers];
	if (numbers.length !== newContainerNumbers.length) return true;
	return false;
};
export default checkForUniqness;
