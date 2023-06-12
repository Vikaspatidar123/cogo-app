import React, { useEffect, useState } from 'react';

import styles from './styles.module.css';

function ProgressCircle({
	radius,
	stroke,
	progress,
	progressColor = 'orange',
	backgroundColor = '#ccc',
}) {
	const [state, setState] = useState({});

	useEffect(() => {
		const normalizedRadius = radius - stroke * 2;
		const circumference = normalizedRadius * 2 * Math.PI;
		setState({ normalizedRadius, circumference });
	}, [radius, stroke]);

	const { circumference = 0, normalizedRadius = 0 } = state;

	const strokeDashoffset = circumference - (progress / 100) * circumference;

	return (
		<div className={styles.progress_container}>
			<svg height={radius * 2} width={radius * 2}>
				<circle
					stroke={backgroundColor}
					strokeWidth={stroke}
					fill="transparent"
					r={normalizedRadius}
					cx={radius}
					cy={radius}
				/>
				<circle
					stroke={progressColor}
					fill="transparent"
					strokeWidth={stroke}
					strokeDasharray={`${circumference} ${circumference}`}
					strokeLinecap="round"
					style={{ strokeDashoffset }}
					r={normalizedRadius}
					cx={radius}
					cy={radius}
				/>
			</svg>
		</div>
	);
}

export default ProgressCircle;
