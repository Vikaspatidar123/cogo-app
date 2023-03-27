import formatAmount from '@cogo/globalization/utils/formatAmount';
import LineItems from './LineItems';
import {
	Container,
	MainHeading,
	TotalHeading,
	FooterDiv,
	TotalAmount,
} from './styles';

const CostBreakdown = ({
	line_items = [],
	total_price,
	total_price_currency,
}) => {
	return (
		<Container>
			<MainHeading>Cost Breakdown</MainHeading>
			<LineItems line_items={line_items} />
			<FooterDiv>
				<TotalHeading>Total</TotalHeading>
				<TotalAmount>
					{formatAmount({
						amount: total_price || 0,
						currency: total_price_currency,
						options: {
							style: 'currency',
							currencyDisplay: 'symbol',
							maximumFractionDigits: 0,
						},
					})}
				</TotalAmount>
			</FooterDiv>
		</Container>
	);
};

export default CostBreakdown;
