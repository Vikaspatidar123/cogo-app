const translationKey = 'common:components_header_tickets_list';

const additionalInformation = ({ t }) => [
	{
		keyword     : 'shipment',
		name        : 'shipment_id',
		type        : 'number',
		label       : t(`${translationKey}_shipment`),
		placeholder : t(`${translationKey}_placeholder`),
	},
	{
		keyword     : 'invoice',
		name        : 'invoice_number',
		type        : 'number',
		label       : t(`${translationKey}_invoice`),
		placeholder : t(`${translationKey}_placeholder`),
	},
];

export default additionalInformation;
