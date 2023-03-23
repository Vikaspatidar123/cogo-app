import getEntityOptions from '@cogo/globalization/utils/getEntityOptions';

const getControls = (location = {}) => {
	const { origin = {} } = location;
	const { country_id = '' } = origin;
	const geo = getEntityOptions({ country_id });

	const controls = [
		{
			name: 'trucks',
			type: 'fieldArray',
			span: 12,
			buttonText: 'Add More',
			noDeleteButtonTill: 1,
			value: [
				{
					truck_type: '',
					trucks_count: '',
				},
			],
			controls: [
				{
					name: 'truck_type',
					label: 'Truck Type',
					type: 'select',
					span: 7,
					rules: {
						required: true,
					},
					style: {
						menu: {
							left: 0,
							background: 'white',
							boxShadow: '0 4px 80px rgba(0, 0, 0, 0.15)',
							borderRadius: 10,
							zIndex: 99999,
							width: 244,
						},
					},
					options: [
						{
							label: 'Open Body',
							options: geo.options.open_truck || [],
						},
						{
							label: 'Closed Body',
							options: geo.options.closed_truck || [],
						},
					],
				},
				{
					name: 'trucks_count',
					label: 'Truck Count',
					type: 'number',
					span: 5,
					rules: { required: true },
				},
			],
		},
	];
	return controls;
};

export default getControls;
