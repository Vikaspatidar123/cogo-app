import { Button } from '@cogoport/components';
import { IcMEmail, IcMCall } from '@cogoport/icons-react';

import styles from './styles.module.css';

function SignatoryDetails() {
	return (
		<div>
			<div className={styles.container}>
				<div className={styles.name}>
					Name
				</div>
				<div className={styles.details}>
					<div className={styles.email}>
						<IcMEmail fill="#4F4F4F" />
						abc@gmail.com
					</div>
					<div className={styles.mobile}>
						<IcMCall fill="#4F4F4F" />
						910002982787
					</div>
				</div>
			</div>
			<div className={styles.button_wrapper}>
				<Button themeType="secondary">
					Change Signatory
				</Button>
			</div>
		</div>
	);
}

export default SignatoryDetails;
