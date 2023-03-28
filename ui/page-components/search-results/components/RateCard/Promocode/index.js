import { useState } from 'react';

import PromocodeDetails from './PromocodeDetails';
import { Container, Text } from './styles';

function PromoCode({ promotion = {} }) {
	const [showDetails, setShowDetails] = useState(false);

	if (promotion.promocodes === undefined) {
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
			<Container onClick={() => setShowDetails(true)}>
				<Text>
					Apply
					{' '}
					{promotion.promocodes[0]?.promocode}
					{' '}
					to get
					{' '}
					{getDiscountPercent(promotion)}
				</Text>
			</Container>
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
