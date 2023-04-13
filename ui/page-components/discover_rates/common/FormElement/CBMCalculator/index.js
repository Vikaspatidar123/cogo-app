import { Button } from '@cogoport/components';
import React, { useState } from 'react';

import Calculator from '../../PackageWeightCalculator';

import styles from './styles.module.css';

function CBMCalculator({ onChange, formValues, item, setValue }) {
	const [showCalculator, setShowCalculator] = useState(false);

	if (!showCalculator) {
		return (
			<div className={styles.col} key={item.name}>
				<Button className={styles.calculate} themeType="link" onClick={() => setShowCalculator(true)}>
					Calculate
				</Button>
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
				setValue={setValue}
				onChange={onChange}
				onBack={() => {
					setShowCalculator(false);
				}}
			/>
		</div>
	);
}

export default CBMCalculator;
