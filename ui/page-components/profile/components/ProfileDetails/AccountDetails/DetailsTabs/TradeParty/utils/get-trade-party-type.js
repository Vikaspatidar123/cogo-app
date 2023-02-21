const getTradePartyType = ({ organizationType = '', t = () => {} }) => {
	const serviceTypes = {
		importer_exporter: {
			key: 'paying_party',
			label: t(
				'profile:accountDetails.tabOptions.tradeParty.serviceTypes.payingParty',
			),
			value: 'paying_party',
		},
		service_provider: {
			key: 'collection_party',
			label: t(
				'profile:accountDetails.tabOptions.tradeParty.serviceTypes.collectionParty',
			),
			value: 'collection_party',
		},
	};

	return serviceTypes[organizationType];
};

export default getTradePartyType;
