const translationKey = 'common:components_header_tickets_list';

const additionalInformation = ({ t }) => [
	{
		keyword     : 'shipment',
		name        : 'shipment_id',
		type        : 'number',
		label       : t(`${translationKey}_shipment`),
		placeholder : 'ex: 987654',
	},
	{
		keyword     : 'invoice',
		name        : 'invoice_number',
		type        : 'number',
		label       : t(`${translationKey}_invoice`),
		placeholder : 'ex: 987654',
	},
];

export default additionalInformation;
