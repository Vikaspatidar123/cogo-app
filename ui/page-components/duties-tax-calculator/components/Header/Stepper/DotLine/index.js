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
							isCompleted && styles.completed
						} ${styles.line}`}
					/>
				)}
				<div className={`${isOngoing && styles.ongoing} ${isCompleted && styles.completed} ${styles.dot}`}>
					{isCompleted && <IcMTick fill="#fff" width={14} height={14} />}
				</div>
				{!isLast && (
					<div
						className={` ${isMobile ? styles.is_mobile : styles.not_mobile}
						${isOngoing && styles.ongoing} ${isCompleted && styles.completed}`}
					/>
				)}
			</div>
			<div
				className={` ${isMobile ? styles.is_mobile : styles.not_mobile} ${
					isFirst && styles.firstElement
				} ${isLast && styles.lastElement} ${isCompleted && styles.completed} ${styles.text}`}
			>
				{subHeading}
			</div>
		</div>
	);
}

export default DotLine;
