const getConfig = () => {
	return {
		bankDetailsDocument: {
			api: {
				endpoint: 'list_organization_documents',
				filters: {
					documentType: ['bank_account_details'],
				},
			},
		},
		otherDocuments: {
			api: {
				endpoint: 'list_organization_documents',
				filters: {
					documentType: [
						'pan',
						'iec',
						'business_address_proof',
						'authority_letter',
						'wca',
						'iata',
						'indemnification_proof',
					],
				},
			},
		},
	};
};

export default getConfig;
