const fclCustomsControls = () => (
	[
		{
			label          : 'HS Code for the commodity',
			name           : 'hs_code',
			type           : 'async_select',
			caret          : true,
			defaultOptions : true,
			asyncKey       : 'hs_codes',
			valueKey       : 'label',
			span           : 6,
		},
		{
			label : 'Commodity detail',
			name  : 'commodity_description',
			type  : 'text',
			span  : 6,
			show  : true,
			rules : [
				{ required: 'Required', minLength: 5 },
			],
		},
		{
			name            : 'dpd_license',
			span            : 12,
			type            : 'file',
			themeType       : 'secondary',
			onlyURLOnChange : true,
			drag            : true,
			uploadIcon      : 'ic-upload',
			label           : 'DPD license',
			accept          : 'image/*,.pdf,.doc,.docx,application/msword,'
			+ 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
			uploadType : 'aws',
			condition  : {
				services            : ['fcl_customs'],
				cargo_handling_type : ['direct_port_delivery'],
				trade_type          : ['import'],
			},
		},

		{
			name            : 'factory_clearance_license',
			span            : 12,
			type            : 'file',
			themeType       : 'secondary',
			onlyURLOnChange : true,
			drag            : true,
			uploadIcon      : 'ic-upload',
			label           : 'Factory clearance license for destination',
			accept          : 'image/*,.pdf,.doc,.docx,application/msword,'
			+ 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
			uploadType : 'aws',
			condition  : {
				cargo_handling_type: ['stuffing_at_factory',
					'destuffing_at_dock', 'delivery_from_dock'],
			},
		},

	]
);

export default fclCustomsControls;
