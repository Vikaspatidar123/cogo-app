const getInvoiceTpControls = ({ t = () => {} }) => {
	const translationKey =
		'common:components.addressForm.configurations.invoiceTradePartyControls';
	return [
		{
			type: 'select2',
			optionsListKey: 'trade-parties',
			name: 'organization_trade_party_id',
			label: t(`${translationKey}.organization_trade_party_id.label`),
			caret: true,
			rules: { required: true },
			defaultOptions: true,
			// span: 6,
			style: {
				flexBasis: '50%',
			},
		},
	];
};

export default getInvoiceTpControls;
