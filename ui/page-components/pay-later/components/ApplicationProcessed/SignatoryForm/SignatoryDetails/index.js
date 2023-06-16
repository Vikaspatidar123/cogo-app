import { Button } from '@cogoport/components';
import { IcMEmail, IcMCall } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function SignatoryDetails({
	method = '',
	setChangeSignatory = () => {},
	getCreditRequestResponse = {},
}) {
	const { signatories = {} } = getCreditRequestResponse || {};

	const { name = '', email = '', mobile_number = '' } = signatories?.[0] || {};
	return (
		<div>
			<div className={styles.container}>
				<div className={styles.name}>
					{startCase(name)}
				</div>
				<div className={styles.details}>
					<div className={styles.email}>
						<IcMEmail fill="#4F4F4F" />
						{email}
					</div>
					<div className={styles.mobile}>
						<IcMCall fill="#4F4F4F" />
						{mobile_number}
					</div>
				</div>
			</div>
			{method === 'physical' && (
				<div className={styles.button_wrapper}>
					<Button
						themeType="secondary"
						onClick={() => setChangeSignatory(true)}
					>
						Change Signatory
					</Button>
				</div>
			)}
		</div>
	);
}

export default SignatoryDetails;
