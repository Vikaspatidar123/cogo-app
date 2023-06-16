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
		name               : 'owner',
		type               : 'async_select',
		placeholder        : 'Owner',
		section            : 'poc',
		isAccordian        : true,
		showField          : true,
		initialCall        : true,
		asyncKey           : 'organization_users',
		labelKey           : 'label',
		valueKey           : 'name',
		getModifiedOptions : getModifiedOptionsForOrgUsers,
	},
	{
		label              : '',
		name               : 'financial_head',
		type               : 'async_select',
		placeholder        : 'Finance Head',
		section            : 'poc',
		isAccordian        : true,
		showField          : true,
		initialCall        : true,
		asyncKey           : 'organization_users',
		labelKey           : 'label',
		valueKey           : 'name',
		getModifiedOptions : getModifiedOptionsForOrgUsers,
	},
	{
		label              : '',
		name               : 'logistics_head',
		type               : 'async_select',
		placeholder        : 'Logistics Head',
		section            : 'poc',
		isAccordian        : true,
		showField          : true,
		initialCall        : true,
		asyncKey           : 'organization_users',
		labelKey           : 'label',
		valueKey           : 'name',
		getModifiedOptions : getModifiedOptionsForOrgUsers,
	},
];

export const getControls = ({ setPOCDetails = () => {}, getPocStatus = () => {} }) => POCControls.map((control) => {
	if (['owner', 'financial_head', 'logistics_head'].includes(control.name)) {
		return {
			...control,
			handleChange: (e) => setPOCDetails((prev) => ({
				...prev,
				[control.name]: e,
			})),
			disabled: getPocStatus(control.name) === 'completed',
		};
	}
	return control;
});
