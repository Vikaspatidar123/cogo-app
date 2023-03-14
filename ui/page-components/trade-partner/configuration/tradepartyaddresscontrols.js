/* eslint-disable import/no-unresolved */
import { getByKey } from '@cogoport/utils';

import styles from '../components/Tradepartner/styles.module.css';

import data from '@/data-store/constants/countries.json';

// eslint-disable-next-line max-len
const emailValidator =	/^[^<>()[\]\\,;:%#^\s@"$&!@]+@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z0-9]+\.)+[a-zA-Z]{2,}))$/;

const mobileValidator = /^[0-9]{10}$/;

const country = data?.map((item) => ({
	label: (
		<div className={styles.country}>
			<img src={item.flag_icon_url ? item.flag_icon_url : 'https://via.placeholder.com/24x20'} alt={item.name} />
			<div className={styles.country_name}>{item.name}</div>
		</div>
	),
	value: item.id,
}));

const controls = [
	{
		label            : 'Trading Party Name',
		name             : 'partyName',
		type             : 'text',
		placeholder      : 'Enter Trading Party Name',
		valueKey         : 'business_name',
		noOptionsMessage : 'Type to search...',
	},
	{
		name        : 'pocName',
		label       : 'POC Name *',
		type        : 'text',
		placeholder : 'Enter POC Name',
		rules       : { required: true },
	},
	{
		label       : 'Email Id *',
		name        : 'email',
		type        : 'text',
		placeholder : 'Enter Email Id',
		style       : { height: '42px' },
		rules       : {
			required : true,
			pattern  : {
				value   : emailValidator,
				message : 'Invalid email address',
			},
		},
	},
	{
		label       : 'Tax Number',
		name        : 'taxNumber',
		type        : 'text',
		placeholder : 'Enter Tax Number',
	},
	{
		label       : 'Phone Number *',
		name        : 'phoneNumber',
		type        : 'mobile-select',
		placeholder : 'Enter Phone Number',
		rules       : {
			required : true,
			pattern  : {
				value   : mobileValidator,
				message : 'Invalid phone number',
			},
		},
	},
	{
		label       : 'Country *',
		name        : 'countryId',
		type        : 'select',
		placeholder : 'Enter Country',
		rules       : { required: true },
		options     : country,
	},
	{
		label       : 'Address line *',
		name        : 'addLine',
		type        : 'text',
		placeholder : 'Enter Address',
		rules       : { required: true },
	},
	{
		label       : 'Pincode',
		name        : 'pincode',
		type        : 'text',
		placeholder : 'Enter Pincode',
		style       : { height: '40px' },
	},
	{
		label          : 'State (optional)',
		name           : 'state',
		type           : 'select',
		placeholder    : 'Enter State',
		optionsListKey : 'locations',
	},
	{
		label          : 'City (optional)',
		name           : 'city',
		type           : 'select',
		placeholder    : 'Enter City',
		optionsListKey : 'locations',
		defaultOptions : true,
	},
];

const getControls = ({
	countryInfo,
	stateInfo,
	setCountryInfo,
	setStateInfo,
	setCityInfo,
	tradePartyDetails,
}) => controls.map((control) => {
	if (control.name === 'phoneNumber') {
		return {
			...control,
			value: {
				country_code : `+${tradePartyDetails?.phoneCode}`,
				number       : tradePartyDetails?.phoneNumber,
			},
		};
	}
	if (control.name === 'addLine') {
		return {
			...control,
			value: tradePartyDetails?.address,
		};
	}
	if (control.name === 'country') {
		return {
			...control,
			value        : tradePartyDetails?.countryId,
			handleChange : (e) => {
				setCountryInfo(e);
			},
		};
	}
	if (control.name === 'state') {
		return {
			...control,
			disabled : !countryInfo,
			value    : tradePartyDetails?.stateId,
			params   : {
				filters: { type: 'region', country_id: countryInfo?.id },
			},
			handleChange: (e) => {
				setStateInfo(e);
			},
		};
	}
	if (control.name === 'city') {
		return {
			...control,
			disabled : !stateInfo,
			params   : {
				filters: { type: 'city', region_id: stateInfo?.id },
			},
			value        : tradePartyDetails?.cityId,
			handleChange : (e) => {
				setCityInfo(e);
			},
		};
	}
	return {
		...control,
		value: getByKey(tradePartyDetails, control.name),
	};
});

export default getControls;
