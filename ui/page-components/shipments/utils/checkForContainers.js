const checkForContainers = (values, count) => {
	let totalCount = 0;
	(values || []).forEach((item) => {
		totalCount += item.container_quantity;
	});
	if (totalCount !== count) return true;
	return false;
};

export default checkForContainers;
