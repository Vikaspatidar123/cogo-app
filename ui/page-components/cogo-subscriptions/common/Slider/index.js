import React, { useEffect } from 'react';

import styles from './styles.module.css';

function Slider({
	durationValue,
	setDurationValue,
	min,
	max,
	onChange = () => {},
	label,
	data,
}) {
	const handleChange = (event) => {
		onChange(event);
		setDurationValue(event.target.value);
	};

	useEffect(() => {
		if (data) setDurationValue(data);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data]);

	return (
		<div className={styles.container}>
			<div className={styles.flex}>
				<input
					className={styles.slider}
					type="range"
					min={min}
					max={max}
					id="active_oc_sc_transit_time_input"
					onChange={handleChange}
					value={durationValue}
				/>
			</div>
			<div className={`${styles.flex} ${styles.marker}`}>
				{([1, 2, 3, 4, 5, 6, 7, 8, 9] || []).map(() => (
					<div className={styles.mark} />
				))}
			</div>
			<div className={`${styles.flex} ${styles.flexrange}`}>
				{(label || []).map((value) => (
					<div className={styles.text} key={value}>
						{value}
					</div>
				))}
			</div>
		</div>
	);
}

export default Slider;
