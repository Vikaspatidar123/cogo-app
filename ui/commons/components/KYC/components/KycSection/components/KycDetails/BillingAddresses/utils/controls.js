import registrationNumbersMapping from '../../utils/registrationNumbersMapping';

const { INDIA_COUNTRY_ID } = global;

const DOCUMENT_UPLOAD_MAX_SIZE = '5242880';

const otherAddressOptions = [
	{ label: 'Office', value: 'office' },
	{ label: 'Factory Address', value: 'factory' },
	{ label: 'Warehouse Address', value: 'warehouse' },
];

const controls = [
	{
		id        : 'cp-lsp__onboarding__accountInformation__billingAddressDetails__gst_list',
		name      : 'gst_list',
		label     : 'Select GST',
		type      : 'pills',
		span      : 12,
		className : 'primary md',
	},
	{
		id        : 'cp-lsp__onboarding__accountInformation__billingAddressDetails__gst_number',
		name      : 'gst_number',
		label     : 'GST',
		type      : 'text',
		className : 'toUpperCase',
		span      : 6,
		maxLength : 15,
		rules     : {
			required : true,
			pattern  : {
				value   : registrationNumbersMapping.gstin.pattern,
				message : 'GST is invalid',
			},
		},
	},
	{
		id        : 'cp-lsp__onboarding__accountInformation__billingAddressDetails__address_type',
		name      : 'address_type',
		label     : 'Address Type',
		type      : 'select',
		showLabel : false,
		span      : 6,
		caret     : true,
		options   : otherAddressOptions,
		rules     : {
			required: true,
		},
	},
	{
		id    : 'cp-lsp__onboarding__accountInformation__billingAddressDetails__tax',
		name  : 'tax',
		label : 'Tax',
		type  : 'text',
		span  : 6,
		rules : {
			required: true,
		},
	},

	{
		id    : 'cp-lsp__onboarding__accountInformation__billingAddressDetails__pincode',
		name  : 'pincode',
		label : 'Pincode',
		type  : 'text',
		span  : 6,
		rules : {
			required: true,
		},
	},
	{
		id     : 'cp-lsp__onboarding__accountInformation__billingAddressDetails__address',
		name   : 'address',
		label  : 'Billing Address',
		type   : 'textarea',
		span   : 12,
		height : 80,
		rules  : {
			required: true,
		},
	},
	{
		name       : 'tax_exemption_proof',
		label      : 'GST Exemption proof',
		lowerlabel : 'Please share GST Exemption Certificate',
		type       : 'file',
		drag       : true,
		span       : 12,
		uploadType : 'aws',
		accept     : '.png,.pdf,.jpg,.jpeg,.doc,.docx',
		maxSize    : DOCUMENT_UPLOAD_MAX_SIZE,
		rules      : { required: true },
	},
	{
		id         : 'cp-lsp__onboarding__accountInformation__billingAddressDetails__tax_proof',
		name       : 'tax_proof',
		label      : 'Tax Proof',
		lowerlabel : 'Please share tax with us to streamline payouts for you',
		type       : 'file',
		drag       : true,
		span       : 12,
		uploadType : 'aws',
		accept     : '.png,.pdf,.jpg,.jpeg,.doc,.docx',
		maxSize    : DOCUMENT_UPLOAD_MAX_SIZE,
		rules      : { required: true },
	},
	{
		id    : 'cp-lsp__onboarding__accountInformation__billingAddressDetails__gst_proof',
		name  : 'gst_proof',
		label : 'GST Proof',
		lowerlabel:
			'Please share GST Registration Certificate with us to streamline payouts for you',
		type       : 'file',
		drag       : true,
		span       : 12,
		uploadType : 'aws',
		accept     : '.png,.pdf,.jpg,.jpeg,.doc,.docx',
		maxSize    : DOCUMENT_UPLOAD_MAX_SIZE,
		rules      : { required: true },
	},
];

export const getControls = ({ countryId = '' }) => {
	const isCountryIndia = countryId === INDIA_COUNTRY_ID;

	return controls.reduce((previousControls, currentControl) => {
		const { name = '' } = currentControl;

		if (
			(['tax', 'tax_proof'].includes(name) && isCountryIndia)
			|| (['gst_number', 'gst_proof'].includes(name) && !isCountryIndia)
		) {
			return [...previousControls];
		}

		let newControl = { ...currentControl };

		if (name === 'pincode') {
			newControl = {
				...newControl,
				type: isCountryIndia ? 'number' : 'text',
			};
		}

		return [...previousControls, newControl];
	}, []);
};
