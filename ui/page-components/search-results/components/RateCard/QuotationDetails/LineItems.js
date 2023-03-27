import React from 'react';
import startCase from '@cogo/utils/startCase';
import { useSelector } from '@cogo/store';
import isEmpty from '@cogo/utils/isEmpty';
import useGetPermission from '@cogo/business-modules/hooks/useGetPermission';
import formatAmount from '@cogo/globalization/utils/formatAmount';
import CC from '../../../helpers/condition-constants';
import Margins from './Margins';
import {
	LineItem,
	FlexRow,
	Text,
	Pill,
	Space,
	MobileMargins,
	TotalPrice,
} from './styles';

const LineItems = ({ item = {}, isMobile = false }) => {
	const { isConditionMatches, isChannelPartner } = useGetPermission();
	const scope = useSelector(({ general }) => general?.scope);

	const {
		name,
		currency,
		quantity,
		unit,
		margins,
		total_price_discounted,
		price_discounted,
	} = item || {};

	let totalMarginValue = 0;
	if (isConditionMatches(CC.SEE_SALES_MARGIN, 'or')) {
		totalMarginValue = !isEmpty(margins)
			? (margins || []).filter((margin) => margin?.margin_type === 'demand')[0]
					?.total_margin_value
			: 0;
	}
	if (isConditionMatches(CC.SEE_SUPPLY_MARGIN, 'or')) {
		totalMarginValue = !isEmpty(margins)
			? (margins || []).filter((margin) => margin?.margin_type === 'supply')[0]
					?.total_margin_value
			: 0;
	}
	if (isConditionMatches(CC.SEE_ALL_MARGINS, 'or')) {
		(margins || []).forEach((margin) => {
			totalMarginValue += margin?.total_margin_value;
		});
	}

	const priceWithoutMargin = totalMarginValue
		? total_price_discounted - totalMarginValue
		: total_price_discounted;

	return (
		<LineItem>
			<FlexRow>
				<FlexRow>
					<Text>{name}</Text>

					{!isMobile && !isChannelPartner && scope === 'partner' ? (
						<div>{`${formatAmount({
							amount: priceWithoutMargin,
							currency,
							options: {
								style: 'currency',
								currencyDisplay: 'code',
								maximumFractionDigits: 0,
							},
						})}`}</div>
					) : null}
				</FlexRow>

				<FlexRow>
					{!isMobile && scope === 'partner' && !isChannelPartner ? (
						<div style={{ marginTop: '-6px' }}>
							{!isEmpty(margins) ? (
								<Margins margins={margins} />
							) : (
								<Space>
									+ <Pill className="no-margin">No margin</Pill>
								</Space>
							)}
						</div>
					) : null}

					<TotalPrice>
						<span style={{ fontWeight: 500 }}>
							{formatAmount({
								amount: total_price_discounted,
								currency,
								options: {
									style: 'currency',
									currencyDisplay: 'code',
									maximumFractionDigits: 0,
								},
							})}
						</span>

						{isConditionMatches(
							[...CC.SEE_SALES_MARGIN, ...CC.SEE_SUPPLY_MARGIN],
							'or',
						) ? (
							<Space>
								{price_discounted}({startCase(unit)}) x {quantity}
							</Space>
						) : null}
					</TotalPrice>
				</FlexRow>
			</FlexRow>

			{isMobile && scope === 'partner' && !isChannelPartner ? (
				<MobileMargins className="top">
					{`${formatAmount({
						amount: priceWithoutMargin,
						currency,
						options: {
							style: 'currency',
							currencyDisplay: 'code',
							maximumFractionDigits: 0,
						},
					})}`}

					<div style={{ marginTop: '-6px' }}>
						{!isEmpty(margins) ? (
							<Margins margins={margins} />
						) : (
							<Pill className="no-margin">No margin</Pill>
						)}
					</div>
				</MobileMargins>
			) : null}
		</LineItem>
	);
};

export default LineItems;
