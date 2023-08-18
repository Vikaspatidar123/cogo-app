import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import PromocodeDetails from './PromocodeDetails';
import styles from './styles.module.css';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

function PromoCode({ promotion = {} }) {
	const [showDetails, setShowDetails] = useState(false);

	if (isEmpty(promotion.codes)) {
		return null;
	}

	const getDiscountPercent = (Promotion) => {
		const message = `${Math.round(promotion.promotion_discounts[0].value)}${
			promotion.promotion_discounts[0].unit === 'percentage'
				? '%'
				: promotion.promotion_discounts[0].amount_currency
		} off`;

		if (Promotion.level === 'service_level') {
			if (promotion.promotion_discounts.length > 0) {
				return `${message} on ${promotion.promotion_discounts[0].service_type.replace(
					'_',
					' ',
				)} & more`;
			}
			return `${message} on ${promotion.promotion_discounts[0].service_type.replace(
				'_',
			)}`;
		}

		return message;
	};
	return (
		<>
			<div className={styles.container} role="presentation" onClick={() => setShowDetails(true)}>
				<div className={styles.text}>
					Apply
					{' '}
					{promotion.codes?.[GLOBAL_CONSTANTS.zeroth_index]?.promocode}
					{' '}
					to get
					{' '}
					{getDiscountPercent(promotion)}
				</div>
			</div>
			{showDetails && (
				<PromocodeDetails
					promotion={promotion}
					setShowDetails={setShowDetails}
				/>
			)}
		</>
	);
}

export default PromoCode;
