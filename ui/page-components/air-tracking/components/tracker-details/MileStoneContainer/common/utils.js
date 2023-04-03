import { isEmpty, isSameDay, format } from '@cogoport/utils';

const isPastOrPresentDay = (inputDate) => {
	const isCurrentDay = isSameDay(inputDate, new Date());

	if (isCurrentDay) return true;
	if (new Date() > new Date(inputDate)) return true;
	return false;
};

const processList = (list = []) => {
	const filteredList = list?.filter((item) => {
		if (
			isEmpty(item.station)
      || isEmpty(item.actual_date)
      || isEmpty(item.milestone)
		) {
			return false;
		}
		return true;
	});
	const sortedList = filteredList.sort(
		(a, b) => new Date(a.event_date) - new Date(b.event_date),
	);
	const ascUniqueStations = [
		...new Set(sortedList?.map((item) => item?.station)),
	];

	const result = ascUniqueStations.map((station) => sortedList.filter((item) => item.station === station));

	return result;
};

const formatDate = (date) => format(date, 'dd LLL yyyy');

const formatTime = (date) => format(date, 'KK:mm aaa');

export { processList, formatDate, formatTime, isPastOrPresentDay };
