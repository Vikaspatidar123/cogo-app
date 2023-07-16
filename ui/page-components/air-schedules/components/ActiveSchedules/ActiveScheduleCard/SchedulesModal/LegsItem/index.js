import { Pill } from '@cogoport/components';
import { differenceInDays } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import formatDate from '@/ui/commons/utils/formatDate';

function LegsItem({ legItem = {} }) {
	const locationsList = legItem?.display_details || [];
	const originSchedule = locationsList.filter((item) => item.id
		=== legItem.origin_airport_id)[0]?.display_name || 'Origin';

	const { t } = useTranslation(['oceanSchedule']);

	const destinationSchedule = locationsList.filter((item) => item.id === legItem.destination_airport_id)[0]
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
						{formatDate({
							date       : legItem?.departure,
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
							formatType : 'date',
						})}
					</div>
					<div className={styles.date_container}>
						{formatDate({
							date       : legItem?.arrival,
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
							formatType : 'date',
						})}
					</div>
				</div>
				<div className={styles.main_pill_container}>
					<Pill size="md" color="#FEF3E9">
						{differenceInDays(new Date(legItem?.arrival), new Date(legItem?.departure))}
						{t('airSchedule:days_text')}
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
