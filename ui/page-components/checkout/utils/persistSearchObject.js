const persistSearchObject = (mode, summary) => {
	if (typeof window !== 'undefined') {
		try {
			switch (mode) {
				case 'fcl_freight':
					localStorage.setItem(
						'q_s',
						JSON.stringify({
							mode,
							origin_location_id      : summary.origin.id,
							destination_location_id : summary.destination.id,
						}),
					);

					break;
				case 'air_freight':
					localStorage.setItem(
						'q_s',
						JSON.stringify({
							mode,
							origin_location_id      : summary.origin.id,
							destination_location_id : summary.destination.id,
						}),
					);
					break;

				case 'lcl_freight':
					localStorage.setItem(
						'q_s',
						JSON.stringify({
							mode,
							origin_location_id      : summary.origin.id,
							destination_location_id : summary.destination.id,
						}),
					);

					break;
				default:
			}
		} catch (e) {
			console.log(e);
		}
	}
};

export default persistSearchObject;
