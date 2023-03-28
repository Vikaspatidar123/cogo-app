import { Button } from '@cogoport/components';

import useCreateCheckout from '../../../../hooks/useCreateCheckout';

import styles from './styles.module.css';

import formatAmount from '@/ui/commons/utils/formatAmount';

function BookNow({
	perTruck,
	service_type,
	data = {},
	spot_search_id = '',
}) {
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
				<div className={styles.per_truck}>
					<div style={{ fontSize: '12px' }}>Price Per Shipment:</div>
					<div style={{ fontWeight: 'bold' }}>
						{formatAmount({
							amount   : data?.price,
							currency : data?.total_price_currency,
							options  : {
								style                 : 'currency',
								currencyDisplay       : 'symbol',
								maximumFractionDigits : 0,
							},
						})}
					</div>
				</div>
			);
		}
		if (service_type === 'ftl_freight') {
			return (
				<div className={styles.per_truck}>
					<div style={{ fontWeight: 'bold', fontSize: '20px' }}>
						{formatAmount({
							amount   : data?.price,
							currency : data?.total_price_currency,
							options  : {
								style                 : 'currency',
								currencyDisplay       : 'symbol',
								maximumFractionDigits : 0,
							},
						})}
					</div>
					<div style={{ fontSize: '16px' }}>/ truck </div>
				</div>
			);
		}
		return null;
	};
	return (
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			<div className={styles.booking_container}>
				{renderPricePerType()}
				<div className={styles.button_container}>
					<div style={{ fontWeight: 'bold', fontSize: '20px' }}>
						{perTruck}
					</div>
					<Button
						className="primary md"
						disabled={loading}
						onClick={() => handleCreate(data.id)}
					>
						Book now
						{' '}
					</Button>
				</div>
			</div>
		</div>
	);
}

export default BookNow;
