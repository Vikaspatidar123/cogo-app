import styles from './styles.module.css';

function TrackerCard({ activeTab }) {
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
			{/* <div>

			</div> */}
		</div>
	);
}
export default TrackerCard;
