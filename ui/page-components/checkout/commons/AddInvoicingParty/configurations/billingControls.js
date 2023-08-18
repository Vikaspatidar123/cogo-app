import { IcMFileUploader } from '@cogoport/icons-react';

import { getLocaleSpecificLabels } from '@/ui/commons/constants/CountrySpecificDetail';
import getGeoConstants from '@/ui/commons/constants/geo';

const OPTION = [
	{
		label : 'Office',
		value : 'office',
	},
	{
		label : 'Factory Address',
		value : 'factory',
	},
	{
		label : 'Warehouse Address',
		value : 'warehouse',
	},
];

const getBillingControls = () => {
	const geo = getGeoConstants();
	const REGISTRATION_LABEL = geo.others.registration_number.label;
	const REGISTRATION_PATTERN = geo.others.registration_number.pattern;

	const ECO_ZONE_LABEL = getLocaleSpecificLabels({
		accessorType : 'economic_zone',
		accessor     : 'label',
	});

	return [
		{
			name  : 'billing_party_name',
			label : 'Billing Party Name ',
			type  : 'text',
			span  : 5.8,
			rules : { required: true },
		},
		{
			name    : 'address_type',
			label   : 'Address Type',
			type    : 'select',
			span    : 5.8,
			options : OPTION,
			rules   : { required: true },
		},
		{
			label       : 'Country of Registration',
			name        : 'country_id',
			type        : 'async_select',
			asyncKey    : 'locations',
			params      : { filters: { type: ['country'] } },
			initialCall : true,
			span        : 5.8,
			rules       : {
				required: 'Country of Registration is Required',
			},
		},
		{
			name     : 'pincode',
			label    : 'Pincode',
			labelKey : 'postal_code',
			valueKey : 'postal_code',
			type     : 'async_select',
			asyncKey : 'locations',
			params   : { filters: { type: ['pincode'] } },
			caret    : true,
			span     : 5.8,
			rules    : { required: true },
		},
		{
			name      : 'tax_number',
			label     : `${REGISTRATION_LABEL} Number`,
			type      : 'text',
			span      : 5.8,
			maxLength : 15,

			rules: {
				required : true,
				pattern  : {
					value   : REGISTRATION_PATTERN,
					message : `${REGISTRATION_LABEL} is invalid`,
				},
			},
		},
		{
			name       : 'tax_number_document_url',
			label      : `${REGISTRATION_LABEL} Proof`,
			type       : 'file',
			drag       : true,
			uploadIcon : () => <IcMFileUploader />,
			span       : 5.8,
			height     : 45,
			rules      : { required: true },
		},
		{
			name  : 'address',
			label : 'Billing Address',
			type  : 'textarea',
			span  : 5.8,
			rules : { required: true },
		},
		{
			name     : 'is_sez',
			type     : 'checkbox',
			span     : 12,
			options  : [{ value: 'addressIsSez', label: `Is ${ECO_ZONE_LABEL}` }],
			multiple : true,
		},
		{
			name       : 'sez_proof',
			label      : `${ECO_ZONE_LABEL} Proof`,
			type       : 'file',
			drag       : true,
			span       : 12,
			height     : 45,
			uploadIcon : () => <IcMFileUploader />,
			rules      : { required: true },
		},
	];
};

export default getBillingControls;
