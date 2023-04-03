import { Button } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function AddRate({ type, setAddRate = () => {} }) {
	return (
		<div className={styles.container}>
			<div className={styles.detail_Ccn}>
				<img
					src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/rates.svg"
					alt="rates"
					width={56}
					height={56}
				/>
				<div>
					<div className={styles.detail_text} style={{ margin: '8px 0px 5px 0px' }}>
						{type !== 'rates-found'
							? 'No Rates Found!'
							: 'Not happy with the Rates Found ?'}
					</div>

					<div className={`${styles.detail_text} ${styles.lead_text}`}>
						Please add your sell price to book shipment. Make sure to gather
						market intelligence by talking to your customer, team members,
						managers, etc.
					</div>
				</div>
			</div>

			<div className={`${styles.detail_con} ${styles.btn}`}>
				<Button
					onClick={() => {
						setAddRate(true);
					}}
					className="primary md"
				>
					Proceed With Booking
				</Button>
			</div>
		</div>
	);
}

export default AddRate;
