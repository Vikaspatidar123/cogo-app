import { Placeholder } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function Loading() {
	return (
		<div className={styles.loading_container}>
			<div className={styles.service_wrap}>
				<Placeholder width="50px" />
				<Placeholder
					width="50px"
					style={{ marginTop: '10px' }}
				/>
			</div>
			<div className={styles.line} />

			<div style={{ padding: '10px 20px', display: 'flex' }}>
				<div style={{ display: 'block' }}>
					<Placeholder width="200px" />
					<Placeholder
						width="150px"
						style={{ marginTop: '10px' }}
					/>
				</div>

				<div style={{ marginLeft: '30px', display: 'block' }}>
					<Placeholder width="200px" />
					<Placeholder
						width="150px"
						style={{ marginTop: '10px' }}
					/>
				</div>
			</div>

			<div className={styles.flex_display}>
				<div className={styles.line} />

				<div style={{ display: 'block', padding: '10px 20px' }}>
					<Placeholder width="200px" />
					<Placeholder width="200px" style={{ marginTop: '10px' }} />
				</div>
			</div>
		</div>
	);
}

export default Loading;
