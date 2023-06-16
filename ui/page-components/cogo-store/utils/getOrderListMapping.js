const getOrderListMapping = ({ t }) => {
	const MAPPING = [
		{
			title: t('cogoStore:orderHistory_card_mapping_title_order'),
			key: 'created_at',
		},
		{
			title: t('cogoStore:orderHistory_card_mapping_title_total'),
			key: 'cogopoints',
		},
		{
			title: t('cogoStore:orderHistory_card_mapping_title_order_no'),
			key: 'order_no',
		},
	];
	return MAPPING;
};

export default getOrderListMapping;
