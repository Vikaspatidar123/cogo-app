import { Tooltip } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';

import styles from './styles.module.css';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import formatDate from '@/ui/commons/utils/formatDate';

function ScheduleDetails({ list }) {
	return (
		<div className={styles.container}>
			{(list || []).map((item) => (
				<div className={styles.card}>
					<div className={styles.section}>
						<div className={styles.label}>ETD</div>
						<div className={styles.value}>
							{item.departure
								? formatDate({
									date       : item.departure,
									dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
									formatType : 'date',
								})
								: '-'}
						</div>
					</div>

					<div className={styles.section}>
						<div className={styles.label}>ETA</div>
						<div className={styles.value}>
							{item.arrival
								? formatDate({
									date       : item.arrival,
									dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
									formatType : 'date',
								})
								: '-'}
						</div>
					</div>
					<div className={styles.section}>
						<div className={styles.label}>Transit Time</div>
						<div className={styles.value}>{`${item.transit_time} Days`}</div>
					</div>
					<div className={styles.section}>
						<div className={styles.label}>No of stops</div>
						<div className={`${styles.value} ${styles.blue}`}>
							{item.number_of_stops === 0
								? 'Direct'
								: `${item.number_of_stops} stops`}
						</div>
					</div>

					<div className={styles.section}>
						<div className={styles.label}>Gate-in (cut off)</div>
						<div className={styles.value}>{item.gate_in_cutoff ? item.gate_in_cutoff : '-'}</div>
					</div>

					<div className={styles.section}>
						<div className={styles.label}>Reliability Score</div>
						<div className={`${styles.value} ${styles.green}`}>
							{item.reliability_score ? `${item.reliability_score} %` : '-'}
							<Tooltip
								placement="top"
								theme="light"
								content="Reliability score is calculated on the basis of accuracy of schedules"
							>
								<div>
									<IcMInfo width="16px" height="16px" fill="black" />
								</div>
							</Tooltip>
						</div>
					</div>
				</div>
			))}
			{list.length === 0 && <div className={styles.empty_msg}>No Schedule Found</div>}
		</div>
	);
}

export default ScheduleDetails;
