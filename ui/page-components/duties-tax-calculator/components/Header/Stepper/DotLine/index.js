import { IcMTick } from '@cogoport/icons-react';

import styles from './styles.module.css';

function DotLine({
	subHeading = '',
	isFirst = false,
	isLast = false,
	isCompleted = false,
	isOngoing = false,
	isMobile = false,
}) {
	return (
		<div className={styles.container}>
			<div className={styles.row}>
				{!isFirst && (
					<div
						className={` ${isMobile ? styles.is_mobile : styles.not_mobile} ${
							isCompleted && 'completed'
						} ${styles.line}`}
					/>
				)}
				<div className={`${isOngoing && 'ongoing'} ${isCompleted && 'completed'} ${styles.dot}`}>
					{isCompleted && <IcMTick fill="#fff" width={14} height={14} />}
				</div>
				{!isLast && (
					<div
						className={` ${isMobile ? 'is-mobile' : 'not-mobile'} ${
							isOngoing && 'ongoing'
						} ${isCompleted && 'completed'}`}
					/>
				)}
			</div>
			<div
				className={` ${isMobile ? 'is-mobile' : 'not-mobile'} ${
					isFirst && 'firstElement'
				} ${isLast && 'lastElement'} ${isCompleted && 'completed'} ${styles.text}`}
			>
				{subHeading}
			</div>
		</div>
	);
}

export default DotLine;
