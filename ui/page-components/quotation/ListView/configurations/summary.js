import { IcMBldo, IcMMoney, IcMSopPoc } from '@cogoport/icons-react';

import { shortFormatNumber } from '@/ui/commons/utils/getShortFormatNumber';

const summary = [
	{
		name       : 'Quotations',
		icon       : <IcMBldo fill="#6194cd" width={20} height={20} />,
		type       : 'text',
		iconColor  : '#AFC8E4',
		background : '#E5EEF8',
	},
	{
		name       : 'Buyers',
		icon       : <IcMSopPoc fill="#7FADA7" width={20} height={20} />,
		type       : 'text',
		iconColor  : '#C9E5E0',
		background : '#E9F4F2',

	},
	{
		name       : 'Amount',
		icon       : <IcMMoney fill="#cb664e" width={20} height={20} />,
		type       : 'number',
		iconColor  : '#F7CDC3',
		background : '#FDF4F3',
	},
];

const getSummary = ({ summaryResp }) => {
	const {
		quotationsCount = 0,
		buyersCount = 0,
		totalAmount = 0,
		defaultCurrency = 'INR',
	} = summaryResp || {};
	return summary.map((ele) => {
		if (ele.name === 'Quotations') {
			return {
				...ele,
				value: quotationsCount,
			};
		}
		if (ele.name === 'Buyers') {
			return {
				...ele,
				value: buyersCount,
			};
		}
		if (ele.name === 'Amount') {
			return {
				...ele,
				value: shortFormatNumber(totalAmount, defaultCurrency),
			};
		}
		return {
			...ele,
		};
	});
};

export default getSummary;
