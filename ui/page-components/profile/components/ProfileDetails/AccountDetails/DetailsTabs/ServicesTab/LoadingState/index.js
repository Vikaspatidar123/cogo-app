import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

function LoadingState() {
	return (
		<div className={styles.container}>
			{Array(2)
				.fill()
				.map(() => (
					<>
						<Placeholder width="70%" margin="0 0 16px 0" />
						{Array(2)
							.fill()
							.map(() => (
								<div className={styles.sub_container}>
									{Array(5)
										.fill()
										.map(() => (
											<Placeholder
												height="90px"
												width="70%"
												margin="0 16px 16px 0"
											/>
										))}
								</div>
							))}
					</>
				))}
		</div>
	);
}

export default LoadingState;
