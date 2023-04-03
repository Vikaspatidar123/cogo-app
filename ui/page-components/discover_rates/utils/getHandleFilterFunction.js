import { getByKey } from '@cogoport/utils';

import getGeoConstants from '@/ui/commons/constants/geo';
import formatDate from '@/ui/commons/utils/formatDate';

const geo = getGeoConstants();

export const arrivalDeparture = ({ rateCard, key, filters }) => {
	const rateCardDate = formatDate({
		date       : rateCard[key],
		dateFormat : geo.formats.date.default,
		formatType : 'date',
	});

	const startDateFilter = formatDate({
		data       : filters[key].startDate,
		dateFormat : geo.formats.date.default,
		formatType : 'date',
	});

	const endDateFilter = formatDate({
		date       : filters[key].endDate,
		dateFormat : geo.formats.date.default,
		formatType : 'date',
	});

	const d1 = startDateFilter?.split('/');
	const d2 = endDateFilter?.split('/');
	const c = rateCardDate?.split('/');

	const from = new Date(d1?.[2], Number(d1?.[1]) - 1, d1?.[0]);
	const to = new Date(d2?.[2], Number(d2?.[1]) - 1, d2?.[0]);
	const check = new Date(c?.[2], Number(c?.[1]) - 1, c?.[0]);

	let val = true;
	if (check > from && check < to) {
		val = true;
	} else {
		val = false;
		return val;
	}
	return true;
};

export const pricesRange = ({ rateCard, key, filters }) => {
	const a_total_price_discounted = getByKey(rateCard, 'freight_price_discounted');

	if (!(a_total_price_discounted <= Number(filters[key]))) {
		return false;
	}

	return true;
};

export const shippingLine = ({ rateCard, key, filters }) => {
	if (rateCard[key] !== filters[key]) {
		return false;
	}
	return true;
};
export const paymentTerm = ({ rateCard, key, filters }) => {
	if (rateCard[key] !== filters[key]) {
		return false;
	}
	return true;
};

export const scheduleType = ({ rateCard, key, filters }) => {
	if (rateCard[key] !== filters[key]) {
		return false;
	}
	return true;
};
