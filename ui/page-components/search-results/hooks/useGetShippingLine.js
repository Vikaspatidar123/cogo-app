import { useState, useEffect } from 'react';
import { useSelector } from '@cogo/store';
import { useFormCogo } from '@cogoport/front/hooks';
import { useRequest } from '@cogo/commons/hooks';
import getGeoConstants from '@cogo/globalization/constants/geo';
import formatDate from '@cogo/globalization/utils/formatDate';
import {
	airControls,
	lclControls,
	fclControls,
	ftlControls,
	getShowElements,
	getFclAirSchedule,
} from '../utils/shipping-line-function';
import getPriorityAirlineOptions from './getPriorityAirlineOptions';
import useGetSpotLineBookingShippingLines from './useGetSpotLineBookingShippingLines';
import StyledLabel from '../commons/StyledLabel';

const geo = getGeoConstants();

const OPTIONS1 = [
	{
		label: 'Sell Without Buy',
		value: 'sell_without_buy',
	},
	{
		label: 'Spot Line Booking',
		value: 'spot_booking',
		backgroundColor: '#EF9B9B',
		color: '#000000',
	},
];

const useGetShippingLine = ({
	check_multiple_containers_fcl,
	data,
	wayToBook,
}) => {
	const service_type = data?.search_type;
	const { scope } = useSelector(({ general }) => ({ scope: general?.scope }));

	const [manualSelect, setManualSelect] = useState(false);

	const [scheduleList, setScheduleList] = useState({
		list: [],
		isApiCalled: false,
	});

	const OPTIONS =
		check_multiple_containers_fcl?.length > 1 &&
		data?.service_type === 'fcl_freight'
			? [
					{
						label: 'Sell Without Buy',
						value: 'sell_without_buy',
					},
			  ]
			: OPTIONS1;

	const { spotBookingDefaultShippingLines = [] } =
		useGetSpotLineBookingShippingLines();

	const { priorityAirlineOptions, airlineOptions } =
		getPriorityAirlineOptions();

	const trade_type = data?.trade_type;

	const apiSchedules =
		service_type === 'fcl_freight'
			? '/get_sailing_schedules'
			: '/get_air_schedules';

	const getApiSchedules = useRequest('get', false, scope)(apiSchedules);

	let controls = [];
	if (service_type === 'fcl_freight') {
		controls = fclControls(
			wayToBook,
			scope,
			data,
			spotBookingDefaultShippingLines,
			manualSelect,
		);
	}
	if (service_type === 'lcl_freight') {
		controls = lclControls(scope, wayToBook);
	}
	if (service_type === 'air_freight') {
		controls = airControls(scope, trade_type, airlineOptions);
	}
	if (service_type === 'ftl_freight' && data?.load_selection_type !== 'truck') {
		controls = ftlControls();
	}

	const {
		fields,
		handleSubmit,
		watch,
		reset,
		formState: { errors },
		setValue,
	} = useFormCogo(controls);

	const formValues = watch();

	const showElements = getShowElements(
		service_type,
		controls,
		scheduleList,
		scope,
		data,
		wayToBook,
		manualSelect,
	);

	Object.keys(fields).forEach((key) => {
		if (key === 'suitable_schedule') {
			if (scheduleList.list.length) {
				const options = [];

				(scheduleList.list || []).forEach((listObj) => {
					const present_date = formatDate({
						date: new Date(),
						dateFormat: geo.formats.date.default,
						formatType: 'date',
					});

					const departure_date = formatDate({
						date: listObj?.departure,
						dateFormat: geo.formats.date.default,
						formatType: 'date',
					});

					const present_split = present_date.split('/');
					const departure_split = departure_date.split('/');

					const present = new Date(
						present_split[2],
						Number(present_split[1]) - 1,
						present_split[0],
					);

					const departure = new Date(
						departure_split[2],
						Number(departure_split[1]) - 1,
						departure_split[0],
					);

					if (departure > present) {
						const label = <StyledLabel data={listObj} />;
						options.push({
							label,
							value: `${listObj.arrival}_${listObj.departure}_${listObj.transit_time}_${listObj?.number_of_stops}`,
						});
					}
				});
				fields[key].options = options;
			}
		}

		if (key === 'shipping_line_id' && wayToBook === 'spot_booking') {
			fields[key].params = {
				filters: { id: geo.uuid.spot_booking_shipping_lines },
			};
		}
	});

	const serviceTypeBasedDecision = () => {
		let params = {};
		if (service_type === 'fcl_freight') {
			params = {
				origin_port_id: data?.origin_port_id,
				destination_port_id: data?.destination_port_id,
				filters: {
					shipping_line_id: formValues?.shipping_line_id,
				},
				page_limit: 1000,
				sort_by: 'departure',
				sort_type: 'asc',
			};
		}
		if (service_type === 'air_freight') {
			params = {
				filters: {
					origin_airport_id: data?.origin_airport_id,
					destination_airport_id: data?.destination_airport_id,
					airline_id: formValues?.airline_id,
				},
				page_limit: 1000,
				sort_id: 'departure',
				sort_type: 'asc',
			};
		}

		if (formValues.airline_id && scope === 'partner') {
			getFclAirSchedule(getApiSchedules.trigger, setScheduleList, params);
		}
		if (
			formValues?.shipping_line_id &&
			service_type === 'fcl_freight' &&
			scope === 'partner'
		) {
			getFclAirSchedule(getApiSchedules.trigger, setScheduleList, params);
		}
	};

	useEffect(() => {
		serviceTypeBasedDecision();
	}, [
		formValues?.airline_id,
		formValues?.shipping_line_id,
		formValues?.cargo_readiness_date,
	]);

	useEffect(() => {
		priorityAirlineOptions({
			origin_airport_id: data?.origin_airport_id,
			destination_airport_id: data?.destination_airport_id,
		});
	}, []);

	useEffect(() => {
		setValue('suitable_schedule', '');
	}, [manualSelect]);

	return {
		errors,
		fields,
		handleSubmit,
		reset,
		controls,
		showElements,
		scheduleList,
		setScheduleList,
		OPTIONS,
		manualSelect,
		setManualSelect,
	};
};

export default useGetShippingLine;
