import { Placeholder } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function LoaderCard() {
	return (
		<div className={styles.container}>
			<div className={styles.details_container}>
				<div className={styles.left_content}>
					<Placeholder
						height="20px"
						width="120px"
						margin="0 4px 0 0"
					/>
					<div className={styles.status_container}>
						{[...Array(2)].map(() => (
							<Placeholder
								height="20px"
								width="60px"
								margin="0 4px 0 0"
							/>
						))}
					</div>
				</div>
				<div className={styles.right_content}>
					<Placeholder
						height="20px"
						width="120px"
						margin="0 4px 0 0"
					/>
					<div className={styles.status_container}>
						<Placeholder
							height="20px"
							width="60px"
							margin="0 4px 0 0"
						/>
					</div>
				</div>
			</div>

			<div>
				<div className={styles.styled_row}>
					{[...Array(3)].map(() => (
						<div className={styles.styled_col}>
							<div>
								<div className={styles.data_left}>
									<Placeholder height="18px" width="120px" />
								</div>

								<div className={styles.port_pair}>
									{[...Array(2)].map(() => (
										<Placeholder
											height="22px"
											width="160px"
											margin="0 0 4px 0px"
										/>
									))}
								</div>
								<div className={styles.actions}>
									{[...Array(2)].map(() => (
										<Placeholder height="16px" width="100px" />
									))}
								</div>
							</div>
						</div>
					))}

					<div className={styles.styled_col}>
						<div className={styles.action_card}>
							<Placeholder height="22px" width="130px" />

							<Placeholder
								height="22px"
								width="130px"
								margin="28px 0 0 0"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default LoaderCard;
