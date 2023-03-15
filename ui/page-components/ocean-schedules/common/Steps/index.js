import Steps, { Step } from 'rc-steps';
import React, { Fragment } from 'react';
import 'rc-steps/assets/index.css';

import styles from './styles.module.css';

function StepsComponent({ stepsList = [], style }) {
	const progressDotRenderer = (iconDot) => {
		const Icon = Fragment;
		return (
			<span className="rc-steps-icon">
				<div className={styles.icon_container}>
					<Icon size={1.5} />
				</div>
				{iconDot}
			</span>
		);
	};

	return (
		<Steps
			progressDot={progressDotRenderer}
			current={0}
			className={styles.styled_steps}
			style={style}
		>
			{stepsList.map((stepDetails) => (
				<Step
					title={stepDetails.title}
					description={stepDetails.description}
					className={styles.styled_step}
				/>
			))}
		</Steps>
	);
}

export default StepsComponent;
