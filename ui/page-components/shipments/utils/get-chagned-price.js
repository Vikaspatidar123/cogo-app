/* eslint-disable no-underscore-dangle */
const getChangedPrice = (margins, line_item) => {
	const marginItem = (margins || []).find((margin) => margin.code === line_item?.code);
	const oldMargins = marginItem?._meta?.lineItem?.margins || [];
	const oldMarginItem = oldMargins.find((margin) => margin.code === line_item?.code
		&& margin.margin_type === 'supply');
	if (marginItem && typeof marginItem?.value === 'number') {
		if (marginItem.type === 'absolute_total') {
			const { quantity, price_discounted, total_price_discounted } = line_item || {};
			const oldMargin = oldMarginItem?.total_margin_value || 0;
			const actualBuyPrice = price_discounted + ((oldMargin) / (quantity || 1));
			const perUnitMargin = (marginItem?.value || 1) / (quantity || 1);
			const price = actualBuyPrice - perUnitMargin;
			const totalPriceCalculated = price * quantity;
			const totalPriceMin = total_price_discounted - (marginItem?.value || 0) + oldMargin;
			const totalPrice = Math.max(totalPriceCalculated, totalPriceMin);
			return { total_price_discounted: totalPrice, price_discounted: price };
		}
		if (marginItem.type === 'absolute_unit') {
			const { quantity, price_discounted, total_price_discounted } = line_item || {};
			const oldMargin = oldMarginItem?.total_margin_value || 0;
			const actualBuyPrice = price_discounted + ((oldMargin) / (quantity || 1));
			const perUnitMargin = marginItem?.value;
			const price = actualBuyPrice - perUnitMargin;
			const totalPriceCalculated = price * quantity;
			const totalPriceMin = total_price_discounted - ((marginItem?.value || 0) * quantity) + oldMargin;
			const totalPrice = Math.max(totalPriceCalculated, totalPriceMin);
			return { total_price_discounted: totalPrice, price_discounted: price };
		}
		return {
			total_price_discounted : line_item?.total_price_discounted,
			price_discounted       : line_item?.price_discounted,
		};
	}
	return { total_price_discounted: line_item?.total_price_discounted, price_discounted: line_item?.price_discounted };
};
export default getChangedPrice;
