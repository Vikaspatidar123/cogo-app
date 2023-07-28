const getOrganizationControls = ({ importer_exporter_id }) => {
	const organizationControls = [
		{
			type        : 'async_select',
			name        : 'importer_exporter_branch_id',
			label       : 'Select Branch',
			asyncKey    : 'organization-branches',
			initialCall : true,
			span        : 6,
			params      : {
				filters: {
					organization_id : importer_exporter_id,
					status          : 'active',
				},
			},
			rules        : { required: true },
			cacheOptions : false,
		},
		{
			type        : 'async_select',
			name        : 'user_id',
			label       : 'Select User',
			asyncKey    : 'organization_users',
			initialCall : true,
			valueKey    : 'user_id',
			labelKey    : 'name',
			span        : 6,
			params      : {
				filters: {
					organization_id : importer_exporter_id,
					status          : 'active',
				},
			},
			rules        : { required: true },
			cacheOptions : false,
		},
	];

	const cargoControls = [
		{
			type  : 'textarea',
			name  : 'cargo_description',
			label : 'Cargo Description',
			span  : 12,
		},
	];

	return {
		organizationControls, cargoControls,
	};
};

export default getOrganizationControls;
