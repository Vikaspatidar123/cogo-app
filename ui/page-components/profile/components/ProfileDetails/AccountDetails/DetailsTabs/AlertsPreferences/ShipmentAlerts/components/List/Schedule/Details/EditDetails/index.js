import { useState } from 'react';

import ReprtTypeSelectOptions from './ReprtTypeSelectOptions';
import SelectUserlist from './SelectUserlist';
import styles from './styles.module.css';
import TimeZoneSelectFilter from './TimeZoneSelectFilter';

function EditDetails(props) {
	const { data, hookSetter, isLoading, reportData, formHooks, setUserIds, userIds } = props || {};
	const { control } = formHooks || {};
	const { schedule_type } = reportData || {};
	const [value, setValue] = useState(schedule_type || 'never');

	return (
		<div className={styles.conatiner}>
			<ReprtTypeSelectOptions control={control} onChange={setValue} value={value} />
			{value !== 'never' ? (
				<div>
					<TimeZoneSelectFilter control={control} value={value} reportData={reportData} />
					<SelectUserlist
						data={data}
						hookSetter={hookSetter}
						isLoading={isLoading}
						setUserIds={setUserIds}
						userIds={userIds}
					/>
				</div>
			) : null}
		</div>
	);
}
export default EditDetails;
