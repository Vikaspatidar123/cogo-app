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

const fields = [
	{
		name        : 'name',
		label       : 'Billing Party Name',
		placeholder : 'Enter Name',
		type        : 'text',
		style       : { width: '370px' },
	},
	{
		name           : 'pincode',
		label          : 'Pincode',
		placeholder    : 'Select Pincode',
		type           : 'select',
		optionsListKey : 'locations',
		params         : { filters: { type: ['pincode'] } },
		multiple       : false,
		labelKey       : 'postal_code',
		valueKey       : 'postal_code',
		style          : { width: '370px' },
		rules          : { required: 'Required' },
	},
	{
		name        : 'country_id',
		label       : 'Country',
		placeholder : 'Select Country',
		type        : 'select',
		style       : { width: '370px' },
		rules       : { required: 'Required' },
		options     : country,
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
	},

	{
		name        : 'poc_email',
		label       : 'POC Email		',
		placeholder : 'Enter POC Email',
		type        : 'text',
		style       : { width: '370px' },
		rules       : { required: true },
	},
	{
		name        : 'phone_number',
		label       : 'POC Mobile Number',
		placeholder : 'Enter Mobile Number',
		type        : 'mobile_number',
		inputType   : 'number',
		select2     : 'new',
		style       : { width: '210px' },
		options     : country_code,
		rules       : {
			required : true,
			validate : (value) => (value?.country_code && value?.number ? undefined : 'Phone Number'),
		},
	},
];

const getOtherAddressControls = ({ cityPincode = {} }) => fields.map((control) => {
	const { name } = control;
	let newControl = { ...control };

	if (name === 'pincode') {
		newControl = { ...newControl, ...cityPincode };
	}
	return { ...newControl };
});

export default getOtherAddressControls;
