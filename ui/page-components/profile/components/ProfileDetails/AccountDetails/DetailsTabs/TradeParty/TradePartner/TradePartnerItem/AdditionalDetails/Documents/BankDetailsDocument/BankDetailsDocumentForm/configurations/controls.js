const getConfig = ({ t = () => {} }) => {
	const translationKey =
		'profile:accountDetails.tabOptions.tradeParty.tradePartner.tradePartnerItem.additionalDetails.documents.bankDetailsDocument.bankDetailsDocumentForm.configurations.1.';

	return [
		{
			type: 'text',
			name: 'ifsc_number',
			label: t(`${translationKey}ifsc.label`),
			rules: { required: true },
			style: {
				flexBasis: '50%',
			},
		},
		{
			type: 'text',
			name: 'account_holder_name',
			label: t(`${translationKey}name.label`),
			rules: { required: true },
			style: {
				flexBasis: '50%',
			},
		},
		{
			type: 'text',
			name: 'bank_account_number',
			label: t(`${translationKey}bankAccountNumber.label`),
			rules: { required: true },
			style: {
				flexBasis: '50%',
			},
		},
		{
			type: 'text',
			name: 'bank_name',
			label: t(`${translationKey}bankName.label`),
			rules: { required: true },
			style: {
				flexBasis: '50%',
			},
		},
		{
			type: 'text',
			name: 'branch_name',
			label: t(`${translationKey}branchName.label`),
			themeType: 'small',
			rules: { required: true },
			style: {
				flexBasis: '50%',
			},
		},
		{
			type: 'file',
			name: 'image_url',
			label: t(`${translationKey}img.label`),
			drag: true,
			uploadType: 'aws',
			height: 45,
			rules: { required: true },
			// span: 12,
			style: {
				flexBasis: '100%',
			},
		},
	];
};

export default getConfig;
