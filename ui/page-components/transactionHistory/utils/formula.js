const Formula = () => {
	const calculate = (percentage, newValue, fixedValue) => {
		const calc = (+percentage * +newValue) / 100 + fixedValue;
		return calc;
	};
	return {
		calculate,
	};
};

export default Formula;
