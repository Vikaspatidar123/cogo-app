const getDocumentsName = ({ t = () => {} }) => {
	const translationKey =
		'profile:accountDetails.tabOptions.tradeParty.tradePartner.tradePartnerItem.additionalDetails.documents.otherDocuments.otherDocumentsForm.configurations.getDocumentsName.';
	return {
		pan: t(`${translationKey}pan`),
		iec: t(`${translationKey}iec`),
		iata: t(`${translationKey}iata`),
		wca: t(`${translationKey}wca`),
		business_address_proof: t(`${translationKey}businessAddressProof`),
		authority_letter: t(`${translationKey}authorityLetter`),
		indemnification_proof: t(`${translationKey}indemnification_proof`),
	};
};

export default getDocumentsName;
