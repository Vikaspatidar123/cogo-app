import { useState } from 'react';

import styles from './styles.module.css';

import { RadioController } from '@/packages/forms';

const REPORT_TYPE_OPTIONS = [{
	name: 'daily', value: 'daily', label: 'Daily',
},
{
	name: 'weekly', value: 'weekly', label: 'Weekly',
},
{
	name: 'monthly', value: 'monthly', label: 'Monthly',
},
{
	name: 'never', value: 'naver', label: 'Never',
}];
function ReprtTypeSelectOptions({ control, onChange, value }) {
	return (
		<div>
			<div className={styles.text}>Select Frequency of sending the Status Report</div>
			<RadioController
				name="type"
				options={REPORT_TYPE_OPTIONS}
				handleChange={onChange}
				value={value}
				radioGroup
				control={control}
			/>
		</div>
	);
}

export default ReprtTypeSelectOptions;
