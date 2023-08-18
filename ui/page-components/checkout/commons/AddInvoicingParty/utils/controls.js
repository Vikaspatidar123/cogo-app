import otherAddressesControls from '../configurations/addressControls';
import bankAccountControls from '../configurations/bankAccountControls';
import getBillingControls from '../configurations/billingControls';
import docControlsForTp from '../configurations/docControls';
import documentsControls from '../configurations/documentControls';
import orgControls from '../configurations/getOrgControls';
import { getPocControls, getPocFieldArray, getPocControlsFieldArray } from '../configurations/pocControls';

import { getLocaleSpecificLabels } from '@/ui/commons/constants/CountrySpecificDetail';

export const getBillingAddressControls = ({ values = {} }) => {
	const billingAddressControls = getBillingControls();
	return billingAddressControls.map((control) => {
		const { name } = control;

		return { ...control, value: values[name] || '' };
	});
};

export const getOrgControls = ({ values = {} }) => orgControls.map((control) => {
	const { name = '' } = control;

	if (name === 'registration_number') {
		const IDENTIFICAITON_LABEL = getLocaleSpecificLabels({
			accessorType : 'identification_number',
			accessor     : 'label',
		});

		return { ...control, label: IDENTIFICAITON_LABEL, value: values[name] || '' };
	}

	return { ...control, value: values[name] || '' };
});

export const getBankAccountControls = ({ values = {} }) => bankAccountControls.map((control) => {
	const { name = '' } = control;
	const { data = {} } = values;

	if (name === 'image_url') {
		return { ...control, value: values[name] || '' };
	}

	return { ...control, value: data[name] || values[name] || '' };
});

export const getDocumentControls = ({ values = {} }) => documentsControls.map((control) => {
	const value = values[control.name] || '';
	return { ...control, value };
});
export const getOtherAddressControls = ({ values = {} }) => otherAddressesControls.map((control) => {
	const value = values[control.name] || '';
	return { ...control, value };
});
export const getControlsForAddingTpDetails = ({
	editAdditionalTpDetails = {},
	activeTabFromList = 'billing_address',
	selectedDocumentType = '',
	setSelectedDocumentType = () => {},
}) => {
	switch (activeTabFromList) {
		case 'billing_address':
			return [
				...getBillingAddressControls({ values: editAdditionalTpDetails }),
				...getPocControls({ values: editAdditionalTpDetails }),
				...getPocControlsFieldArray({ values: editAdditionalTpDetails }),
			];

		case 'other_address':
			return [
				...getOtherAddressControls({ values: editAdditionalTpDetails }),
				...getPocControls({ values: editAdditionalTpDetails }),
				...getPocControlsFieldArray({ values: editAdditionalTpDetails }),
			];

		case 'bank_details':
			return getBankAccountControls({ values: editAdditionalTpDetails });

		case 'documents':
			return docControlsForTp({
				selectedDocumentType,
				setSelectedDocumentType,
				editAdditionalTpDetails,
			});

		default:
			return '';
	}
};

export { getPocControls, getPocFieldArray, getPocControlsFieldArray };
