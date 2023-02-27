import useFetchTrackers from '../../hooks/useFetchTrackers';

import Card from './Card';
import styles from './styles.module.css';

function TrackerCard({ activeTab }) {
	const { fetchTrackers, trackers } = useFetchTrackers();

	console.log(trackers, 'dataaaaaaaaaa');

	const trackerList = trackers?.list;
	console.log('ertyuiovb', trackerList);
	return (
		<div className={styles.container}>
			<div className={styles.head}>
				<div>
					{activeTab}
				</div>
				<div>
					<div className={styles.status}>Archived Shipments</div>
				</div>
			</div>
			<div>
				{trackerList?.map((tracker, index) => (
					<Card trackerDetails={tracker} />
				))}
			</div>
		</div>
	);
}
export default TrackerCard;
