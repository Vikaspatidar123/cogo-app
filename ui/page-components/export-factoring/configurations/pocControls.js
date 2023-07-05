import { startCase } from '@cogoport/utils';

const getUserWork = (workscope) => {
	if (workscope.includes('in')) { return startCase(workscope.split('_in_')?.[1]?.replaceAll('_', ' ')); }
	return startCase(workscope.split('_am_')?.[1]?.replaceAll('_', ' '));
};

const getModifiedOptionsForOrgUsers = (options) => (options || []).map((x) => ({
	...x,
	value: x?.id,
	label:
	<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
		<div>
			{x?.name}
			-
			{(x?.work_scopes || []).map((work) => (work ? `${getUserWork(work)}/` : ''))}
		</div>
	</div>,
}));

export const POCControls = [

	{
		label              : '',
		name               : 'user',
		type               : 'async_select',
		placeholder        : 'Select user',
		section            : 'poc',
		isAccordian        : true,
		showField          : true,
		initialCall        : true,
		asyncKey           : 'organization_users',
		labelKey           : 'label',
		valueKey           : 'name',
		getModifiedOptions : getModifiedOptionsForOrgUsers,
		rules              : { required: 'Required' },
	},
	{
		name        : 'designation',
		label       : 'Designation',
		placeholder : 'Enter Designation',
		type        : 'select',
		showLabel   : false,
		options     : [
			{
				label : 'Owner',
				value : 'owner',
			},
			{
				label : 'Financial Head',
				value : 'financial_head',
			},
			{
				label : 'Logistics Head',
				value : 'logistics_head',
			},
			{
				label : 'Expo Head',
				value : 'expo_head',
			},
			{
				label : 'Ops Head',
				value : 'ops_head',
			},
			{
				label : 'Proprietorship',
				value : 'proprietorship',
			},
			{
				label : 'Director',
				value : 'director',
			},
			{
				label : 'Partner',
				value : 'partner',
			},
			{
				label : 'MD',
				value : 'md',
			},
			{
				label : 'CEO',
				value : 'ceo',
			},
			{
				label : 'CFO',
				value : 'cfo',
			},
			{
				label : 'Other',
				value : 'other',
			},
		],
		rules: {
			required: true,
		},
	},
];

export const getControls = ({ setPOCDetails = () => {}, getPocStatus = () => {} }) => POCControls.map((control) => ({
	...control,
	handleChange: (e) => setPOCDetails((prev) => ({
		...prev,
		[control.name]: e,
	})),
	disabled: getPocStatus(control.name) === 'completed',
}));
