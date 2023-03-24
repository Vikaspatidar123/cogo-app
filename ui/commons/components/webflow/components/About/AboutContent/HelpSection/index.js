import React from 'react';

import styles from './styles.module.css';

function HelpSection({ helpSection }) {
	return (
		<div className={styles.container}>
			<div className={styles.heading}>{helpSection.heading}</div>
			<div className={styles.ul}>
				{helpSection.items.map((item, i) => (
					<div className={styles.li} key={`help_${i + 1}`}>{item}</div>
				))}
			</div>
		</div>
	);
}

export default HelpSection;
