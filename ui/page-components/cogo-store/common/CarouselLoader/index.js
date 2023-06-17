import { Placeholder } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function CarouselLoader() {
	return (
		<div className={styles.container}>
			{[...Array(4).keys()].map((item) => (
				<div className={styles.wrapper} key={item}>
					<Placeholder width="100%" height="160px" />
					<div className={styles.footer}>
						<Placeholder width="60%" height="24px" />
						<Placeholder width="100%" height="42px" margin="16px 0 0 0" />
					</div>
				</div>
			))}
		</div>
	);
}

export default CarouselLoader;
