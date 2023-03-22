const fclCfcControls = () => (
	[
		{
			label          : 'HS Code for the commodity',
			name           : 'hs_code',
			type           : 'select',
			caret          : true,
			defautOptions  : true,
			valueKey       : 'label',
			optionsListKey : 'hs_codes',
			span           : 6,
		},
		{
			label : 'Commodity detail',
			name  : 'commodity_description',
			type  : 'text',
			span  : 6,
			show  : true,
			rules : { required: 'Required', minLength: 5 },
		},
		{
			label : 'Cargo Weight per Container (in metric tonnes)',
			name  : 'cargo_weight_per_container',
			type  : 'number',
			span  : 6,
			show  : true,
		},
		{
			name            : 'dpd_license',
			span            : 12,
			type            : 'file',
			themeType       : 'secondary',
			onlyURLOnChange : true,
			drag            : true,
			uploadIcon      : 'ic-upload',
			condition       : { have_dpd_code: 'dpd' },
			label           : 'DPD license',
			accept          : 'image/*,.pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
			uploadType      : 'aws',
		},
		{
			name            : 'factory_clearance_license',
			span            : 12,
			type            : 'file',
			themeType       : 'secondary',
			onlyURLOnChange : true,
			drag            : true,
			uploadIcon      : 'ic-upload',
			label           : 'Factory clearance license',
			accept          : 'image/*,.pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
			uploadType      : 'aws',
		},
		{
			label : 'Preferred CFS',
			name  : 'preferred_cfs',
			type  : 'text',
			span  : 6,
			show  : true,
			rules : { required: 'This is required' },

		},
	]
);
export default fclCfcControls;
