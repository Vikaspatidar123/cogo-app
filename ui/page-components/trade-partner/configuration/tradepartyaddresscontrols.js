/* eslint-disable import/no-unresolved */
import { getByKey } from '@cogoport/utils';

import styles from '../components/Tradepartner/styles.module.css';

import data from '@/.data-store/constants/countries.json';
import patterns from '@/ui/commons/configurations/patterns';

const country = data?.map((item) => ({
	label: (
		<div className={styles.country}>
			<img src={item.flag_icon_url ? item.flag_icon_url : 'https://via.placeholder.com/24x20'} alt={item.name} />
			<div className={styles.country_name}>{item.name}</div>
		</div>
	),
	value: item.id,
}));

const getControls = ({
	countryInfo,
	stateInfo,
	setCountryInfo,
	setStateInfo,
	setCityInfo,
	tradePartyDetails,
	t,
}) => {
	const controls = [
		{
			label            : t('tradePartner:add_trade_partner_control_label_1'),
			name             : 'partyName',
			type             : 'text',
			placeholder      : t('tradePartner:add_trade_partner_control_placeholder_1'),
			valueKey         : 'business_name',
			noOptionsMessage : 'Type to search...',
		},
		{
			name        : 'pocName',
			label       : t('tradePartner:add_trade_partner_control_label_2'),
			type        : 'text',
			placeholder : t('tradePartner:add_trade_partner_control_placeholder_2'),
			rules       : { required: t('tradePartner:add_trade_partner_rules_required') },
		},
		{
			label       : t('tradePartner:add_trade_partner_control_label_3'),
			name        : 'email',
			type        : 'text',
			placeholder : t('tradePartner:add_trade_partner_control_placeholder_3'),
			style       : { height: '42px' },
			rules       : {
				required : t('tradePartner:add_trade_partner_rules_required'),
				pattern  : {
					value   : patterns.EMAIL,
					message : t('tradePartner:add_trade_partner_control_invalid_email_address'),
				},
			},
		},
		{
			label       : t('tradePartner:add_trade_partner_control_label_4'),
			name        : 'taxNumber',
			type        : 'text',
			placeholder : t('tradePartner:add_trade_partner_control_placeholder_4'),
		},
		{
			label       : t('tradePartner:add_trade_partner_control_label_5'),
			name        : 'phoneNumber',
			type        : 'mobile-select',
			placeholder : t('tradePartner:add_trade_partner_control_placeholder_5'),
			rules       : {
				required : t('tradePartner:add_trade_partner_rules_required'),
				pattern  : {
					value   : patterns.MOBILE,
					message : t('tradePartner:add_trade_partner_control_invalid_phone_number'),
				},
			},
		},
		{
			label       : t('tradePartner:add_trade_partner_control_label_6'),
			name        : 'countryId',
			type        : 'select',
			placeholder : t('tradePartner:add_trade_partner_control_placeholder_6'),
			rules       : { required: t('tradePartner:add_trade_partner_rules_required') },
			options     : country,
		},
		{
			label       : t('tradePartner:add_trade_partner_control_label_7'),
			name        : 'addLine',
			type        : 'text',
			placeholder : t('tradePartner:add_trade_partner_control_placeholder_7'),
			rules       : { required: t('tradePartner:add_trade_partner_rules_required') },
		},
		{
			label       : t('tradePartner:add_trade_partner_control_label_8'),
			name        : 'pincode',
			type        : 'text',
			placeholder : t('tradePartner:add_trade_partner_control_placeholder_8'),
			style       : { height: '40px' },
		},
		{
			label       : t('tradePartner:add_trade_partner_control_label_9'),
			name        : 'state',
			type        : 'async_select',
			placeholder : t('tradePartner:add_trade_partner_control_placeholder_9'),
			asyncKey    : 'locations',
		},
		{
			label          : t('tradePartner:add_trade_partner_control_label_10'),
			name           : 'city',
			type           : 'async_select',
			placeholder    : t('tradePartner:add_trade_partner_control_placeholder_10'),
			asyncKey       : 'locations',
			defaultOptions : true,
		},
	];
	return controls.map((control) => {
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
};

export default getControls;
