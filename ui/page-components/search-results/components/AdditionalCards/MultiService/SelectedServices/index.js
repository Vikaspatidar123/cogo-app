import React from 'react';

import styles from './styles.module.css';

function SelectedServices({ }) {
	return (
		<div className={styles.container}>
			<div className={styles.heading}>Select Your Services</div>

			<div className={styles.sub_heading}>
				Add services as per your requirement and then select the ones you want to create an enquiry on
			</div>

			<div style={{ marginTop: 32 }}>
				{/* <BookingRoute data={detail} showServiceDetails={false} /> */}
			</div>
		</div>
	);
}
export default SelectedServices;
