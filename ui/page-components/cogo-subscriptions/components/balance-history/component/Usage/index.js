import { Button, cl } from '@cogoport/components';
import { IcMError, IcMPlus, IcMArrowRight } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import { useState, useRef } from 'react';

import { UsageIconMapping } from '../../../../common/UsageIcon';
import {
	CURRENT_USER_VALUE,
	PERCENTAGE_COUNT, SCROLL_VALUE,
	calculatePercentage,
} from '../../../../constants/dimensions';
import useGetUSerActivePlan from '../../../../hooks/useGetUserActivePlan';
import redirectUrl from '../../../../utils/redirectUrl';

import AddonModal from './AddonModal';
import styles from './styles.module.css';

import { Image } from '@/packages/next';
import { useSelector } from '@/packages/store';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

function RenderCount({ count, totalCount, addon, unlimited }) {
	const { t } = useTranslation(['subscriptions']);

	if (unlimited) return <div className={styles.count}>{t('subscriptions:unlimited_text')}</div>;
	return (
		<>
			<div className={styles.count}>
				{+count + +addon}
				{' '}
				/
			</div>
			<div className={styles.totalCount}>{+totalCount + +addon}</div>
		</>
	);
}

function RenderProgress({ count, addon, total, is_unlimited }) {
	const totalCount = +total + +addon;
	const leftCount = +count + +addon;
	const percentage = (+leftCount * 100) / +totalCount;
	const calculateWidth = `${Math.round(percentage) % ''}`;

	return (
		<div
			className={
				percentage < PERCENTAGE_COUNT && !is_unlimited ? styles.panic_container : styles.chill_container
			}
		>
			<div className={styles.progress} style={{ width: `${calculateWidth}` }} />
		</div>
	);
}

function Usage({ pendingModal, setPendingModal }) {
	const { t } = useTranslation(['subscriptions']);
	const { profile } = useSelector((s) => s);

	const [addModal, setAddModal] = useState(false);

	const [addonDetails, setAddonDetails] = useState('');

	const { loading, userPlan } = useGetUSerActivePlan({ profile });

	const { redirectManageSubscription } = redirectUrl();

	const scrollRef = useRef();

	const { billing_cycle = {}, current_usages = [] } = userPlan || {};

	const { is_free_plan } = billing_cycle || {};

	const scrollHandler = () => {
		scrollRef.current.scrollLeft += SCROLL_VALUE;
	};

	return (
		<div className={styles.container}>
			<div className={styles.title_container}>
				<div className={styles.title}>
					{t('subscriptions:add_ons_text')}
				</div>
				<div className={styles.web_view}>
					<Button
						onClick={redirectManageSubscription}
						type="button"
					>
						{t('subscriptions:manage_subscriptions_text')}
					</Button>
				</div>
			</div>
			<div className={styles.card_row}>
				{loading && (
					<div className={styles.load_container}>
						<Image
							src={GLOBAL_CONSTANTS.image_url.loading}
							alt={t('subscriptions:loading_text')}
							width={30}
							height={30}
						/>
					</div>
				)}

				{!loading && isEmpty(current_usages) ? (
					<div className={styles.empty_state}>{t('subscriptions:no_data_text')}</div>
				) : null}

				<div className={styles.card_container} ref={scrollRef}>
					{!loading
						&& !isEmpty(current_usages)
						&& (current_usages || []).map(
							({
								addon_quota = '',
								is_unlimited = false,
								product_name = '',
								left_quota = '',
								total_quota = '',
								currency,
								plan_price,
								plan_pricing_id = '',
								discount_percent = 0,
							}) => (
								<div key={plan_pricing_id}>
									<div className={styles.card}>
										<div className={`${styles.row} ${styles.card_title_container}`}>
											<div className={styles.name}>{startCase(product_name)}</div>
											{UsageIconMapping[product_name]}
										</div>
										<div className={`${styles.row} ${styles.card_footer_container}`}>
											<div className={styles.mobile_progress_holder}>
												<div
													className={`${calculatePercentage(
														left_quota,
														addon_quota,
														total_quota,
													)
														&& !is_unlimited
														&& styles.warn
														} ${styles.count_container}`}
												>
													<RenderCount
														count={left_quota}
														totalCount={total_quota}
														addon={addon_quota}
														unlimited={is_unlimited}
													/>
												</div>
												<div className={styles.mobile_view}>
													<RenderProgress
														count={left_quota}
														addon={addon_quota}
														total={total_quota}
														is_unlimited={is_unlimited}
													/>
												</div>
											</div>
											{!is_free_plan && !is_unlimited && (
												<div
													className={styles.icon_container}
													role="presentation"
													onClick={() => {
														setAddonDetails({
															product_name,
															currency,
															plan_price,
															plan_pricing_id,
															discount_percent,
														});
														setAddModal(true);
													}}
												>
													<IcMPlus width={20} height={20} />
												</div>
											)}
										</div>
									</div>
									{(!is_unlimited && calculatePercentage(left_quota, addon_quota, total_quota)) ? (
										<div className={styles.warning}>
											<IcMError fill="#DB4634" width={13} height={13} />
											<div className={styles.txt}>
												{t('subscriptions:only_text')}
												{+left_quota + +addon_quota}
												{t('subscriptions:reminder_message')}
											</div>
										</div>
									) : null}
								</div>
							),
						)}
				</div>
				{current_usages?.length > CURRENT_USER_VALUE && (
					<div
						className={cl`${styles.icn_container} ${styles.web_view}`}
						onClick={scrollHandler}
						role="presentation"
					>
						<IcMArrowRight className={styles.animated_arrow} width={35} height={35} />
						<IcMArrowRight width={35} height={35} />
					</div>
				)}
			</div>

			{addModal && (
				<AddonModal
					addModal={addModal}
					setAddModal={setAddModal}
					addonDetails={addonDetails}
					pendingModal={pendingModal}
					setPendingModal={setPendingModal}
				/>
			)}

			<div className={cl`${styles.footer} ${styles.mobile_view}`}>
				<Button
					type="button"
					onClick={redirectManageSubscription}
				>
					{t('subscriptions:manage_subscriptions_text')}
				</Button>
			</div>

		</div>
	);
}
export default Usage;
