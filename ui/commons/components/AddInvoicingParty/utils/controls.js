import getBankAccountControls from './bankAccountControls';
import getBillingAddressControls from './billingAddressControls';
import docControlsForTp from './docsControls';
import getOtherAddressControls from './otherAddressesControls';
import { getPocControls, getPocControlsFieldArray } from './pocControls';

const translationKey = 'common:components.addInvoicingParty.utils.controls';

const additionalOrgControls = [
	// {
	// 	name: 'tds_deduction_type',
	// 	label: 'TDS Type',
	// 	type: 'select',
	// 	caret: true,
	// 	span: 4,
	// 	options: [
	// 		{ value: 'normal', label: 'Normal' },
	// 		{ value: 'no_deduction', label: 'No Deduction' },
	// 		{ value: 'lower_deduction', label: 'Lower Deduction' },
	// 	],
	// 	multiple: false,
	// 	placeholder: 'Select TDS Type',
	// 	rules: { required: true },
	// },
	// {
	// 	name: 'tds_deduction_style',
	// 	label: 'TDS Style',
	// 	type: 'select',
	// 	caret: true,
	// 	span: 4,
	// 	options: [
	// 		{ value: 'gross', label: 'Gross' },
	// 		{ value: 'net', label: 'Net' },
	// 		{ value: 'exempt', label: 'Exempt' },
	// 	],
	// 	multiple: false,
	// 	placeholder: 'Select TDS Style',
	// 	rules: { required: true },
	// },
	// {
	// 	name: 'tds_deduction_rate',
	// 	label: 'TDS Rate (%)',
	// 	span: 4,
	// 	type: 'number',
	// 	placeholder: 0,
	// 	rules: { required: '% is required', min: 0, max: 40 },
	// },
	// {
	// 	name: 'tds_certificate',
	// 	label: 'Tds Certificate',
	// 	type: 'file',
	// 	drag: true,
	// 	span: 12,
	// 	uploadType: 'aws',
	// 	height: 45,
	// 	uploadIcon: () => <UploadIconSvg size={2} />,
	// },
	// {
	// 	name: 'tds_certificate_number',
	// 	label: 'TDS Certificate No.',
	// 	type: 'text',
	// 	span: 4,
	// 	placeholder: 'XXXXXXXXXXX',
	// },
	// {
	// 	name: 'tds_certificate_start_date',
	// 	label: 'TDS Certificate Start Date',
	// 	type: 'datepicker',
	// 	span: 4,
	// },
	// {
	// 	name: 'tds_certificate_end_date',
	// 	label: 'TDS Certificate End Date',
	// 	type: 'datepicker',
	// 	span: 4,
	// },
];

export const getAdditionalOrgControls = ({ values = {} }) => {
	return additionalOrgControls.map((control) => {
		return { ...control, value: values[control.name] || '' };
	});
};

export const getControlsForAddingTpDetails = ({
	editAdditionalTpDetails = {},
	activeTabFromList = 'billing_address',
	selectedDocumentType = '',
	setSelectedDocumentType = () => {},
	t = () => {},
}) => {
	switch (activeTabFromList) {
		case 'billing_address':
			return [
				...getBillingAddressControls({ values: editAdditionalTpDetails, t }),
				...getPocControls({ values: editAdditionalTpDetails, t }),
				...getPocControlsFieldArray({ values: editAdditionalTpDetails, t }),
			];

		case 'other_address':
			return [
				...getOtherAddressControls({ values: editAdditionalTpDetails, t }),
				...getPocControls({ values: editAdditionalTpDetails, t }),
				...getPocControlsFieldArray({ values: editAdditionalTpDetails, t }),
			];

		case 'bank_details':
			return getBankAccountControls({ values: editAdditionalTpDetails, t });

		case 'documents':
			return docControlsForTp({
				selectedDocumentType,
				setSelectedDocumentType,
				editAdditionalTpDetails,
				t,
			});

		default:
			return '';
	}
};

export const getPocFieldArray = ({
	action = '',
	pocValues = {},
	t = () => {},
}) => {
	const pocControls = getPocControls();
	const values = [];
	if (action === 'create') {
		const hash = {};
		pocControls.forEach((control) => {
			hash[control.name] = '';
		});

		values[0] = hash;
	}

	return [
		{
			type: 'fieldArray',
			name: 'poc_details',
			label: t(`${translationKey}.pocFieldArray.poc_details.label`),
			controls: pocControls,
			value: pocValues?.poc_details || values,
		},
	];
};
