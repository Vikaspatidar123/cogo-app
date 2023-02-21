const getConfig = ({ t = () => {} }) => {
	const translationKey =
		'profile:accountDetails.tabOptions.tradeParty.tradePartner.tradePartnerItem.additionalDetails.documents.otherDocuments.otherDocumentsForm.configurations.';
	return [
		{
			type: 'select',
			name: 'document_type',
			label: t(`${translationKey}getConfig.documentType.label`),
			options: [
				{
					label: t(`${translationKey}getConfig.documentType.options.1`),
					value: 'pan',
				},
				{
					label: t(`${translationKey}getConfig.documentType.options.2`),
					value: 'iec',
				},
				{
					label: t(`${translationKey}getConfig.documentType.options.3`),
					value: 'business_address_proof',
				},
				{
					label: t(`${translationKey}getConfig.documentType.options.4`),
					value: 'authority_letter',
				},
				{
					label: t(`${translationKey}getConfig.documentType.options.5`),
					value: 'iata',
				},
				{
					label: t(`${translationKey}getConfig.documentType.options.6`),
					value: 'wca',
				},
				{
					label: t(`${translationKey}getConfig.documentType.options.7`),
					value: 'indemnification_proof',
				},
			],
			rules: { required: true },
			span: 6,
		},
		{
			type: 'text',
			name: 'pan',
			label: t(`${translationKey}getConfig.pan.label`),
			rules: { required: true },
			span: 6,
		},
		{
			type: 'text',
			name: 'iec',
			label: t(`${translationKey}getConfig.iec.label`),
			rules: { required: true },
			span: 6,
		},
		{
			type: 'text',
			name: 'iata',
			label: t(`${translationKey}getConfig.iata.label`),
			rules: { required: true },
			span: 6,
		},
		{
			type: 'text',
			name: 'wca',
			label: t(`${translationKey}getConfig.wca.label`),
			rules: { required: true },
			span: 6,
		},
		{
			type: 'file',
			name: 'image_url',
			label: t(`${translationKey}getConfig.img.label`),
			drag: true,
			uploadType: 'aws',
			height: 45,
			rules: { required: true },
			span: 12,
		},
	];
};

export default getConfig;
