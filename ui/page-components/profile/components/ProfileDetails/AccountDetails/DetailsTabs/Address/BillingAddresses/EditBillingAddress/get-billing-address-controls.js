/* eslint-disable import/no-unresolved */
import data from '@/.data-store/constants/countries.json';
import { getCountrySpecificData } from '@/ui/commons/constants/CountrySpecificDetail';
import getGeoConstants from '@/ui/commons/constants/geo';

const geo = getGeoConstants();
const geoObj = {
	country_id    : geo.country.id,
	accessor      : 'label',
	isDefaultData : true,
};

const REGISTRATION_LABEL = getCountrySpecificData({
	...geoObj,
	accessorType: 'registration_number',
});

const ECO_ZONE_LABEL = getCountrySpecificData({
	...geoObj,
	accessorType: 'economic_zone',
});

const country_code = data?.map((x) => ({
	label : x.mobile_country_code,
	value : x.mobile_country_code,
}));
const fields = [
	{
		name        : 'name',
		label       : 'Billing Party Name',
		placeholder : 'Enter Name',
		type        : 'text',
		style       : { width: '370px' },
	},
	{
		name        : 'pincode',
		label       : 'Pincode',
		placeholder : 'Select Pincode',
		type        : 'async_select',
		asyncKey    : 'locations',
		params      : { filters: { type: ['pincode'] } },
		multiple    : false,
		labelKey    : 'postal_code',
		valueKey    : 'postal_code',
		style       : { width: '370px' },
		rules       : { required: 'Required' },
	},
	{
		name        : 'tax_number',
		label       : `${REGISTRATION_LABEL} Number`,
		placeholder : `Enter ${REGISTRATION_LABEL} Number`,
		type        : 'text',
		style       : { width: '370px' },
		rules       : {
			required : true,
			pattern  : {
				message: `${REGISTRATION_LABEL} Number Required `,
			},
		},
	},

	{
		name    : 'is_sez',
		label   : `Is your address ${ECO_ZONE_LABEL}?`,
		type    : 'checkbox',
		options : [
			{
				label : 'is_sez',
				value : true,
			},
		],
		style: { width: '370px' },
	},

	{
		name        : 'address',
		label       : 'Address',
		placeholder : 'Enter Address',
		type        : 'text',
		style       : { width: '370px' },
		rules       : {
			required: 'address',
		},
	},
	{
		name        : 'poc_name',
		label       : 'POC Name',
		placeholder : 'Enter POC Name',
		type        : 'text',
		style       : { width: '370px' },
		rules       : { required: true },
		mode        : 'poc',
	},
	{
		name        : 'phone_number',
		label       : 'POC Mobile Number',
		placeholder : 'Enter Mobile Number',
		type        : 'mobile_number',
		inputType   : 'number',
		select2     : 'new',
		style       : { width: '200px' },
		options     : country_code,
		rules       : {
			required : true,
			validate : (value) => (value?.country_code && value?.number ? undefined : 'Phone Number'),
		},
		mode: 'poc',
	},
	{
		name        : 'poc_email',
		label       : 'POC Email		',
		placeholder : 'Enter POC Email',
		type        : 'text',
		style       : { width: '370px' },
		rules       : { required: true },
		mode        : 'poc',
	},
	{
		name  : 'sez_proof',
		label : `${ECO_ZONE_LABEL} Proof`,
		type  : 'file',
		drag  : true,
		style : { width: '370px' },
		rules : {
			required: `${ECO_ZONE_LABEL} Proof Required`,
		},
	},
	{
		name  : 'tax_number_document_url',
		label : `${REGISTRATION_LABEL} Proof`,
		type  : 'file',
		style : { width: '370px' },
		rules : {
			required: 'Tax Number Document Url',
		},
	},
];

const getBillingAddressControls = ({ cityPincode = {} }) => (fields || []).map((control) => {
	const { name } = control;
	let newControl = { ...control };

	if (name === 'pincode') {
		newControl = { ...newControl, ...cityPincode };
	}
	return { ...newControl };
});

export default getBillingAddressControls;
