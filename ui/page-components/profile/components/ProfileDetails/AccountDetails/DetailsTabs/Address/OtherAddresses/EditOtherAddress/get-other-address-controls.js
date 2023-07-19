/* eslint-disable import/no-unresolved */
import styles from './styles.module.css';

import data from '@/.data-store/constants/countries.json';

const country_code = data?.map((x) => ({
	label : x.mobile_country_code,
	value : x.mobile_country_code,
}));
const country = data?.map((item) => ({
	label: (
		<div className={styles.country}>
			<img
				src={
				item.flag_icon_url
					? item.flag_icon_url
					: 'https://via.placeholder.com/24x20'
				}
				alt={item.name}
			/>
			<div className={styles.country_name}>{item.name}</div>
		</div>
	),
	value: item.id,
}));

const getOtherAddressControls = ({ cityPincode = {}, t }) => {
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
			name        : 'country_id',
			label       : t('settings:billing_details_label_11'),
			placeholder : t('settings:billing_details_placeholder_15'),
			type        : 'select',
			style       : { width: '370px' },
			rules       : { required: t('settings:settings_field_required_text') },
			options     : country,
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
		},
		{
			name        : 'poc_email',
			label       : t('settings:billing_details_label_9'),
			placeholder : t('setings:billing_details_placeholder_13'),
			type        : 'text',
			style       : { width: '370px' },
			rules       : { required: t('settings:settings_field_required_text') },
		},
		{
			name        : 'phone_number',
			label       : t('settings:billing_details_label_8'),
			placeholder : t('settings:billing_details_placeholder_12'),
			type        : 'mobile_number',
			inputType   : 'number',
			select2     : 'new',
			style       : { width: '210px' },
			options     : country_code,
			rules       : {
				required : t('settings:settings_field_required_text'),
				validate : (value) => (value?.country_code && value?.number ? undefined : 'Phone Number'),
			},
		},
	];

	return fields.map((control) => {
		const { name } = control;
		let newControl = { ...control };

		if (name === 'pincode') {
			newControl = { ...newControl, ...cityPincode };
		}
		return { ...newControl };
	});
};

export default getOtherAddressControls;
