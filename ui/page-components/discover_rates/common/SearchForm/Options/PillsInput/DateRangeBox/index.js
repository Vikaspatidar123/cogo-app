import { DateRangepicker } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function DateRangeBox({ date = {}, setDate = () => {}, mobile = false }) {
	return (
		<div className={styles.container}>
			<DateRangepicker
				value={date}
				onChange={setDate}
				minDate={new Date()}
				isMobile={mobile}
			/>
		</div>
	);
}

export default DateRangeBox;
