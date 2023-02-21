const translationKey =
	'common:components.addInvoicingParty.configurations.orgDocuments.config.';

const getOrgDocumentsConfig = ({ t = () => {} }) => {
	return {
		bank_account_details: {
			key: 'bank_account_details',
			label: t(`${translationKey}bank_account_details.label`),
			data: [
				{
					label: t(`${translationKey}bank_account_details.data.label`),
					valueKey: 'accountHolderName',
				},
				{ key: 'bank_name', valueKey: 'bankName' },
				{ key: 'branch_name', valueKey: 'branchName' },
				{ key: 'bank_account_number', valueKey: 'bankAccountNumber' },
				{ key: 'ifsc_number', valueKey: 'ifscNumber' },
			],
		},
		authority_letter: {
			key: 'authority_letter',
			label: t(`${translationKey}authority_letter.label`),
			data: [{ key: 'identity_number', valueKey: 'identityNumber' }],
		},
		business_address_proof: {
			key: 'business_address_proof',
			label: t(`${translationKey}business_address_proof.label`),
			data: [
				{ key: 'address', valueKey: 'address' },
				{ key: 'name', valueKey: 'proofName' },
				{ key: 'pincode', valueKey: 'pinCode' },
			],
		},
		iata: {
			key: 'iata',
			label: t(`${translationKey}iata.label`),
			data: [{ key: 'identity_number', valueKey: 'identityNumber' }],
		},
		iec: {
			key: 'iec',
			label: t(`${translationKey}iec.label`),
			data: [{ key: 'identity_number', valueKey: 'identityNumber' }],
		},
		pan: {
			key: 'pan',
			label: t(`${translationKey}pan.label`),
			data: [{ key: 'identity_number', valueKey: 'identityNumber' }],
		},
		wca: {
			key: 'wca',
			label: t(`${translationKey}wca.label`),
			data: [{ key: 'identity_number', valueKey: 'identityNumber' }],
		},
	};
};

export default getOrgDocumentsConfig;
