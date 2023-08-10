const OPTIONS = ({ t = () => { } }) => [
	{
		label : t('cancellationTicket:select_reason_1_lable'),
		value : 'I don’t have any requirements currently',
	},
	{
		label : t('cancellationTicket:select_reason_2_lable'),
		value : 'The price is too high',
	},
	{
		label : t('cancellationTicket:select_reason_3_lable'),
		value : 'I found a better alternative',
	},
	{
		label : t('cancellationTicket:select_reason_4_lable'),
		value : 'Inaccurate Information',
	},
	{
		label : t('cancellationTicket:select_reason_5_lable'),
		value : 'Dissatisfactory Customer Support',
	},
	{
		label : t('cancellationTicket:select_reason_6_lable'),
		value : 'other',
	},
];
export default OPTIONS;
