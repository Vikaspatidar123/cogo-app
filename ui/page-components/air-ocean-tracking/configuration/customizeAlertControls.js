const ASYNC_KEY_MAPPING = {
	ocean : 'list_ocean_poc_details',
	air   : 'list_air_poc_details',
};

const customizeAlertControls = ({ branch_id = '', activeTab = 'ocean' }) => [
	{
		name        : 'contactName',
		type        : 'async_select',
		placeholder : 'Select Contact',
		multiple    : true,
		isClearable : true,
		initialCall : true,
		asyncKey    : ASYNC_KEY_MAPPING[activeTab],
		params      : {
			organization_branch_id: branch_id,
		},
		getModifiedOptions: (data) => (data || []).map((item) => ({
			...item,
			value : item?.id,
			label : (
				<div>
					{`${item?.name} - ${item?.email}`}
				</div>
			),
		})),
		rules: { required: 'Please Select Contact' },
	},
];

export default customizeAlertControls;
