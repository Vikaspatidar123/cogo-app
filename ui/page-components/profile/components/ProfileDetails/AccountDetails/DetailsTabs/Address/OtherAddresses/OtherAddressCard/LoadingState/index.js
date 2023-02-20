import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

function LoadingState() {
	return (
		<div className={styles.main_container}>
			<Placeholder width="15%" margin="0 0 16px 0" />
			<div className={styles.flex}>
				{Array(4)
					.fill()
					.map(() => (
						<div className={styles.container}>
							<Placeholder width="50%" margin="0 0 8px 0" />
							<Placeholder width="80%" margin="0 0 8px 0" />
						</div>
					))}
			</div>
		</div>
	);
}

export default LoadingState;
