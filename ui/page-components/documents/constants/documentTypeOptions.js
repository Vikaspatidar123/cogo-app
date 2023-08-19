import { getLocaleSpecificLabels } from '@/ui/commons/constants/CountrySpecificDetail';

export const getOptions = ({ t }) => {
	const IDENTIFICAITON_LABEL = getLocaleSpecificLabels({
		accessorType : 'identification_number',
		accessor     : 'label',
	});
	return ([
		{ label: IDENTIFICAITON_LABEL, value: 'pan' },
		{ label: t('documents:document_options_2'), value: 'iec' },
		{ label: t('documents:document_options_3'), value: 'business_address_proof' },
		{ label: t('documents:document_options_4'), value: 'bank_account_details' },
		{ label: t('documents:document_options_5'), value: 'authority_letter' },
		{ label: t('documents:document_options_6'), value: 'iata' },
		{ label: t('documents:document_options_7'), value: 'wca' },
		{ label: t('documents:document_options_8'), value: 'registration_document' },
		{ label: t('documents:document_options_9'), value: 'utility_bill_document_url' },
		{ label: t('documents:document_options_10'), value: 'iip_certificate' },
		{ label: t('documents:document_options_11'), value: 'msds_certificate' },
		{ label: t('documents:document_options_12'), value: 'phyto' },
		{ label: t('documents:document_options_13'), value: 'port_registration' },
	]);
};
