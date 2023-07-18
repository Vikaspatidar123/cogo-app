import React from 'react';

import getResults from '../../hooks/getResults';

import { useRouter, Head } from '@/packages/next';
import Results from '@/ui/page-components/search-results/components';

function SearchResults() {
	const { query } = useRouter();
	const { search_id, importer_exporter_id } = query;

	const {
		headerData: initialHeaderData,
		rates,
		possible_subsidiary_services,
		loading,
		invoice,
		refetch,
		setState = () => { },
		state,
		searchData,
		...restResults
	} = getResults(search_id);

	const headerData = {
		search_type        : null,
		rates_count        : 0,
		negotiation_status : null,
		expired            : false,
		shipment_id        : null,
		...(initialHeaderData || {}),
		importer_exporter_id,
	};
	return (
		<>
			<Head>
				<title>Discover Rates - Search Rates</title>
			</Head>

			<Results
				setState={setState}
				state={state}
				data={headerData}
				searchData={searchData}
				rates={rates}
				possible_additional_services={possible_subsidiary_services}
				loading={loading}
				refetch={refetch}
				{...restResults}
			/>
		</>
	);
}

export default SearchResults;
