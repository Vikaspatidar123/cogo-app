import Item from './Item';
import styles from './styles.module.css';

function CogoAssuredSchedule({ rate, selectAssuredSchedule }) {
	return (
		<div className={styles.container}>
			<div className={styles.label}>Select Sailing Week</div>

			<div className={styles.sailing_weeks}>
				{rate.allAssuredRates.map((item) => (
					<Item
						key={item.validity_id}
						item={item}
						selected={rate.validity_id}
						selectAssuredSchedule={selectAssuredSchedule}
					/>
				))}
			</div>
		</div>
	);
}

export default CogoAssuredSchedule;
