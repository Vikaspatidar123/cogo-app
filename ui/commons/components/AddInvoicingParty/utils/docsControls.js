import { startCase } from '@cogoport/utils';

import UploadIconSvg from '../assets/doc-attach-icon.svg';

import patterns from '@/ui/commons/configurations/patterns';

const docs = {
	org_documents: [
		'pan',
		'iec',
		'business_address_proof',
		'authority_letter',
		'iata',
		'wca',
	],
};

const translationKey =	'common:components.addInvoicingParty.utils.controls.docsControls';

const getDocsControls = ({ t = () => {} }) => ({
	iec: [
		{
			label : t(`${translationKey}.iec.label`),
			name  : 'identity_number',
			type  : 'text',
			style : {
				flexBasis: '50%',
			},
			rules: { required: true },
		},
	],
	pan: [
		{
			label : t(`${translationKey}.pan.label`),
			name  : 'identity_number',
			type  : 'text',
			style : {
				flexBasis: '50%',
			},
			rules: {
				required : t(`${translationKey}.pan.rules.required`),
				pattern  : {
					value   : patterns.PAN_NUMBER,
					message : t(`${translationKey}.pan.rules.pattern.message`),
				},
			},
		},
	],
	wca: [
		{
			label : t(`${translationKey}.wca.label`),
			name  : 'identity_number',
			type  : 'text',
			style : {
				flexBasis: '50%',
			},
			rules: { required: true },
		},
	],
	iata: [
		{
			label : t(`${translationKey}.iata.label`),
			name  : 'identity_number',
			type  : 'text',
			style : {
				flexBasis: '50%',
			},
			rules: { required: true },
		},
	],
});

const docControlsForTp = ({
	selectedDocumentType,
	setSelectedDocumentType = () => {},
	editAdditionalTpDetails = {},
	t = () => {},
}) => {
	const docControls = getDocsControls({ t });
	const controls = [
		{
			label   : t(`${translationKey}.document_type.label`),
			name    : 'document_type',
			type    : 'select',
			options : docs.org_documents.map((doc) => ({
				label : startCase(doc),
				value : doc,
			})),
			style: {
				flexBasis: '50%',
			},
			rules: { required: true },

			handleChange: (obj = {}) => {
				setSelectedDocumentType(obj || {});
			},
		},
		...(docControls[selectedDocumentType.value] || []),
		{
			name       : 'image_url',
			label      : t(`${translationKey}.image_url.label`),
			type       : 'file',
			drag       : true,
			uploadIcon : () => <UploadIconSvg width={24} height={24} />,
			span       : 12,
			uploadType : 'aws',
			height     : 45,
			rules      : { required: true },
		},
	];

	return controls.map((control) => {
		const { name } = control;
		const { data = {} } = editAdditionalTpDetails;

		if (name === 'identity_number') {
			return { ...control, value: data[name] || '' };
		}
		return { ...control, value: editAdditionalTpDetails[name] || '' };
	});
};

export default docControlsForTp;
