import React, { useState } from 'react';

import Calculator from '../../PackageWeightCalculator';

import styles from './styles.module.css';

function CBMCalculator({ onChange, formValues, item }) {
	const [showCalculator, setShowCalculator] = useState(false);

	if (!showCalculator) {
		return (
			<div className={styles.col} key={item.name}>
				<div className={styles.calculate} type="button" onClick={() => setShowCalculator(true)}>
					Calculate
				</div>
			</div>
		);
	}

	return (
		<div className={styles.col} key={item.name}>
			<Calculator
				value={{
        	weight : Number(formValues?.weight) || 0,
        	volume : Number(formValues.volume) || 0,
				}}
				onChange={onChange}
				onBack={() => {
        	setShowCalculator(false);
				}}
			/>
		</div>
	);
}

export default CBMCalculator;
