import { Button } from '@cogoport/components';

import styles from '../styles.module.css';

import formatAmount from '@/ui/commons/utils/formatAmount';

function Footer({
	cogoPolicyNo,
	totalApplicableCharges,
	netPremium,
	insuranceLoading,
	setNoteModal,
}) {
	return (
		<div className={cogoPolicyNo ? styles.footer_center : styles.footer}>
			{cogoPolicyNo ? (
				<div className={styles.textforpreview}>
					Premium:
					{' '}
					{formatAmount({
						amount   : netPremium,
						currency : 'INR',
						options  : {
							notation : 'standard',
							le       : 'currency',
						},
					})}
					<div className={styles.inclusive}>(inclusive of taxes)</div>
				</div>
			) : null}
			{!cogoPolicyNo && (
				<>
					<div className={styles.text}>
						Amount Payable:
						{' '}
						{formatAmount({
							amount   : totalApplicableCharges,
							currency : 'INR',
							options  : {
								ation : 'standard',
								le    : 'currency',
							},
						})}
					</div>
					<Button
						loading={insuranceLoading}
						disabled={insuranceLoading}
						onClick={() => {
							setNoteModal(true);
						}}
						type="button"
					>
						Continue
					</Button>
				</>
			)}
		</div>
	);
}

export default Footer;
