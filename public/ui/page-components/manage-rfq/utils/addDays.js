const addDays = (date, number = 1) => {
	const futureDate = new Date();
	futureDate.setDate(date.getDate() + number);
	return futureDate;
};

export default addDays;
