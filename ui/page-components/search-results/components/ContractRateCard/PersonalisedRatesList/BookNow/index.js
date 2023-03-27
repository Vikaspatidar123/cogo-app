import Button from '@cogoport/front/components/admin/Button';
import Grid from '@cogoport/front/components/Grid';
import formatAmount from '@cogo/globalization/utils/formatAmount';
import { BookingContainer, PerTruck, Text, ButtonContainer } from './styles';
import useCreateCheckout from '../../../../hooks/useCreateCheckout';

const { Col } = Grid;
const BookNow = ({
	perTruck,
	service_type,
	data = {},
	spot_search_id = '',
}) => {
	const { handleBook = () => {}, loading } = useCreateCheckout({
		data,
		spot_search_id,
		source: 'contract',
	});

	const handleCreate = () => {
		handleBook();
	};

	const renderPricePerType = () => {
		if (service_type === 'air_freight' || service_type === 'ltl_freight') {
			return (
				<PerTruck>
					<Text size="12px">Price Per Shipment:</Text>
					<Text bold size="14px">
						{formatAmount({
							amount: data?.price,
							currency: data?.total_price_currency,
							options: {
								style: 'currency',
								currencyDisplay: 'symbol',
								maximumFractionDigits: 0,
							},
						})}
					</Text>
				</PerTruck>
			);
		}
		if (service_type === 'ftl_freight') {
			return (
				<PerTruck>
					<Text bold size="20px">
						{formatAmount({
							amount: data?.price,
							currency: data?.total_price_currency,
							options: {
								style: 'currency',
								currencyDisplay: 'symbol',
								maximumFractionDigits: 0,
							},
						})}
					</Text>
					<Text size="16px">/ truck</Text>
				</PerTruck>
			);
		}
		return null;
	};
	return (
		<Col md={3}>
			<BookingContainer>
				{renderPricePerType()}
				<ButtonContainer>
					<Text bold size="20px">
						{perTruck}
					</Text>
					<Button
						className="primary md"
						disabled={loading}
						onClick={() => handleCreate(data.id)}
					>
						Book now{' '}
					</Button>
				</ButtonContainer>
			</BookingContainer>
		</Col>
	);
};

export default BookNow;
