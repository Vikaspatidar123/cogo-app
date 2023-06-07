import { format, isEmpty, isSameDay } from '@cogoport/utils';

import { UNSHADED_MILESTONES } from './milestone';

const isPastOrPresentDay = (inputDate) => {
	const isCurrentDay = isSameDay(inputDate, new Date());

	if (isCurrentDay) return true;
	if (new Date() > new Date(inputDate)) return true;
	return false;
};

const processList = (list = []) => {
	const result = [];

	const filteredList = list.filter((item) => {
		if (
			!isEmpty(item.location)
			&& !isEmpty(item.event_date)
			&& !isEmpty(item.milestone)
		) {
			return true;
		}

		return false;
	});
	const sortedList = filteredList.sort(
		(a, b) => new Date(a.event_date) - new Date(b.event_date),
	);
	let i = 0;

	const checkForMerging = (curr, next) => {
		if (
			UNSHADED_MILESTONES.includes(curr?.milestone)
			|| UNSHADED_MILESTONES.includes(next?.milestone)
		) {
			return false;
		}

		if (
			isPastOrPresentDay(curr?.event_date)
			!== isPastOrPresentDay(next?.event_date)
		) {
			return false;
		}

		if (curr?.location !== next?.location) {
			return false;
		}

		return true;
	};

	while (i < sortedList.length) {
		let j = i + 1;
		while (
			j < sortedList.length
			&& checkForMerging(sortedList[i], sortedList[j])
		) {
			j += 1;
		}
		result.push(sortedList.slice(i, j));
		i = j;
	}
	return result;
};

const formatDate = (date) => format(new Date(date), 'dd LLL yyyy');

const formatTime = (date) => format(new Date(date), 'KK:mm aaa');

export { processList, formatDate, formatTime, isPastOrPresentDay };
