import { addDays } from '@cogoport/utils';

const SPECIAL_CONSIDERATION = ['dangerous', 'temp_controlled', 'other_special'];

export const airControls = (scope, trade_type, airlineOptions) => {
	const controls = [
		{
			name           : 'airline_id',
			label          : 'Choose an Airline',
			type           : 'async_select',
			asyncKey       : 'air-lines',
			defaultOptions : airlineOptions,
			className      : 'primary sm',
			placeholder    : 'Choose an Airline',
			caret          : true,
			span           : 6,
			rules          : { required: 'Required' },
		},
		{
			label       : 'Departure',
			name        : 'departure',
			type        : 'datepicker',
			placeholder : 'Departure',
			className   : 'primary sm',
			minDate     : addDays(new Date(), 1),
			span        : 6,
			rules       : { required: 'Required' },
		},
		{
			name        : 'arrival',
			label       : 'Arrival',
			placeholder : 'Arrival',
			minDate     : addDays(new Date(), 1),
			className   : 'primary sm',
			type        : 'datepicker',
			span        : 6,
			rules       : { required: 'Required' },
		},
		{
			name        : 'number_of_stops',
			label       : 'Number of Stops',
			type        : 'number',
			placeholder : 'Enter number of stops',
			className   : 'primary sm',
			span        : 6,
			rules       : { required: 'Required', min: 0 },
		},
		{
			label     : 'Select Suitable Schedules',
			name      : 'suitable_schedule',
			type      : 'pills',
			className : 'primary sm',
			span      : 12,
			options   : [],
			rules     : { required: 'Required' },
		},
	];

	if (trade_type !== 'domestic') {
		controls.push({
			name            : 'msds_certificate',
			span            : 12,
			type            : 'file',
			themeType       : 'secondary',
			onlyURLOnChange : true,
			drag            : true,
			uploadIcon      : 'ic-upload',
			label           : 'Upload MSDS certificate',
			className       : 'primary sm',
			accept:
                'image/*,.pdf,.doc,.docx,application/msword'
                + ',application/vnd.openxmlformats-officedocument.wordprocessingml.document',
			uploadType : 'aws',
			condition  : { is_haz: true },
			rules      : { required: 'Document is required' },
		});

		controls.push({
			name            : 'packing_list',
			span            : 12,
			type            : 'file',
			themeType       : 'secondary',
			onlyURLOnChange : true,
			drag            : true,
			uploadIcon      : 'ic-upload',
			className       : 'primary sm',
			label           : 'Upload Packing List',
			accept:
                'image/*,.pdf,.doc,.docx,application/msword'
                + ',application/vnd.openxmlformats-officedocument.wordprocessingml.document',
			uploadType : 'aws',
			condition  : { is_haz: true },
			rules      : { required: 'Document is required' },
		});
	}

	if (scope === 'app') {
		controls.push({
			label       : 'Cargo Readiness Date',
			name        : 'cargo_readiness_date',
			type        : 'datepicker',
			className   : 'primary sm',
			placeholder : 'Date',
			span        : 6,
			rules       : { required: 'Required' },
		});
	}
	return controls;
};

