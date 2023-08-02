import { useState } from 'react';

import ReprtTypeSelectOptions from './ReprtTypeSelectOptions';
import SelectUserlist from './SelectUserlist';
import styles from './styles.module.css';
import TimeZoneSelectFilter from './TimeZoneSelectFilter';

function EditDetails({ data, hookSetter, isLoading, props }) {
	const { control } = props || {};
	const [value, onChange] = useState('daily');

	return (
		<div className={styles.conatiner}>
			<ReprtTypeSelectOptions control={control} onChange={onChange} value={value} />
			<TimeZoneSelectFilter control={control} value={value} />
			<SelectUserlist data={data} hookSetter={hookSetter} isLoading={isLoading} />
		</div>
	);
}
export default EditDetails;
