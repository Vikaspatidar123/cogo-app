import React from 'react';

// import { StyledStep, StyledSteps } from './styles';
import styles from './styles.module.css';

function Steps({ stepList, current }) {
	return (
		<div className={styles.content}>
			{stepList.map((step, idx) => (
				<div className={styles.steps}>
					<div className={styles.prev_arrow} />
					<p className={styles.heading}>{step.heading}</p>
					<div className={styles.next_arrow} />
				</div>
			))}
		</div>
	);
}

export default Steps;
