import Grid from '@cogoport/front/components/Grid';
import formatAmount from '@cogo/globalization/utils/formatAmount';
import {
	RowContainer,
	ChargeName,
	TotalPrice,
	CostCalculation,
	Price,
	Unit,
	Quantity,
	Cross,
} from './styles';

const { Row, Col } = Grid;
const LineItems = ({ line_items = [] }) => {
	return (
		<RowContainer>
			{(line_items || []).map((item = {}) => {
				const {
					name = '',
					code = '',
					quantity = '',
					price = 0,
					currency = '',
					unit = '',
					total_price = 0,
				} = item || {};
				return (
					<Row key={name} className="line-item">
						<Col md={4}>
							<ChargeName>
								{name} {code ? `(${code})` : ''}
							</ChargeName>
						</Col>
						<Col
							md={4}
							style={{
								textAlign: 'center',
							}}
						>
							<CostCalculation>
								<Quantity>{quantity}</Quantity>
								<Cross>x</Cross>
								<Price>
									{formatAmount({
										amount: price,
										currency,
										options: {
											style: 'currency',
											currencyDisplay: 'symbol',
											maximumFractionDigits: 0,
										},
									})}
								</Price>
								<Unit>/ {unit?.replace('_', ' ')}</Unit>
							</CostCalculation>
						</Col>
						<Col
							md={4}
							style={{
								textAlign: 'right',
							}}
						>
							<TotalPrice>
								{formatAmount({
									amount: total_price || 0,
									currency,
									options: {
										style: 'currency',
										currencyDisplay: 'symbol',
										maximumFractionDigits: 0,
									},
								})}
							</TotalPrice>
						</Col>
					</Row>
				);
			})}
		</RowContainer>
	);
};

export default LineItems;
