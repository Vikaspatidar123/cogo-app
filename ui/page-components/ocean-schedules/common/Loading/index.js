import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

function Loading() {
	return [...Array(3).keys()].map(() => (
		<div className={styles.container}>
			<Placeholder
				height="165px"
				width="669px"
				margin="0px 0px 20px 0px"
				className={styles.card}
			/>
			<Placeholder
				height="165px"
				width="669px"
				margin="0px 0px 20px 0px"
				className={styles.card}
			/>
		</div>
	));
}
export default Loading;
