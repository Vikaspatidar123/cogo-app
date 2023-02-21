const getConfig = ({ t = () => {} }) => {
	const translationKey =
		'profile:accountDetails.tabOptions.tradeParty.tradePartner.tradePartnerItem.additionalDetails.documents.otherDocuments.config.list.';
	return {
		list: [
			{
				key: 'documentType',
				label: t(`${translationKey}documentType.label`),
				span: 6,
			},
			{
				key: 'document',
				label: t(`${translationKey}document.label`),
				span: 6,
			},
		],
	};
};

export default getConfig;
