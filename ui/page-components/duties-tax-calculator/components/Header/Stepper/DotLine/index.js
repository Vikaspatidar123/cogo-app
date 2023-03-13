import { cl } from '@cogoport/components';
import { IcMTick } from '@cogoport/icons-react';

import styles from './styles.module.css';

function DotLine({
	subHeading = '',
	isFirst = false,
	isLast = false,
	isCompleted = false,
	isOngoing = false,
}) {
	return (
		<div className={styles.container}>
			<div className={styles.row}>
				{!isFirst && (
					<div
						className={cl`${styles.line} ${styles.is_mobile} ${styles.not_mobile} ${
							isCompleted && styles.completed
						} `}
					/>
				)}
				<div className={cl`${styles.dot} 
					${isOngoing && styles.ongoing_dot} ${isCompleted && styles.completed} `}
				>
					{isCompleted && <IcMTick fill="#fff" width={14} height={14} />}
				</div>
				{!isLast && (
					<div
						className={cl`${styles.line} ${styles.is_mobile} ${styles.not_mobile}
						${isOngoing && styles.ongoing} ${isCompleted && styles.completed}`}
					/>
				)}
			</div>
			<div
				className={cl`${styles.text} ${styles.is_mobile} ${styles.not_mobile} ${
					isFirst && styles.first_element
				} ${isLast && styles.last_element} ${isCompleted && styles.completed_txt} `}
			>
				{subHeading}
			</div>
		</div>
	);
}

export default DotLine;
