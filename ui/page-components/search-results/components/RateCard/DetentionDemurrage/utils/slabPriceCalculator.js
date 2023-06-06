const slabPriceCalculator = ({
	slabs = [],
	days = 0,
	previous_days_applicable = false,
}) => slabs.reduce((acc, curr) => {
	const { lower_limit, upper_limit, price } = curr;

	if (previous_days_applicable) {
		if ((lower_limit <= days && days <= upper_limit) || upper_limit <= days) {
			let limit = days;
			if (days - upper_limit > 0) {
				limit = upper_limit;
			}

			return acc + (limit - lower_limit + 1) * price;
		}

		return acc;
	}

	if (lower_limit <= days && days <= upper_limit) {
		return acc + days * price;
	}

	return acc;
}, 0);

export default slabPriceCalculator;
