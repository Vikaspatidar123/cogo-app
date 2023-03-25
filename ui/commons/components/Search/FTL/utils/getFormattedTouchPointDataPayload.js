const getFormattedTouchPointDataPayload = (data, touchPointsToggle) => {
	const { values = {} } = data || {};
	const { route, haltTime } = values || {};
	const { halt_time_unit, halt_time_value } = haltTime || {};

	const { values: touchPointValues } = route || [];
	const { touchPoints } = touchPointValues || {};
	const { location = {} } = route || {};

	const newTouchPoints = [];

	(touchPoints || []).forEach((touchPoint) => {
		const item = { ...touchPoint };
		newTouchPoints.push({ ...item });
	});

	let sequence = 0;
	const ftl_freight_service_touch_points_attribute = [
		{
			touch_point_location_id : location.origin?.id,
			touch_point_type        : 'origin',
			sequence_number         : sequence + 1,
		},
	];

	newTouchPoints.forEach((touchPoint) => {
		sequence += 1;
		ftl_freight_service_touch_points_attribute.push({
			touch_point_location_id : touchPoint?.id,
			touch_point_type        : 'enroute',
			trip_type               : 'one_way',
			sequence_number         : sequence,
		});
	});

	if (touchPointsToggle?.length > 0) {
		touchPointsToggle.forEach((touchPoint) => {
			sequence += 1;
			ftl_freight_service_touch_points_attribute.push({
				touch_point_location_id : touchPoint?.id,
				touch_point_type        : 'enroute',
				trip_type               : 'round',
				sequence_number         : sequence,
			});
		});
	}

	ftl_freight_service_touch_points_attribute.push({
		touch_point_location_id : location.destination?.id,
		touch_point_type        : 'destination',
		halt_time_value         : halt_time_value || undefined,
		halt_time_unit          : halt_time_unit || undefined,
		sequence_number         : sequence + 1,
	});

	return ftl_freight_service_touch_points_attribute;
};

export default getFormattedTouchPointDataPayload;
