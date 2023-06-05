import { Pill } from '@cogoport/components';
import { IcCCompleteJourney } from '@cogoport/icons-react';

import styles from '../components/Details/CargoDetails/styles.module.css';
import { INCOTERMOPTIONS } from '../constants/incotermOptions';

const get = (formObject = {}, key = '') => formObject[key] || null;

const controls = [
	{
		name               : 'policyCommodityId',
		placeholder        : 'Commodity',
		asyncKey           : 'commodities_list_insurance',
		defaultOptions     : true,
		type               : 'async_select',
		getModifiedOptions : (options) => (options || []).map((x) => ({
			...x,
			value: x.id,
			label:
	<>
		<div>{x.commodity}</div>
		<div>
			(
			{x.subCommodity}
			)
		</div>
	</>,
		})),
	},
	{
		name               : 'policyCountryId',
		placeholder        : 'Country',
		type               : 'async_select',
		asyncKey           : 'insurance_country_list',
		getModifiedOptions : (options = []) => (options || []).map((x) => ({
			...x,
			value: x.locationId,
			label:
	<div className={styles.country_flag_options}>
		{x.countryFlagIcon ? <img src={x.countryFlagIcon} alt="cogo" /> : <IcCCompleteJourney />}
		<div>{x.countryName}</div>
		{x?.countryType === 'BLOCKED' && (
			<Pill color="red">{x?.countryType}</Pill>
		)}
	</div>,
		})),
		initialCall: true,
	},
	{
		name        : 'incoterm',
		placeholder : 'Inco Term',
		type        : 'select',
		options     : [
			{ label: 'FOB - Free On Board', value: 'FOB' },
			{ label: 'EXW - Ex Works', value: 'EXW' },
			{ label: 'FCA - Free Carrier', value: 'FCA' },
			{ label: 'FAS - Free Alongside Ship', value: 'FAS' },
			{ label: 'CIF - Cost, Insurance and Freight', value: 'CIF' },
			{ label: 'CFR - Cost and Freight', value: 'CFR' },
			{ label: 'CPT - Carriage Paid To', value: 'CPT' },
			{ label: 'CIP - Carriage and Insurance Paid to', value: 'CIP' },
			{ label: 'DAT - Delivered At Terminal', value: 'DAT' },
			{ label: 'DAP - Delivered At Place', value: 'DAP' },
			{ label: 'DDP - Delivered Duty Paid', value: 'DDP' },
		],
	},
	{
		name        : 'cargoDescription',
		placeholder : 'Cargo Description',
		type        : 'text',
	},
	{
		name        : 'packaging',
		placeholder : 'Packaging Description',
		type        : 'text',
	},
	{
		name        : 'transitDate',
		placeholder : 'Transit Start Date',
		type        : 'datepicker',
		minDate     : new Date(Date.now() + 24 * 60 * 60 * 1000),
		maxDate     : new Date().setDate(new Date().getDate() + 31),
	},
	{
		name        : 'locationFrom',
		placeholder : 'Coverage From',
		type        : 'text',
		tooltip     : 'Insurance coverage starts from place',
	},
	{
		name        : 'locationTo',
		placeholder : 'Coverage To',
		type        : 'text',
		tooltip     : 'Insurance coverage ends to place',
	},
	{
		name        : 'riskCoverage',
		placeholder : 'Coverage',
		type        : 'select',
		value       : 'ALL_RISK',
		options     : [
			{
				label : 'All Risk',
				value : 'ALL_RISK',
			},
		],
	},
];

const getControls = ({
	setCommodityName = () => {},
	activeTab = '',
	formDetails = {},
	setDescription = () => {},
	transitType = '',
	setCountryCode = () => {},
	setCountryDetails = () => {},
}) => controls.map((control) => {
	if (control.name === 'policyCommodityId') {
		return {
			...control,
			handleChange: (e) => {
				setDescription(e);
				setCommodityName(e?.commodity);
			},
		};
	}

	if (control.name === 'policyCountryId') {
		return {
			...control,
			placeholder  : activeTab === 'IMPORT' ? 'Origin Country' : 'Destination Country',
			handleChange : (e) => {
				setCountryDetails({
					checkSantion      : e?.countryType,
					sanctionedCountry : e?.countryName,
				});
				setCountryCode(e?.countryCode);
			},
			params: {
				transitMode: transitType === 'Ocean' ? 'SEA' : transitType?.toUpperCase() || '',
			},
		};
	}
	if (control.name === 'incoterm') {
		return {
			...control,
			options: activeTab === 'IMPORT'
				? INCOTERMOPTIONS.filter((option) => option.value !== 'CIF')
				: INCOTERMOPTIONS,
		};
	}

	return {
		...control,
		value: get(formDetails, control.name),
	};
});

export default getControls;
