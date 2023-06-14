export const getTouchPoints = (data) => {
	const { values = {} } = data || {};
	const { route } = values || {};
	const { values: touchPointValues } = route || [];
	const { touchPoints = [] } = touchPointValues || {};

	return touchPoints;
};
