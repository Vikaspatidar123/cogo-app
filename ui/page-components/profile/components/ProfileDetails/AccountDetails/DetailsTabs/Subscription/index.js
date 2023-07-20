import { Loader, cl } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import Details from './components/Details';
import Footer from './components/Footer';
import Header from './components/Header';
import useFetchSubscriptionPlan from './hooks/useFetchSubscriptionPlan';
import styles from './styles.module.css';

import { Image } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

function Subscription() {
	const { t } = useTranslation(['common']);

	const { data = {}, loading } = useFetchSubscriptionPlan();

	const { item_plans = [] } = data || {};

	const activePlan = (item_plans || []).find((plan) => {
		const { display_pricing = {} } = plan || {};
		return Object.keys(display_pricing)?.find((period) => display_pricing?.[period]?.is_active_plan);
	});

	const { display_pricing = {}, priority_sequence = '' } = activePlan || {};

	const activePlanKey = Object.keys(display_pricing || {}).find((plan) => display_pricing[plan].is_active_plan) || '';

	const activePlanObject = display_pricing[activePlanKey] || {};

	if (loading) {
		return (
			<div className={cl`${styles.container} ${styles.empty}`}>
				<Loader />
			</div>
		);
	}

	return (
		<div className={styles.container}>
			{priority_sequence !== GLOBAL_CONSTANTS.zeroth_index ? (
				<div className={styles.first_row}>
					<div className={styles.card}>
						<Header
							activePlanObject={activePlanObject}
							activePlan={activePlan}
						/>
						<Footer />
					</div>
					<Details activePlanObject={activePlanObject} />
				</div>
			) : (
				<div className={styles.container}>
					<Image
						src={GLOBAL_CONSTANTS.image_url.empty_url}
						alt={t('common:alt_empty_text')}
						width={100}
						height={100}
					/>
				</div>
			)}
		</div>
	);
}

export default Subscription;
