import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

function LoadingState() {
	return (
		<div className={styles.main_container}>
			<Placeholder width="15%" margin="0 0 16px 0" />

			{[...Array(3).keys()].map((i) => (
				<div className={styles.flex} key={i} style={{ marginBottom: 24 }}>
					{[...Array(4).keys()].map((j) => (
						<div className={styles.container} key={j}>
							<Placeholder width="50%" margin="0 0 8px 0" />
							<Placeholder width="80%" margin="0 0 8px 0" />
						</div>
					))}
				</div>
			))}
		</div>
	);
}

export default LoadingState;
