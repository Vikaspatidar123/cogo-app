import { cl, Button } from '@cogoport/components';
import { IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import useSelectCard from '../../../../../../hooks/useSelectCard';

import styles from './styles.module.css';

import RateCard from '@/ui/page-components/manage-rfq/common/RateCard';

const TITLE_MAPPING = {
	recommended      : 'Recomended Rates',
	created          : 'Rates Created by you',
	spot_rates       : 'Spot Rates',
	negotiated_rates : 'Supply Rates',
};

const EXCLUDED_RATES = ['cheapest', 'max_detention', 'min_transit', 'negotiated_rates'];

function ViewRateCard({
	title = 'recomended',
	spot_search = {},
	rate_cards = [],
	setShowEditMarginModal,
	setShowNegotiate,
	negotiation_rank,
	radioSelected,
	setRadioSelected,
	setSelectedData,
	spotSearch,
}) {
	const { detail } = spot_search || {};

	const { id: rfq_search_id = '' } = spotSearch || {};
	const [showAllRateCards, setShowAllRateCards] = useState(false);
	const { selectCard, number_of_rate_cards } = useSelectCard({
		setRadioSelected,
		setSelectedData,
		title,
		radioSelected,
		rfq_search_id,
		spotSearch,
		rate_cards,
	});

	if (EXCLUDED_RATES.includes(title)) {
		return null;
	}

	if (isEmpty(rate_cards)) {
		return null;
	}
	return (
		<div className={styles.container}>
			<div className={styles.title}>{TITLE_MAPPING[title]}</div>

			{rate_cards
				.slice(0, showAllRateCards ? number_of_rate_cards : 1)
				.map((item) => {
					const { card_state } = item;
					const isSelected = radioSelected?.[rfq_search_id]?.id === (item?.rfq_rate_card_id || item?.card)
						? radioSelected[rfq_search_id]?.isSelected
						: false;

					return (
						<div className={styles.card_tile} key={item?.rfq_rate_card_id || item?.card}>
							<div className={styles.radio_circle_container}>
								{['recommended', 'spot_rates'].includes(title) ? (
									<div
										className={cl`${styles.radio_circle}  ${isSelected ? styles.is_selected : ''}`}
										role="presentation"
										onClick={() => selectCard({ item })}
									/>
								) : null}
							</div>
							<RateCard
								detail={detail}
								ratesBreakdown={item}
								setShowEditMarginModal={setShowEditMarginModal}
								setShowNegotiate={setShowNegotiate}
								negotiation_rank={negotiation_rank}
								title={title}
								card_state={card_state}
								source="app"
							/>
						</div>
					);
				})}

			{number_of_rate_cards > 1 && (
				<div className={styles.button_container}>
					<Button
						size="sm"
						themeType="secondary"
						onClick={() => setShowAllRateCards(!showAllRateCards)}
					>
						{showAllRateCards ? (
							<>
								Show Less
								<div className={styles.icon_container}>
									<IcMArrowRotateUp />
								</div>
							</>
						) : (
							<>
								Show More
								<div className={styles.icon_container}>
									<IcMArrowRotateDown />
								</div>

							</>
						)}
					</Button>
				</div>
			)}
		</div>
	);
}

export default ViewRateCard;
