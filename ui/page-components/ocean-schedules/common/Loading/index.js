import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

function Loading({ home = false }) {
	return [...Array(3).keys()].map(() => (
		<div className={home ? styles.box : styles.container}>
			<Placeholder
				height="165px"
				width={home ? '670px' : '1000px'}
				margin="0px 0px 20px 0px"
				className={styles.card}
			/>
			{home && (
				<Placeholder
					height="165px"
					width="670px"
					className={styles.card}
				/>
			)}
		</div>
	));
}
export default Loading;
