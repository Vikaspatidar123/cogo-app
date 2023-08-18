import { cl } from '@cogoport/components';

import Card from './Card';
import styles from './styles.module.css';

const isFutureDate = (inputDate) => new Date() < new Date(inputDate);

function MilestoneStepper({ combineMileStoneList = [], trackingType = 'ocean' }) {
	const combineMileStoneListLength = combineMileStoneList.length;
	return (
		<div className={styles.container}>
			{combineMileStoneList.map((combineList, index) => {
				const currentMilestone = (combineList || []);
				const isCurrentMilestonePastOrPresent = !isFutureDate(currentMilestone?.event_date);

				return (
					<div key={currentMilestone?.id} className={styles.milestone}>
						<div className={cl`${styles.stepper}
						${isCurrentMilestonePastOrPresent ? styles.finish_milestone : ''}`}
						>
							<div className={styles.dot} />
							{index !== combineMileStoneListLength - 1 && <div className={styles.line} />}
						</div>
						<div className={styles.card_container}>
							<Card combineList={combineList} trackingType={trackingType} />
						</div>
					</div>
				);
			})}
		</div>
	);
}
export default MilestoneStepper;
