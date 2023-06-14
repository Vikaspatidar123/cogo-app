const customizeAlertControls = ({ branch_id }) => [
	{
		name        : 'contactName',
		type        : 'async_select',
		placeholder : 'Select Contact',
		multiple    : true,
		isClearable : true,
		initialCall : true,
		asyncKey    : 'list_poc_details',
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
