import { Button } from '@cogoport/components';

import useRedirectUrl from '@/ui/page-components/quotation/utils/redirectUrl';

function BtnContainer({ data = {} }) {
	const {
		container_size = '',
		container_type = '',
		containers_count = 0,
		destination_port_id = '',
		destination_airport_id = '',
		origin_port_id = '',
		origin_airport_id = '',
		search_type = 'FCL_FREIGHT',
		inco_term = '',
		volume = 0,
		weight = 0,
		packages_count = 0,
		destination_port = '',
		destination_airport = '',
		origin_airport = '',
		origin_port = '',
	} = data;
	const { redirectRecentSearch } = useRedirectUrl();
	const handleQuotationClick = () => {
		const spotSearchData = {
			containerSize  : container_size,
			containerType  : container_type,
			containerCount : containers_count,
			destinationId  : destination_port_id || destination_airport_id,
			originId       : origin_port_id || origin_airport_id,
			serviceType    : search_type,
			incoterm       : inco_term,
			volume,
			weight,
			quantity       : packages_count,
			destination    : destination_port || destination_airport,
			origin         : origin_airport || origin_port,
		};
		// eslint-disable-next-line no-undef
		localStorage.setItem('spotSearchResult', JSON.stringify(spotSearchData));

		redirectRecentSearch();
	};
	return (
		<Button
			onClick={handleQuotationClick}
			size="sm"
			style={{ background: '#fada29', color: '#333' }}
		>
			Quote
		</Button>
	);
}

export default BtnContainer;
