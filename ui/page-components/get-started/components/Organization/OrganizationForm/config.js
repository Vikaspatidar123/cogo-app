import getRegistrationNumberControl from './getRegistrationNumberControl';
import { LanguageOptions } from './preferredCountries';

const fields = [{
	name        : 'country_id',
	label       : 'Country',
	type        : 'select',
	placeholder : 'Select country',
	condition   : {
		type: [
			'city',
			'seaport',
			'airport',
			'pincode',
			'cfs',
			'cluster',
			'region',
			'yard',
			'railway_terminal',
			'warehouse',
		],
	},
	rules: { required: 'Country is required' },
},
{ ...getRegistrationNumberControl({ }) },
{
	label       : 'Company Name',
	name        : 'business_name',
	type        : 'Input',
	placeholder : 'Company Name',
	span        : 12,
	rules       : { required: 'Company is required' },
},
{
	name          : 'work_scopes',
	label         : 'Role in Company',
	type          : 'select',
	placeholder   : 'Role in Company',
	multiple      : true,
	autoCloseMenu : false,
	span          : 12,
	rules         : { required: 'Role is required' },
	options       : [
		{
			label : 'Partner/Owner/Director',
			value : 'i_am_owner',
		},
		{
			label : 'Finance Head',
			value : 'i_am_finance_head',
		},
		{
			label : 'Finance Team Member',
			value : 'i_work_in_finance',
		},
		{
			label : 'Marketing/Sales',
			value : 'i_work_in_marketing_and_sales',
		},
		{
			label : 'Procurement',
			value : 'i_work_in_procurement',
		},
		{
			label : 'Operations',
			value : 'i_work_in_operations',
		},
		{
			label : 'Logistics Manager',
			value : 'i_am_logistics_manager',
		},
		{
			label : 'Other',
			value : 'other',
		},
	],
},
{
	label         : 'Preferred Languages',
	name          : 'preferred_languages',
	type          : 'multiSelect',
	options       : LanguageOptions,
	placeholder   : 'Preferred Language',
	multiple      : true,
	autoCloseMenu : false,
	span          : 12,
	rules         : { required: 'Language is required' },
}];

const getControls = ({
	cityOptions = {},
	formValues = {},
}) => fields.map((control) => {
	const { name } = control;
	let newControl = { ...control };

	if (name === 'country_id') {
		newControl = { ...newControl, ...cityOptions };
	}
	return { ...newControl };
});

export default getControls;
