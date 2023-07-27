import { Placeholder } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function Loader() {
	return (
		<div>
			<div className={styles.flex}>
				<div className={styles.box}>
					<div className={styles.panel}>
						<Placeholder width="480px" height="80px" />

						<div className={styles.buttons}>
							<Placeholder width="105px" height="20px" />
							<Placeholder
								width="105px"
								height="20px"
								style={{ marginTop: '12px' }}
							/>
						</div>
					</div>
				</div>
			</div>
			<div className={styles.flex}>
				<div className={styles.box}>
					<div className={styles.panel}>
						<Placeholder width="480px" height="80px" />

						<div className={styles.buttons}>
							<Placeholder width="105px" height="20px" />
							<Placeholder
								width="105px"
								height="20px"
								style={{ marginTop: '12px' }}
							/>
						</div>
					</div>
				</div>
			</div>
			<div className={styles.flex}>
				<div className={styles.box}>
					<div className={styles.panel}>
						<Placeholder width="480px" height="80px" />

						<div className={styles.buttons}>
							<Placeholder width="105px" height="20px" />
							<Placeholder
								width="105px"
								height="20px"
								style={{ marginTop: '12px' }}
							/>
						</div>
					</div>
				</div>
			</div>
			<div className={styles.flex}>
				<div className={styles.box}>
					<div className={styles.panel}>
						<Placeholder width="480px" height="80px" />

						<div className={styles.buttons}>
							<Placeholder width="105px" height="20px" />
							<Placeholder
								width="105px"
								height="20px"
								style={{ marginTop: '12px' }}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Loader;
