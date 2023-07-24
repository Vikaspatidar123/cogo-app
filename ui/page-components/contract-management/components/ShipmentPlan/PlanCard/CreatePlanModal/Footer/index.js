import { Button } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function Footer({
	setShowModal = () => {},
	handleSubmit = () => {},
	handleFormSubmit = () => {},
	loading = false,
}) {
	return (
		<div className={styles.container}>
			<div className={styles.message}>*Average transit time in your trade route is 30 days</div>

			<div className={styles.actions}>
				<Button onClick={() => setShowModal(false)} themeType="secondary" className={styles.cancel_btn}>
					Cancel
				</Button>
				<Button disable={loading} themeType="accent" onClick={handleSubmit(handleFormSubmit)}>
					Confirm
				</Button>
			</div>
		</div>
	);
}

export default Footer;
