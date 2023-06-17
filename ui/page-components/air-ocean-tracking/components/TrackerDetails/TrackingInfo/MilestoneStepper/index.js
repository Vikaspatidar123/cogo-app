import { cl } from '@cogoport/components';

import { isFutureDate } from '../../../../utils/mergeMilestone';

import Card from './Card';
import styles from './styles.module.css';

function MilestoneStepper({ combineMileStoneList = [], trackingType = 'ocean' }) {
	const combineMileStoneListLength = combineMileStoneList.length;
	return (
		<div className={styles.container}>
			{combineMileStoneList.map((combineList, index) => {
				const currentMilestone = (combineList || []).slice(-1)[0];
				// const isLastMilestone = index === (combineMileStoneList.length - 1);
				// const nextMilestone = !isLastMilestone ? combineMileStoneList[index + 1][0] : null;

				const isCurrentMilestonePastOrPresent = !isFutureDate(currentMilestone?.event_date);
				// const isNextMilestonePastOrPresent = isLastMilestone ? false :
				// !isFutureDate(nextMilestone?.event_date);

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
