import getFormattedCurrency from '@/ui/commons/utils/getFormattedCurrency';
// import formatNumberWithLocale from '@/ui/helpers/getFormattedNumber';

const ALPHA_NUMERIC = /\w\S*/g;

export function toTitleCase(str) {
	if (typeof str === 'string') {
		return str.replace(
			ALPHA_NUMERIC,
			(txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
		);
	}
	return '';
}

export const getTime = (time = 0) => {
	const days = Math.floor(time / (3600 * 24));
	const hours = Math.floor((time % (3600 * 24)) / 3600);

	if (days === 0) {
		return `${hours} hr${hours > 1 ? 's' : ''}`;
	}

	if (hours >= 12) {
		return `${days + 1} day${days > 0 ? 's' : ''}`;
	}
	return `${days} day${days > 1 ? 's' : ''}`;
};

export const getOptions = ({
	priceLabel,
	// distanceLabel,
	// timeLabel,
	total_price,
	total_price_currency,
	// total_length,
	// total_time,
	// units,
}) => [
	{
		label : priceLabel,
		value : total_price_currency ? `${total_price_currency} ${getFormattedCurrency({
			amount     : Math.ceil(total_price),
			formatType : 'decimal',
		})}` : 'USD NA',
	},
	// {
	// 	label : distanceLabel,
	// 	value : total_length ? formatNumberWithLocale(total_length) : '' || 'NA km',
	// 	unit  : units,
	// },
	// {
	// 	label : timeLabel,
	// 	value : getTime(total_time) || '1 day',
	// },
];
