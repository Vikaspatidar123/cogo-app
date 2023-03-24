import React from 'react';

import styles from './styles.module.css';

function Spinner({
	size = 10,
	borderWidth = 2,
	outerBorderColor = '#FEF1DF',
	spinBorderColor = '#FBD69F',
}) {
	return (
		<div
			className={styles.div}
			size={size}
			borderWidth={borderWidth}
			outerBorderColor={outerBorderColor}
			spinBorderColor={spinBorderColor}
		/>
	);
}

export default Spinner;
