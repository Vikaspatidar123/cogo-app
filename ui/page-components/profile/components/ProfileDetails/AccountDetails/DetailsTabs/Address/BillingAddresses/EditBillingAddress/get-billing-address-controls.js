/* eslint-disable import/no-unresolved */
import data from '@/.data-store/constants/countries.json';
import { getLocaleSpecificLabels } from '@/ui/commons/constants/CountrySpecificDetail';
import getGeoConstants from '@/ui/commons/constants/geo';

const country_code = data?.map((x) => ({
	label : x.mobile_country_code,
	value : x.mobile_country_code,
}));

const getBillingAddressControls = ({ cityPincode = {}, t }) => {
	const geo = getGeoConstants();

	const REGISTRATION_LABEL = geo.others.registration_number.label;

	const ECO_ZONE_LABEL = getLocaleSpecificLabels({
		accessorType : 'economic_zone',
		accessor     : 'label',
	});

	const fields = [
		{
			name        : 'name',
			label       : t('settings:billing_details_label_1'),
			placeholder : t('settings:billing_details_placeholder_7'),
			type        : 'text',
			style       : { width: '370px' },
			rules       : { required: t('settings:settings_field_required_text') },
		},
		{
			name        : 'pincode',
			label       : t('settings:billing_details_label_5'),
			placeholder : t('settings:billing_details_placeholder_8'),
			type        : 'async_select',
			asyncKey    : 'locations',
			params      : { filters: { type: ['pincode'] } },
			multiple    : false,
			labelKey    : 'postal_code',
			valueKey    : 'postal_code',
			style       : { width: '370px' },
			rules       : { required: t('settings:settings_field_required_text') },
		},
		{
			name        : 'tax_number',
			label       : `${REGISTRATION_LABEL} ${t('settings:billing_details_label_4')}`,
			placeholder : `${t('settings:billing_details_placeholder_9')} 
							${REGISTRATION_LABEL} ${t('settings:billing_details_label_4')}`,
			type  : 'text',
			style : { width: '370px' },
			rules : {
				required: t('settings:settings_field_required_text'),
			},
		},
		{
			name    : 'is_sez',
			label   : `${t('settings:billing_details_label_2')} ${REGISTRATION_LABEL}?`,
			type    : 'checkbox',
			options : [
				{
					label : t('settings:billing_details_sez_options_label'),
					value : true,
				},
			],
			style: { width: '370px' },
		},
		{
			name        : 'address',
			label       : t('settings:billing_details_label_3'),
			placeholder : t('settings:billing_details_placeholder_10'),
			type        : 'text',
			style       : { width: '370px' },
			rules       : {
				required: t('settings:settings_field_required_text'),
			},
		},
		{
			name        : 'poc_name',
			label       : t('settings:billing_details_label_7'),
			placeholder : t('settings:billing_details_placeholder_11'),
			type        : 'text',
			style       : { width: '370px' },
			rules       : { required: t('settings:settings_field_required_text') },
			mode        : 'poc',
		},
		{
			name        : 'phone_number',
			label       : t('settings:billing_details_label_8'),
			placeholder : t('settings:billing_details_placeholder_12'),
			type        : 'mobile_number',
			inputType   : 'number',
			select2     : 'new',
			style       : { width: '200px' },
			options     : country_code,
			rules       : {
				required : t('settings:settings_field_required_text'),
				validate : (value) => (value?.country_code && value?.number ? undefined : 'Phone Number'),
			},
			mode: 'poc',
		},
		{
			name        : 'poc_email',
			label       : t('settings:billing_details_label_9'),
			placeholder : t('settings:billing_details_placeholder_13'),
			type        : 'text',
			style       : { width: '370px' },
			rules       : { required: t('settings:settings_field_required_text') },
			mode        : 'poc',
		},
		{
			name  : 'sez_proof',
			label : `${ECO_ZONE_LABEL} ${t('settings:billing_details_label_10')}`,
			type  : 'file',
			drag  : true,
			style : { width: '370px' },
			rules : {
				required: t('settings:settings_field_required_text'),
			},
		},
		{
			name  : 'tax_number_document_url',
			label : `${REGISTRATION_LABEL} ${t('setting:billing_details_label_6')}`,
			type  : 'file',
			style : { width: '370px' },
			rules : {
				required: t('settings:settings_field_required_text'),
			},
		},
	];

	return (fields || []).map((control) => {
		const { name } = control;
		let newControl = { ...control };

		if (name === 'pincode') {
			newControl = { ...newControl, ...cityPincode };
		}
		return { ...newControl };
	});
};

export default getBillingAddressControls;
