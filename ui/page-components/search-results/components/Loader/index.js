import { Placeholder, cl } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function Loader() {
	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<div className={styles.flex}>
					<Placeholder
						width="540px"
						height="40px"
						style={{ margin: '30px 30px 20px 30px' }}
					/>

					<Placeholder width="200px" height="30px" style={{ margin: 'auto' }} />

					<div className={cl`${styles.line_vrt} ${styles.horizontal}`} />

					<Placeholder width="200px" style={{ margin: '10px 0px 10px 20px' }} />
				</div>

				<div className={styles.flex_display}>
					<div className={styles.line_vrt} />

					<div className={styles.flex} style={{ margin: 'auto' }}>
						<Placeholder width="160px" style={{ margin: 'auto' }} />

						<Placeholder
							width="160px"
							height="44px"
							style={{
								margin       : 'auto',
								marginTop    : '30px',
								marginBottom : '20px',
							}}
						/>

						<Placeholder width="160px" style={{ margin: 'auto' }} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default Loader;
