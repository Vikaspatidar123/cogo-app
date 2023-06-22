const convertHourToDay = (time) => {
	if (time >= 24) {
		const t = Math.floor(time / 24);
		const r = time % 24;
		if (r === 0) {
			return `${t} Day(s) `;
		}
		return `${t} Day(s) ${r} Hour(s) `;
	}
	return `${time} Hour(s)`;
};
export default convertHourToDay;
