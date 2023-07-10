const getDetailsFeatures = ({ detail, ratesBreakdown }) => {
	const detailData = [
		{
			value:
				(ratesBreakdown?.destination_detention?.free_limit
					|| ratesBreakdown?.destination_detention?.free_limit === 0)
				&& ratesBreakdown?.service_type === 'fcl_freight'
					? `${
						ratesBreakdown?.destination_detention?.free_limit || 0
					} free detention days`
					: null,
		},
		{
			value:
				ratesBreakdown?.transit_time
				&& ['air_freight', 'fcl_freight', 'lcl_freight'].includes(
					ratesBreakdown?.service_type,
				)
					? `Transit Time - ${ratesBreakdown?.transit_time || 0} ${
						['fcl_freight', 'lcl_freight'].includes(
							ratesBreakdown?.service_type,
						)
							? 'Days'
							: 'Hours'
					}  `
					: null,
		},

		{
			value:
				detail?.chargeable_weight
				&& ['air_freight'].includes(ratesBreakdown?.service_type)
					? `Chargeable weight - ${detail?.chargeable_weight || 0}kgs`
					: null,
		},

		{
			value:
				(ratesBreakdown?.origin_storage?.free_limit
					|| ratesBreakdown?.origin_storage?.free_limit === 0)
				&& ['air_freight', 'lcl_freight'].includes(ratesBreakdown?.service_type)
					? `${
						ratesBreakdown?.origin_storage?.free_limit || 0
					} free origin storage hours `
					: null,
		},

		{
			value:
				(ratesBreakdown?.destination_storage?.free_limit
					|| ratesBreakdown?.destination_storage?.free_limit === 0)
				&& ['air_freight', 'lcl_freight'].includes(ratesBreakdown?.service_type)
					? `${
						ratesBreakdown?.destination_storage?.free_limit || 0
					} free destination storage ${
						ratesBreakdown?.service_type === 'air_freight' ? 'hours' : 'days'
					}`
					: null,
		},

		{
			value:
				ratesBreakdown?.operation_type
				&& ['air_freight'].includes(ratesBreakdown?.service_type)
					? `Operation Type - ${ratesBreakdown?.operation_type || ''}`
					: null,
		},
	];
	const features = [];
	detailData.forEach((itm) => {
		if (itm.value !== null) {
			features.push(itm.value);
		}
	});
	return features;
};

export default getDetailsFeatures;
