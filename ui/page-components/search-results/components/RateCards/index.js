import React, { useMemo } from 'react';

import CargoInsuranceRateCard from '../CargoInsuranceRateCard';
import FtlRateCard from '../FtlRateCard';
import RateCard from '../RateCard';
import TrailerFreightRateCard from '../TralerFreightRateCard';

function RateCards({
	setState,
	state,
	data,
	details,
	refetch,
	searchData,
	index,
	scheduleList,
	rates,
}) {
	const SEARCH_TYPE_SELECTED_RATE_CARD_COMPONENT_MAPPING = useMemo(
		() => ({
			ftl_freight           : FtlRateCard,
			ltl_freight           : FtlRateCard,
			trailer_freight       : TrailerFreightRateCard,
			rail_domestic_freight : TrailerFreightRateCard,
			cargo_insurance       : CargoInsuranceRateCard,
			others                : RateCard,
		}),
		[],
	);

	const { search_type } = details;

	const componentKey = search_type in SEARCH_TYPE_SELECTED_RATE_CARD_COMPONENT_MAPPING ? search_type : 'others';

	const Component = SEARCH_TYPE_SELECTED_RATE_CARD_COMPONENT_MAPPING[componentKey] || null;

	return (
		<Component
			key={search_type}
			id={`search_results_card_${index}`}
			state={state}
			setState={setState}
			data={data}
			details={details}
			refetch={refetch}
			rates={rates}
			searchData={searchData}
			scheduleList={scheduleList}
		/>
	);
}

export default RateCards;
