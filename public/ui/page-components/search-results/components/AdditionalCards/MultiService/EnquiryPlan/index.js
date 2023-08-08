import { Button } from '@cogoport/components';
import { IcCFtick } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';
import { useSelector } from '@/packages/store';

function EnquiryPlan({ enquiryQuota }) {
	const { push } = useRouter();
	const { unPrefixedPath } = useSelector(({ general }) => ({ ...general }));
	const afterPaymentUrl = unPrefixedPath;

	const benefits = (
		<>
			<div className={styles.row} style={{ marginBottom: '8px' }}>
				<IcCFtick style={{ marginRight: 8 }} />
				<div className={styles.Benefit}>The best rates to give you a competitive edge</div>
			</div>

			<div className={styles.row}>
				<IcCFtick style={{ marginRight: 8 }} />
				<div className={styles.Benefit}>The quickest service in the business</div>
			</div>
		</>
	);

	const handleEnquiriesCount = () => {
		if (!enquiryQuota?.left_limit) {
			return null;
		}
		if (enquiryQuota?.left_limit === 0) {
			return 'no enquiries left!';
		}
		return `only ${enquiryQuota?.left_limit} enquiries left!`;
	};

	const freeLeft = (
		<div className={`${styles.Benefit} ${styles.trialLeft}`}>{handleEnquiriesCount()}</div>
	);

	return (
		<div className={styles.container}>
			<div className={styles.space_between}>
				<div style={{ display: 'flex' }}>
					<div className={styles.setting_icon}>
						<img
							src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/ic-settings.svg"
							alt="settings"
							width={24}
							height={24}
						/>
					</div>

					<div className={styles.main}>
						<div className={styles.plan_type} style={{ marginBottom: 8 }}>Basic Plan</div>
						<div className={styles.row}>
							<div className={`${styles.plan_type} ${styles.subType}`}>Paid</div>
							<div className={styles.mobile}>{freeLeft}</div>
						</div>
					</div>
				</div>

				<div className={styles.desktop}>{benefits}</div>

				<div>
					<div className={styles.desktop}>{freeLeft}</div>
					<Button
						className="mid uppercase"
						onClick={() => push(
							`/pricing/[service_type]?afterPaymentUrl=${afterPaymentUrl}`,
							`/pricing/spot-negotiation?afterPaymentUrl=${afterPaymentUrl}`,
						)}
					>
						Explore plan
					</Button>
				</div>
			</div>

			<div className={styles.mobile}>{benefits}</div>
		</div>
	);
}
export default EnquiryPlan;
