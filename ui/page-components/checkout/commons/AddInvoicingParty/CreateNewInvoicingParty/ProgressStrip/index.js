import React from 'react';

import SingleStrip from './SingleStrip';
import styles from './styles.module.css';

function ProgressStrip({ currentStep = '', progressSteps = [] }) {
	return (
		<div className={styles.container}>
			<div className={styles.steps}>
				{progressSteps?.map((item, index) => (
					<>
						<div className={styles.step}>
							<SingleStrip
								item={item}
								currentStep={currentStep}
								count={index + 1}
							/>
						</div>
						{index < progressSteps.length - 1 ? <div className={styles.line} /> : null}
					</>
				))}
			</div>
		</div>
	);
}

export default ProgressStrip;
