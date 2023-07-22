import { Button } from '@cogoport/components';
import { IcACollaboration } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';

import useGetSubscription from '../../hooks/useGetSubscription';

import HeaderGreeting from './Greeting';
import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function Head() {
	const { push } = useRouter();
	const { t } = useTranslation(['dashboard']);
	const { subscriptionData } = useGetSubscription();
	const { data } = subscriptionData?.dashboard_products || [];
	const { is_free_plan = false, plan_name = '' } = data || {};

	const onUpgrade = () => {
		push('/saas/cogo-subscriptions/manage-subscription');
	};

	return (
		<div className={styles.container}>
			<div className={styles.message}>
				<HeaderGreeting />
			</div>
			<div className={styles.text_container}>
				<div className={styles.icon}>
					<IcACollaboration />
				</div>
				<div>
					{t('dashboard:head_text_1')}
					<span className={styles.premium}>
						{plan_name}
					</span>
					{t('dashboard:head_text_2')}
				</div>
				<Button size="sm" themeType="accent" type="button" onClick={() => onUpgrade()}>
					{is_free_plan ? t('dashboard:kycStatus_text_4') : t('dashboard:kycStatus_text_5')}
				</Button>

			</div>
		</div>
	);
}
export default Head;
