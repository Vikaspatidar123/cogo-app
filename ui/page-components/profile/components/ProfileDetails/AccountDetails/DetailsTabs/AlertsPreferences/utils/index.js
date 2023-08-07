export const formatTime = (time) => {
	if (!time) return null;
	const currentDate = new Date();
	const timeParts = time?.split(':');
	const hours = +(timeParts[0]);
	const minutes = +(timeParts[1]);
	currentDate.setHours(hours);
	currentDate.setMinutes(minutes);

	return currentDate;
};

export const format = (value) => {
	const dateObject = new Date(value);
	const formattedTime = dateObject.toLocaleTimeString('en-US', {
		hour   : '2-digit',
		minute : '2-digit',
		hour12 : false,
	});
	const time = formattedTime?.split(':');
	const check = Number(time?.[0]);
	const formatted = check >= 24 ? `00:${time?.[1]}` : formattedTime;
	return formatted;
};

export function convert24To12HourFormat(timeString) {
	const [hours, minutes] = timeString.split(':').map(Number);
	let period = 'AM';
	let hour = hours;
	if (hours === 0) {
		hour = 12;
	} else if (hours === 12) {
		period = 'PM';
	} else if (hours > 12) {
		hour -= 12;
		period = 'PM';
	}

	const formattedTime = `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${period}`;
	return formattedTime;
}
