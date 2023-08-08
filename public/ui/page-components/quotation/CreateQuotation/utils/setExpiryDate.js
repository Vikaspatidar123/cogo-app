const setExpiryDate = () => {
	const sec = Date.now();
	const millisec = 86400000 * 15 + sec;
	const expiryDate = new Date(millisec).toISOString();
	return new Date(expiryDate);
};

export default setExpiryDate;
