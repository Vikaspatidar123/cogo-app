import getRegistrationNumberControl from './getRegistrationNumberControl';
import { LanguageOptions } from './preferredCountries';

const getControls = ({
	cityOptions = {},
	t = () => {},
}) => {
	const fields = [{
		name        : 'country_id',
		label       : 'Country',
		type        : 'select',
		placeholder : t('getStarted:rightPanel_get_started_organizationForm_country_select_placeholder'),
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
		rules: { required: t('getStarted:rightPanel_get_started_organizationForm_country_required_rule') },
	},
	{ ...getRegistrationNumberControl({ }) },
	{
		label       : t('getStarted:rightPanel_get_started_organizationForm_company_name_placeholder'),
		name        : 'business_name',
		type        : 'Input',
		placeholder : t('getStarted:rightPanel_get_started_organizationForm_company_name_placeholder'),
		rules       : { required: t('getStarted:rightPanel_get_started_organizationForm_company_required_rule') },
	},
	{
		name          : 'work_scopes',
		label         : t('getStarted:rightPanel_get_started_organizationForm_role_label'),
		type          : 'select',
		placeholder   : t('getStarted:rightPanel_get_started_organizationForm_role_label'),
		multiple      : true,
		autoCloseMenu : false,
		rules         : { required: t('getStarted:rightPanel_get_started_organizationForm_role_is_required_rule') },
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
		label         : t('getStarted:rightPanel_get_started_organizationForm_preferred_languages_label'),
		name          : 'preferred_languages',
		type          : 'multiSelect',
		options       : LanguageOptions,
		placeholder   : t('getStarted:rightPanel_get_started_organizationForm_preferred_languages_label'),
		multiple      : true,
		autoCloseMenu : false,
		rules         : { required: t('rightPanel_get_started_organizationForm_preferred_languages_required') },
	}];

	return fields.map((control) => {
		const { name } = control;
		let newControl = { ...control };

		if (name === 'country_id') {
			newControl = { ...newControl, ...cityOptions };
		}
		return { ...newControl };
	});
};

export default getControls;
