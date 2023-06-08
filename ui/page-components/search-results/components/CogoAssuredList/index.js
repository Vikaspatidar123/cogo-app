import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import SearchResultsRatesRateCard from '../RateCard';

function CogoAssuredList({ list, details, searchData }) {
	const [selectedCard, setSelectedCard] = useState(list[0].validity_id);

	const mainCard = list.find((item) => item.validity_id === selectedCard);
	if (isEmpty(mainCard)) {
		return null;
	}

	mainCard.allAssuredRates = list;

	return (
		<div>
			<SearchResultsRatesRateCard
				key={mainCard.card}
				data={mainCard}
				details={details}
				searchData={searchData}
				type="cogo-assured"
				selectAssuredSchedule={setSelectedCard}
			/>
		</div>
	);
}

export default CogoAssuredList;
