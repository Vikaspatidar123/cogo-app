import { useMemo } from 'react';

const useSelectCard = ({
	setRadioSelected,
	setSelectedData,
	title,
	radioSelected,
	rfq_search_id,
	spotSearch,
	rate_cards,
}) => {
	const selectCard = ({ item }) => {
		const {
			rfq_rate_card_id = '',
			card = '',
			freight_price_discounted = '',
			total_price_discounted = '',
			freight_price_currency = '',
			total_price_currency = '',
		} = item || {};

		const is_rfq_rate_card = Boolean(rfq_rate_card_id);

		const keyName = is_rfq_rate_card ? 'rfq_rate_card_id' : 'spot_search_rate_card_id';

		setRadioSelected((prevRadioSelected) => {
			let is_selected = false;
			let id = '';
			if (title === 'spot_rates') {
				is_selected = radioSelected[rfq_search_id]?.id === card
					? !radioSelected[rfq_search_id]?.isSelected
					: true;
				id = card;
			}
			if (['created', 'recommended'].includes(title)) {
				is_selected = radioSelected[rfq_search_id]?.id === rfq_rate_card_id
					? !radioSelected[rfq_search_id]?.isSelected
					: true;
				id = rfq_rate_card_id;
			}
			return {
				...prevRadioSelected,
				[rfq_search_id]: {
					id,
					isSelected: is_selected,
				},
			};
		});

		setSelectedData((prevSelectedData) => {
			const selectedData = prevSelectedData[rfq_search_id];
			const isMatching = selectedData && (keyName === 'rfq_rate_card_id'
				? selectedData.rfq_rate_card_id === rfq_rate_card_id
				: selectedData.spot_search_rate_card_id === card);

			if (isMatching) {
				return {
					...prevSelectedData,
					[rfq_search_id]: undefined,
				};
			}

			const updatedSelectedData = {
				...prevSelectedData,
				[rfq_search_id]: {
					[keyName] : keyName === 'rfq_rate_card_id' ? rfq_rate_card_id : card,
					is_rfq_rate_card,
					data      : spotSearch,
					rate      : {
						freight_price_discounted,
						total_price_discounted,
						freight_price_currency,
						total_price_currency,
					},
				},
			};

			return updatedSelectedData;
		});
	};
	const number_of_rate_cards = useMemo(() => rate_cards.length, [rate_cards]);
	return {
		selectCard,
		number_of_rate_cards,
	};
};
export default useSelectCard;
