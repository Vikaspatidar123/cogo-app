import React from 'react';

import Location from './Location';
import styles from './styles.module.css';

function SummarySection({ mode, location, fields, setLocation, errors }) {
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
				/>
				<Location
					type="destination"
					value={location.destination}
					fields={fields}
					setLocation={setLocation}
					location={location}
					mode={mode}
					errors={errors}
				/>
			</div>
		</div>
	);
}

export default SummarySection;
