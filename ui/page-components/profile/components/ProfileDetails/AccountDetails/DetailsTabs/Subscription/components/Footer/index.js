import { Button } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import useCancelSubscription from '../../hooks/useCancelSubscription';

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function Footer() {
	const { push } = useRouter();

	const { t } = useTranslation(['common']);

	const { cancelSubscription = () => {} } = useCancelSubscription();

	return (
		<div>
			<Button
				className={styles.button}
				themeType="primary"
				onClick={() => {
					push('/saas/cogo-subscriptions/manage-subscription');
				}}
				type="button"
			>
				{t('common:account_settings_subscription_text_3')}
			</Button>
			<Button
				className={styles.button}
				themeType="secondary"
				onClick={cancelSubscription}
				type="button"
			>
				{t('common:account_settings_subscription_text_4')}
			</Button>
		</div>
	);
}

export default Footer;
