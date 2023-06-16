import { Button } from '@cogoport/components';
import { IcMEmail, IcMCall } from '@cogoport/icons-react';
import { startCase, isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

function SignatoryDetails({ setSignatoriesUpdated = () => {}, getCreditRequestResponse = {} }) {
	const {
		signatories = {},
		documents:{ paylater_agreement },
		sample_paylater_agreement,
		is_sign_mode_digital,
	} = getCreditRequestResponse || {};

	const showChangeSignatory = isEmpty(paylater_agreement);

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
			{!(sample_paylater_agreement && is_sign_mode_digital) && (
				<div className={styles.button_wrapper}>
					<Button themeType="secondary" onClick={() => setSignatoriesUpdated(false)}>
						Change Signatory
					</Button>
				</div>
			)}
		</div>
	);
}

export default SignatoryDetails;
