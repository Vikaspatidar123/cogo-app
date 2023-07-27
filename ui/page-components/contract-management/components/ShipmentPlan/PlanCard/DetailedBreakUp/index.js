import PriceBreakup from '../../PriceBreakup';

import BreakUpCard from './BreakUpCard';
import styles from './styles.module.css';

function DetailedBreakUp({ freightDetails, source, convenienceRate }) {
	return (
		<div className={styles.container}>
			{freightDetails.map((service) => (
				<BreakUpCard key={service?.id} service={service} source={source} />
			))}
			<PriceBreakup details={[convenienceRate]} source={source} />
		</div>
	);
}

export default DetailedBreakUp;
