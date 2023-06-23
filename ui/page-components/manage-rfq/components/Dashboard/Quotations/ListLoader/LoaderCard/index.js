import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

function LoaderCard() {
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.left_stats}>
					<Placeholder radius="10px" height="20px" width="20%" margin="0 10px 0 0" />
					<Placeholder radius="10px" height="20px" width="10%" margin="0 10px 0 0" />
					<Placeholder radius="10px" height="20px" width="30%" />
				</div>
				<div className={styles.right_stats}>
					<Placeholder radius="10px" height="20px" width="10%" margin="0 10px 0 0" />
					<Placeholder radius="10px" height="20px" width="30%" />
				</div>
			</div>

			<div className={styles.details}>
				{[...Array(3)].map(() => (
					<>
						<div className={styles.ports}>
							{[...Array(2)].map(() => (
								<div className={styles.port}>
									<Placeholder
										radius="10px"
										height="20px"
										width="90%"
										margin="0 0 10px 0"
										duration="0.2s"
									/>
									<Placeholder radius="10px" height="20px" width="50%" />
								</div>
							))}
						</div>
						<div className={styles.line} />
					</>
				))}

				<div className={styles.actions}>
					<Placeholder radius="10px" height="24px" width="100%" margin="0 0 16px 0" />
					<Placeholder radius="10px" height="24px" width="100%" />
				</div>
			</div>
		</div>
	);
}

export default LoaderCard;
