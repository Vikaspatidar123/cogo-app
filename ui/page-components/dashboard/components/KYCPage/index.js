import { Button, Placeholder, Modal } from '@cogoport/components';
import { IcCFcrossInCircle, IcMArrowNext } from '@cogoport/icons-react';
import { useState } from 'react';

import useGetSubscription from '../../hooks/useGetSubscription';

import styles from './styles.module.css';
import VerifiedKyc from './VerifiedKyc';

import { useRouter } from '@/packages/next';
import { useSelector } from '@/packages/store';
import { KycCampaign as KYC } from '@/ui/page-components/discover_rates/common/KYC';

function KYCPage() {
	const [open, setOpen] = useState(false);
	const { push } = useRouter();
	const { profile } = useSelector((s) => s);
	const { kyc_status, kyc_rejection_reason } = profile?.organization || {};
	const { subscriptionData, loading } = useGetSubscription();
	const { data } = subscriptionData?.dashboard_products || [];
	const { is_free_plan = false, plan_name = '' } = data || {};
	if (loading) {
		return <Placeholder />;
	}
	return (
		<div>
			{kyc_status === 'verified' && <VerifiedKyc is_free_plan={is_free_plan} plan_name={plan_name} />}
			{(kyc_status === 'rejected' || kyc_status === 'pending_from_user') && (
				<div className={styles.image}>

					<div className={styles.inner}>
						{kyc_status === 'pending_from_user' && (
							<>
								<img
									className={styles.image1}
									src="	https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/tds-doc-icon.svg"
									alt="img"
								/>
								<div className={styles.image2}>
									Please complete your KYC to Book Logistics
								</div>
							</>
						)}
						{kyc_status === 'rejected' && (
							<>
								<IcCFcrossInCircle width={34} height={34} />
								<div className={styles.status_text}>
									Rejected
								</div>
								<div className={styles.image2}>
									{kyc_rejection_reason}
								</div>
							</>
						)}
						<div className={styles.image3}>
							<Button
								onClick={() => { setOpen(true); }}
								size="md"
								themeType="accent"
							>
								SUBMIT KYC

							</Button>

						</div>
					</div>
					<div className={styles.line}>
						<div className={styles.sub_line}>
							<div className={styles.lines}>
								<p className={styles.Account}>Your Account</p>
								<div>
									{is_free_plan === false && (
										<img
											src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/crown_new.svg"
											alt="img"
										/>
									)}
									<span className={styles.standard}>{plan_name}</span>
								</div>
							</div>
							<div
								className={styles.Benifits}
								role="presentation"
								onClick={() => push('/saas/cogo-subscriptions/manage-subscription')}
							>
								<p className={styles.text}>
									{is_free_plan === false
										? 'View Benefits'
										: 'Upgrade'}

								</p>
								<IcMArrowNext className={styles.arrow} />
							</div>
						</div>
					</div>
					{open && (
						<Modal
							show={open}
							onClose={() => {
								setOpen(false);
							}}
							closable
							width={750}
						>
							<KYC onFinalSubmit={() => setOpen(false)} />
						</Modal>
					)}
				</div>
			)}
		</div>

	);
}
export default KYCPage;
