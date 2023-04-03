import React from 'react';

// import { StyledStep, StyledSteps } from './styles';
import styles from './styles.module.css';

function Steps({ stepList, current }) {
	return (
		<div className={styles.content}>
			{stepList.map((step, idx) => (
				<div className={`${styles.steps} ${idx === current ? styles.active : ''}`}>
					<p className={styles.heading}>{step.heading}</p>
				</div>
			))}
		</div>
	);
}

export default Steps;
