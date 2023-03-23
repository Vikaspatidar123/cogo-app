import { RadioGroup } from '@cogoport/components';

import { SCHEDULE_OPTIONS } from '../../../constants';

import styles from './styles.module.css';

function Schedule({ schedule, setSchedule = () => {}, disableOptions }) {
	return (
		<div className={styles.container}>
			<div className={styles.title}>Frequency Distribution</div>
			<div className={styles.options}>
				<RadioGroup
					className="primary lg"
					options={SCHEDULE_OPTIONS}
					value={schedule}
					onChange={(item) => setSchedule(item)}
					disabled={disableOptions}
				/>
			</div>
		</div>
	);
}

export default Schedule;
