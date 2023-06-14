const commodityControls = [
	{
		name               : 'hscode',
		label              : 'HS Code',
		type               : 'async_select',
		asyncKey           : 'six_digit_hs_code',
		placeholder        : 'Enter HS Code or Commodity',
		initialCall        : true,
		rules              : { required: 'Please Select Commodity' },
		getModifiedOptions : (data) => (data || []).map((info) => ({
			...info,
			value : info?.id,
			label : (
				<div>
					{info?.hsCode}
					{' '}
					-
					{' '}
					{info?.description}
				</div>
			),
		})),
	},
];
export default commodityControls;
