import { useState } from 'react';

import PromocodeDetails from './PromocodeDetails';
import styles from './styles.module.css';

function PromoCode({ promotion = {} }) {
	const [showDetails, setShowDetails] = useState(false);

	if (promotion.codes === undefined) {
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
					{promotion.codes?.[0]?.promocode}
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
