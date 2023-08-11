import patterns from '@/ui/commons/configurations/patterns';

const { IcMCloudUpload } = require('@cogoport/icons-react');
const { startCase } = require('@cogoport/utils');

const { getLocaleSpecificLabels } = require('@/ui/commons/constants/CountrySpecificDetail');

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

const getDocControls = () => {
	const IDENTIFICAITON_LABEL = getLocaleSpecificLabels({
		accessorType : 'identification_number',
		accessor     : 'label',
	});

	return {
		iec: [
			{
				label : 'IEC Code',
				name  : 'identity_number',
				type  : 'text',
				span  : 6,
				rules : { required: true },
			},
		],
		pan: [
			{
				label : IDENTIFICAITON_LABEL,
				name  : 'identity_number',
				type  : 'text',
				span  : 6,
				rules : {
					required : `${IDENTIFICAITON_LABEL} is required`,
					pattern  : {
						value   : patterns.PAN_NUMBER,
						message : `${IDENTIFICAITON_LABEL} is invalid`,
					},
				},
			},
		],
		wca: [
			{
				label : 'WCA License Number',
				name  : 'identity_number',
				type  : 'text',
				span  : 6,
				rules : { required: true },
			},
		],
		iata: [
			{
				label : 'IATA License Code',
				name  : 'identity_number',
				type  : 'text',
				span  : 6,
				rules : { required: true },
			},
		],
	};
};

const docControlsForTp = ({
	selectedDocumentType,
	setSelectedDocumentType = () => {},
	editAdditionalTpDetails = {},
}) => {
	const docControls = getDocControls();
	const controls = [
		{
			label   : 'Document Type',
			name    : 'document_type',
			type    : 'select',
			options : docs.org_documents.map((doc) => ({
				label : startCase(doc),
				value : doc,
			})),
			span  : 6,
			rules : { required: true },

			handleChange: (obj = {}) => {
				setSelectedDocumentType(obj || {});
			},
		},
		...(docControls[selectedDocumentType.value] || []),
		{
			name       : 'image_url',
			label      : 'Upload Document',
			type       : 'file',
			drag       : true,
			uploadIcon : () => <IcMCloudUpload size={2} />,
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