export const fclControls = (
	wayToBook,
	scope,
	data = {},
	spotBookingDefaultShippingLines = [],
	manualSelect = false,
) => {
	const { origin_country_id, destination_country_id } = data || {};

	const controls = [
		{
			name           : 'shipping_line_id',
			label          : 'Shipping Line',
			className      : 'primary sm',
			placeholder    : 'Select Shipping Line',
			type           : 'async_select',
			asyncKey       : 'shipping-lines',
			defaultOptions : spotBookingDefaultShippingLines || true,
			caret          : true,
			span           : 6,
			rules          : { required: 'Required' },
		},
		{
			name      : 'origin_main_port_id',
			label     : 'Via Origin Main Port',
			type      : 'async_select',
			asyncKey  : 'locations',
			className : 'primary sm',
			params    : {
				filters: {
					type       : ['seaport'],
					country_id : origin_country_id,
					is_icd     : false,
				},
			},
			caret    : true,
			multiple : false,
			rules    : { required: 'Required' },
		},
		{
			name      : 'destination_main_port_id',
			label     : 'Via Destination Main Port',
			type      : 'async_select',
			asyncKey  : 'locations',
			className : 'primary sm',
			params    : {
				filters: {
					type       : ['seaport'],
					country_id : destination_country_id,
					is_icd     : false,
				},
			},
			caret    : true,
			multiple : false,
			rules    : { required: 'Required' },
		},
		{
			label        : 'Select Suitable Schedule',
			name         : 'suitable_schedule',
			type         : 'select',
			className    : 'primary sm',
			placeholder  : 'Select Suitable Schedules',
			span         : 6,
			disabled     : manualSelect,
			options      : [],
			showOptional : false,
			rules        : { required: !manualSelect },
		},
		{
			label       : 'Departure',
			name        : 'departure',
			type        : 'datepicker',
			placeholder : 'Departure',
			className   : 'primary sm',
			minDate:
                wayToBook === 'spot_booking' ? addDays(new Date(), 4) : addDays(new Date(), 1),
			span  : 6,
			rules : { required: 'Required' },
		},
		{
			name        : 'arrival',
			label       : 'Arrival',
			placeholder : 'Arrival',
			minDate:
                wayToBook === 'spot_booking' ? addDays(new Date(), 4) : addDays(new Date(), 1),
			type      : 'datepicker',
			className : 'primary sm',
			span      : 6,
			rules     : { required: 'Required' },
		},
		{
			name        : 'number_of_stops',
			label       : 'Number of Stops',
			type        : 'number',
			placeholder : 'Enter number of stops',
			className   : 'primary sm',
			span        : 6,
			rules       : { required: 'Required', min: 0 },
		},
		{
			label     : 'Detention free days at origin',
			name      : 'free_days_detention_origin',
			type      : 'number',
			span      : 6,
			value     : 4,
			className : 'primary sm',
			rules     : {
				required : 'Min Price is required',
				validate : (value) => (value < 0 || value > 21
					? 'Cannot be more than 21 and less than 0'
					: true),
			},
		},
		{
			label     : 'Detention free days at destination',
			name      : 'free_days_detention_destination',
			type      : 'number',
			span      : 6,
			value     : 4,
			className : 'primary sm',
			rules     : {
				required : 'Min Price is required',
				validate : (value) => (value < 0 || value > 21
					? 'Cannot be more than 21 and less than 0'
					: true),
			},
		},
		{
			label     : 'Demurrage free days at origin',
			name      : 'free_days_demurrage_origin',
			type      : 'number',
			span      : 6,
			value     : 4,
			className : 'primary sm',
			rules     : {
				required : 'Min Price is required',
				validate : (value) => (value < 0 || value > 21
					? 'Cannot be more than 21 and less than 0'
					: true),
			},
		},
		{
			label     : 'Demurrage free days at destination',
			name      : 'free_days_demurrage_destination',
			type      : 'number',
			span      : 6,
			value     : 4,
			className : 'primary sm',
			rules     : {
				required : 'Min Price is required',
				validate : (value) => (value < 0 || value > 21
					? 'Cannot be more than 21 and less than 0'
					: true),
			},
		},
	];

	if (scope === 'app') {
		controls.push({
			label       : 'Cargo Readiness Date',
			name        : 'cargo_readiness_date',
			type        : 'datepicker',
			placeholder : 'Date',
			className   : 'primary sm',
			span        : 6,
			rules       : { required: 'Required' },
		});
	}

	if (manualSelect) {
		controls.splice(7, 0, { label: ' ', span: 6, showOptional: false });
	}

	return controls;
};

export const lclControls = (scope) => {
	const controls = [
		{
			label       : 'Departure',
			name        : 'departure',
			type        : 'datepicker',
			placeholder : 'Departure',
			className   : 'primary sm',
			minDate     : addDays(new Date(), 1),
			span        : 6,
			rules       : { required: 'Required' },
		},
		{
			name        : 'arrival',
			label       : 'Arrival',
			placeholder : 'Arrival',
			className   : 'primary sm',
			minDate     : addDays(new Date(), 1),
			type        : 'datepicker',
			span        : 6,
			rules       : { required: 'Required' },
		},
		{
			name        : 'number_of_stops',
			label       : 'Number of Stops',
			type        : 'number',
			className   : 'primary sm',
			placeholder : 'Enter number of stops',
			span        : 6,
			rules       : { required: 'Required', min: 0 },
		},
	];
	if (scope === 'app') {
		controls.push({
			label       : 'Cargo Readiness Date',
			name        : 'cargo_readiness_date',
			type        : 'datepicker',
			className   : 'primary sm',
			placeholder : 'Date',
			span        : 6,
			rules       : { required: 'Required' },
		});
	}
	return controls;
};

