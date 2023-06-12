const getOperatorOptions = ({ operatorHash = {} }) => {
	const operatorList = Object.keys(operatorHash).map((operator) => ({
		id: operator,
		...operatorHash[operator],
	}));

	return operatorList;
};

export default getOperatorOptions;
