import patterns from '@/ui/commons/configurations/patterns';
import { getLocaleSpecificLabels } from '@/ui/commons/constants/CountrySpecificDetail';
import getGeoConstants from '@/ui/commons/constants/geo';

const createSellerControl = () => {
	const geo = getGeoConstants();
	const { label:REGISTRATION_LABEL, pattern:REGISTRATION_PATTERN } = geo.others.registration_number;

	const ECO_ZONE_LABEL = getLocaleSpecificLabels({
		accessorType : 'economic_zone',
		accessor     : 'label',
	});

	const billingDetailControl = [
		{
			name        : 'name',
			label       : 'Billing Party Name *',
			placeholder : 'Enter Billing Party Name',
			type        : 'text',
			rules       : {
				required: '*Required',
			},
		},
		{
			name        : 'pincode',
			label       : 'Pincode *',
			type        : 'number',
			placeholder : 'Enter Pincode',
			rules       : {
				required  : '*Required',
				minLength : {
					value   : 6,
					message : 'min length is 6',
				},
				maxLength: {
					value   : 6,
					message : 'max length is 6',
				},
			},
		},
		{
			name        : 'tax_number',
			label       : 'Tax Number*',
			type        : 'text',
			placeholder : 'Enter Tax Number',
			rules       : {
				required : '*Required',
				pattern  : {
					value   : REGISTRATION_PATTERN,
					message : `Invalid ${REGISTRATION_LABEL} Number`,
				},
			},
		},
		{
			name  : 'gst_proof',
			label : `${REGISTRATION_LABEL} Proof`,
			type  : 'file',
			rules : {
				required: '*Required',
			},
			accept: '.jpg , .png, .csv, .jpeg',
		},
		{
			name    : 'is_sez',
			label   : `Is Your Address ${ECO_ZONE_LABEL}?`,
			type    : 'checkbox',
			value   : false,
			options : [
				{
					label : 'YES',
					value : true,
				},
				{
					label : 'NO',
					value : false,
				},
			],
		},
		{
			name  : 'sez_proof',
			label : `${ECO_ZONE_LABEL} Proof*`,
			type  : 'file',
			rules : {
				required: '*Required',
			},
			accept: '.jpg , .png, .csv, .jpeg',
		},
	];

	const pocDetailControl = [
		{
			name        : 'poc_name',
			label       : 'POC Name *',
			type        : 'text',
			placeholder : 'User\'s Name',
			rules       : {
				required: '*Required',
			},
		},
		{
			name        : 'address',
			label       : 'Address*',
			type        : 'textarea',
			placeholder : 'Enter Address',
			rows        : 1,
			rules       : {
				required: '*Required',
			},
		},
		{
			name         : 'mobile_number',
			label        : 'POC Mobile Number*',
			type         : 'mobile_number',
			isInputGroup : true,
			rules        : {
				required : true,
				pattern  : {
					value   : patterns.MOBILE,
					message : 'Invalid mobile number',
				},
			},
			placeholder: 'User\'s Mobile Number',
		},
		{
			name        : 'email',
			label       : 'POC Email *',
			type        : 'text',
			placeholder : 'User\'s Email Address',
			rules       : {
				required : '*Required',
				pattern  : {
					value   : patterns.EMAIL,
					message : 'Invalid email',
				},
			},
		},
	];

	const resetSeller = {
		address       : '',
		email         : '',
		gst_proof     : null,
		is_sez        : false,
		mobile_number : null,
		name          : '',
		pincode       : '',
		poc_name      : '',
		sez_proof     : null,
		tax_number    : '',
	};

	return {
		billingDetailControl, pocDetailControl, resetSeller,
	};
};

export default createSellerControl;
