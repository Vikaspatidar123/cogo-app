import { Button } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function Rejected({ organizationData, setKycStatus }) {
	const formatArrayValues = (items, is_startcase = true) => {
		const formattedItem = items?.map((item) => (is_startcase ? startCase(item) : item));
		return formattedItem.join(', ') || '';
	};

	return (
		<>
			<div className={styles.container}>
				<div className={styles.rejection_text}>KYC rejected!</div>

				<div className={styles.detail_text}>
					The KYC application has been rejected. Please re-submit details to
					complete the KYC process.
				</div>

				{organizationData.kyc_rejection_reason ? (
					<div className={styles.detail_text}>
						Reason for rejection :
						{' '}
						<span className="red">{organizationData.kyc_rejection_reason}</span>
					</div>
				) : null}

				{(organizationData.kyc_rejection_feedbacks || []).length ? (
					<div className={styles.detail_text}>
						Remark :
						{' '}
						<span className="red">
							{formatArrayValues(organizationData.kyc_rejection_feedbacks)}
						</span>
					</div>
				) : null}
			</div>

			<div className={styles.button_container}>
				<Button onClick={() => setKycStatus('pending_from_user')}>
					Re-submit kyc
				</Button>
			</div>
		</>
	);
}

export default Rejected;
