import { Button, Placeholder, Modal } from '@cogoport/components';
import { IcMArrowNext } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import useGetSubscription from '../../hooks/useGetSubscription';

import PendingKyc from './PendingKyc';
import RejectedKyc from './RejectedKyc';
import styles from './styles.module.css';
import VerifiedKyc from './VerifiedKyc';

import { useRouter, Image } from '@/packages/next';
import { useSelector } from '@/packages/store';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import { KycCampaign as KYC } from '@/ui/page-components/discover_rates/common/KYC';

const CHECK_STATUS = ['rejected', 'pending_from_user'];
const MAPPING = {
	pending_from_user : PendingKyc,
	rejected          : RejectedKyc,
	verified          : VerifiedKyc,
};
function KYCPage() {
	const { push } = useRouter();
	const { t } = useTranslation(['dashboard']);
	const [open, setOpen] = useState(false);
	const { profile } = useSelector((s) => s);
	const { kyc_status, kyc_rejection_reason } = profile?.organization || {};
	const { subscriptionData, loading } = useGetSubscription();
	const { data } = subscriptionData?.dashboard_products || [];
	const { is_free_plan = false, plan_name = '' } = data || {};
	if (loading) {
		return <Placeholder height="40px" />;
	}
	const Component = MAPPING[kyc_status] || null;

	return (
		<div>
			{kyc_status === 'verified'
				&& (
					<VerifiedKyc
						is_free_plan={is_free_plan}
						plan_name={plan_name}
					/>
				)}

			{CHECK_STATUS.includes(kyc_status) && (
				<div className={styles.image}>

					<div className={styles.inner}>
						<Component kyc_rejection_reason={kyc_rejection_reason} />
						<div className={styles.image3}>
							<Button
								onClick={() => { setOpen(true); }}
								size="sm"
								themeType="accent"
								type="button"
							>
								{t('dashboard:kycStatus_text_7')}
							</Button>

						</div>
					</div>
					<div className={styles.line}>
						<div className={styles.sub_line}>
							<div className={styles.lines}>
								<p className={styles.Account}>{t('dashboard:kycStatus_text_2')}</p>
								<div>
									{is_free_plan === false && (
										<Image
											src={GLOBAL_CONSTANTS.image_url.premium_image}
											alt={t('dashboard:image_text')}
											width={30}
											height={10}
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
										? t('dashboard:kycStatus_text_4')
										: t('dashboard:kycStatus_text_5')}

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
