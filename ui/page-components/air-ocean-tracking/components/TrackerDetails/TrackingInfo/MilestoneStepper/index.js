import Card from './Card';
import styles from './styles.module.css';

function MilestoneStepper({ combineMileStoneList = [] }) {
	const combineMileStoneListLength = combineMileStoneList.length;
	return (
		<div className={styles.container}>
			{combineMileStoneList.map((combineList, index) => (
				<div className={styles.milestone}>
					<div className={styles.stepper}>
						<div className={styles.dot} />
						{index !== combineMileStoneListLength - 1 && <div className={styles.line} />}
					</div>
					<div className={styles.card_container}>
						<Card combineList={combineList} />
					</div>
				</div>
			))}
		</div>
	);
}
export default MilestoneStepper;
