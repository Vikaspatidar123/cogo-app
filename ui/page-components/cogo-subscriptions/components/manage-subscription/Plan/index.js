import { Toggle } from '@cogoport/components';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import RecurringPaymentFailedRibbon from '../../../common/RecurringPaymentFailedRibbon';
import SuccessModal from '../../../common/SuccessModal';
import useGetPlanFeatures from '../../../hooks/useGetPlanFeatures';
import useGetUSerActivePlan from '../../../hooks/useGetUserActivePlan';
import useVerifyRazor from '../../../hooks/useVerifyRazorPayStatus';
import getUserActivePlan from '../../../utils/getUserActivePlan';

import HeaderContainer from './HeaderContainer';
import PendingModal from './PendingModal';
import styles from './styles.module.css';
import SubscriptionsPlan from './SubscriptionsPlan';
import CardTable from './SubscriptionsPlan/CardTable';

import { useRouter } from '@/packages/next';
import { useSelector } from '@/packages/store';

function Plan() {
	const { query } = useRouter();
	const { t } = useTranslation(['subscriptions']);
	const [modal, setShowModal] = useState(false);
	const { saas_plan = '' } = query || {};

	const { profile } = useSelector((s) => s);

	const {
		loading,
		getPlan,
		userPlan,
		activeTab,
		setActiveTab,
		subscribeTab,
	} = useGetUSerActivePlan({ profile });
	const {
		setRazorLoading,
		razorLoading = false,
		paymentStatus = {},
		apiTries,
	} = useVerifyRazor();

	const { saas_product_family_id = '', item_plans = [] } = userPlan || {};

	const activePlan = getUserActivePlan({ item_plans, activeTab });

	const { extended_days = 0 } = activePlan || {};

	const { planFeatureData = {} } = useGetPlanFeatures({
		saas_product_family_id,
	});

	return (
		<div>
			{extended_days ? <RecurringPaymentFailedRibbon /> : null}

			<div
				className={extended_days ? styles.extended_padding : ''}
			>

				<HeaderContainer />

				<div className={styles.container}>

					<Toggle
						offLabel={t('subscriptions:bill_monthly_text')}
						onLabel={(
							<div>
								{t('subscriptions:bill_yearly_text')}
								<span className={styles.save}>
									{' '}
									(
									{t('subscriptions:save_text')}
									)
								</span>
							</div>
						)}
						value={activeTab}
						onChange={(e) => {
							setActiveTab(e.target.checked ? 'annual' : 'monthly');
						}}
					/>
				</div>
				<SubscriptionsPlan
					userplan={userPlan}
					activeTab={activeTab}
					subscribeTab={subscribeTab}
					loading={loading}
				/>

				<div className={styles.feature_line}>
					<div>
						<div className={styles.features}>{t('subscriptions:detailed_text')}</div>
					</div>
				</div>
				<CardTable
					planFeatureData={planFeatureData}
				/>

				{modal && (
					<SuccessModal
						query={query}
						modal={modal}
						setShowModal={setShowModal}
						getPlan={getPlan}
						name={saas_plan}
					/>
				)}
				{razorLoading && (
					<PendingModal
						razorLoading={razorLoading}
						setRazorLoading={setRazorLoading}
						apiTries={apiTries}
						paymentStatus={paymentStatus}
						setAddModal={setShowModal}
					/>
				)}
			</div>
		</div>
	);
}

export default Plan;