export const ftlControls = () => {
	const controls = [
		{
			name        : 'truck_details',
			type        : 'fieldArray',
			showButtons : true,
			showDivider : false,
			lineColor   : '#f2f2f2',
			className   : 'primary sm',
			value       : [
				{
					code     : '',
					alias    : '',
					currency : '',
					price    : '',
					unit     : '',
				},
			],
			controls: [
				{
					name        : 'truck_type',
					label       : 'Truck Type',
					type        : 'select',
					caret       : true,
					placeholder : 'Truck Type',
					className   : 'primary sm',
					optionKey   : 'truck-types',
					span        : 4,
					rules       : { required: 'Required' },
				},
				{
					name        : 'trucks_count',
					label       : 'Trucks count',
					placeholder : 'Truck Count',
					className   : 'primary sm',
					type        : 'number',
					span        : 3,
					rules       : { required: 'Required', min: 0 },
				},
			],
		},
	];

	return controls;
};

export const getShowElements = (
	service_type,
	controls,
	scheduleList,
	scope,
	data,
	wayToBook,
	manualSelect,
) => {
	const { commodity_type = '' } = data?.commodity_details?.[0] || {};

	const showElements = {};
	if (service_type === 'lcl_freight') {
		(controls || []).forEach((control) => {
			showElements[control.name] = true;
		});
		showElements.suitable_schedule = false;
	} else {
		let nonMandatoryElements = [];
		if (scheduleList.isApiCalled) {
			if (scheduleList.list.length !== 0 && !manualSelect) {
				nonMandatoryElements = [
					'arrival',
					'departure',
					'number_of_stops',
				];
			} else if (scheduleList.list.length === 0) {
				nonMandatoryElements = ['suitable_schedule'];
			} else {
				nonMandatoryElements = [];
			}
		} else {
			nonMandatoryElements = [
				'arrival',
				'departure',
				'number_of_stops',
				'suitable_schedule',
			];
		}
		(controls || []).forEach((control) => {
			if (
				nonMandatoryElements.includes(control.name)
                && wayToBook === 'sell_without_buy'
			) {
				showElements[control.name] = false;
			} else {
				showElements[control.name] = true;
			}
		});
	}
	if (scope === 'app' && service_type !== 'lcl_freight') {
		showElements.arrival = false;
		showElements.departure = false;
		showElements.number_of_stops = false;
	}
	if (!data?.origin_port?.is_icd) {
		Object.keys(showElements).forEach((item) => {
			if (item === 'origin_main_port_id') {
				showElements[item] = false;
			}
		});
	}
	if (!data?.destination_port?.is_icd) {
		Object.keys(showElements).forEach((item) => {
			if (item === 'destination_main_port_id') {
				showElements[item] = false;
			}
		});
	}

	if (commodity_type !== 'dangerous') {
		Object.keys(showElements).forEach((item) => {
			if (item === 'msds_certificate') {
				showElements[item] = false;
			}
		});
	}

	if (!SPECIAL_CONSIDERATION.includes(commodity_type)) {
		Object.keys(showElements).forEach((item) => {
			if (item === 'packing_list') {
				showElements[item] = false;
			}
		});
	}

	if (wayToBook === 'spot_booking') {
		showElements.suitable_schedule = false;
	}

	return showElements;
};

export const getFclAirSchedule = async (trigger, setScheduleList, params) => {
	try {
		const res = await trigger({ params });
		if (!res?.hasError) {
			const schedules = res?.data?.list || [];
			setScheduleList({
				list        : schedules,
				isApiCalled : true,
			});
		}
	} catch (err) {
		console.log(err);
	}
};
