import ExchangeRates from './ExchangeRates';
import ServiceItem from './ServiceItem';
import styles from './styles.module.css';

function CheckoutServicesCostBreakdown({
	allServices,
	rate,
	summary,
	refetch,
}) {
	return (
		<div className={styles.container}>
			<ExchangeRates rate={rate} summary={summary} />
			{allServices.map((service) => (
				<ServiceItem
					key={service.name}
					service={service}
					summary={summary}
					refetch={refetch}
				/>
			))}
		</div>
	);
}

export default CheckoutServicesCostBreakdown;
