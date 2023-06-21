import React from 'react';

import Location from './Location';
import styles from './styles.module.css';

function SummarySection({ mode, location, fields, setLocation, errors, control, setValue }) {
	return (
		<div className={styles.upper_container}>
			<div className={styles.container}>
				<Location
					type="origin"
					value={location.origin}
					fields={fields}
					setLocation={setLocation}
					location={location}
					mode={mode}
					errors={errors}
					control={control}
					setValue={setValue}
				/>
				<Location
					type="destination"
					value={location.destination}
					fields={fields}
					setLocation={setLocation}
					location={location}
					mode={mode}
					errors={errors}
					control={control}
					setValue={setValue}
				/>
			</div>
		</div>
	);
}

export default SummarySection;
