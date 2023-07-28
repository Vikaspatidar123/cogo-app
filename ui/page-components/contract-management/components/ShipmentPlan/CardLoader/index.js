import { Placeholder } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

const LOADER_ARR = [...Array(4).keys()];

function CardLoader() {
	return (
		<div className={styles.container}>
			{LOADER_ARR.map((ele) => (
				<div key={ele} className={styles.section}>
					{LOADER_ARR.map((info) => (
						<Placeholder key={info} width="250px" height="20px" margin="10px" />
					))}
				</div>
			))}
		</div>
	);
}

export default CardLoader;
