import { Pill } from '@cogoport/components';
import { format, differenceInDays } from '@cogoport/utils';

import styles from './styles.module.css';

function LegsItem({ legItem = {} }) {
	const locationsList = legItem?.display_details || [];
	const originSchedule =	 locationsList.filter((item) => item.id
    === legItem.origin_airport_id)[0]?.display_name || 'Origin';

	const destinationSchedule =	locationsList.filter((item) => item.id === legItem.destination_airport_id)[0]
		?.display_name || 'Destination';
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				{legItem?.transport_type}
				:
				<span className="bold">{legItem?.transport_name}</span>
			</div>
			<div>
				<div className={styles.dates_container}>
					<div className={styles.date_container}>
						{format(legItem?.departure, 'dd MMM yyyy')}
					</div>
					<div className={styles.date_container}>
						{format(legItem?.arrival, 'dd MMM yyyy')}
					</div>
				</div>
				<div className={styles.main_pill_container}>
					<Pill size="md" color="#FEF3E9">
						{differenceInDays(new Date(legItem?.arrival), new Date(legItem?.departure))}
						Days
					</Pill>
				</div>
				<div className={styles.dot_circle}>
					<div className={styles.circle1} />
					<div className={styles.line} />
					<div className={styles.circle2} />
				</div>
				<div>
					<div className={styles.port_container}>
						<div className={styles.port_code}>{originSchedule}</div>
						<div>{destinationSchedule}</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default LegsItem;
