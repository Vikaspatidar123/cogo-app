import { IcMQuotations } from '@cogoport/icons-react';

import styles from './styles.module.css';

function EmptyState({ text }) {
	return (
		<div className={styles.container}>
			<IcMQuotations width={200} height={200} fill="#d3d3d3" />
			<div className={styles.text}>
				{text}
			</div>
		</div>
	);
}

export default EmptyState;
