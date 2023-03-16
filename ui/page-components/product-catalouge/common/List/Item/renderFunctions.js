const itemFunctions = ({ functions }) => {
	const newFunctions = {
		...(functions || {}),
	};

	return {
		newFunctions,
	};
};

export default itemFunctions;
