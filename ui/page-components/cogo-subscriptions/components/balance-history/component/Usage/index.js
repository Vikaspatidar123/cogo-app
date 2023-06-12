import { Button } from '@cogoport/components';
import { IcMError, IcMPlus, IcMArrowRight } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useState, useEffect, useRef } from 'react';

import { UsageIconMapping } from '../../../../common/UsageIcon';
import useGetUSerActivePlan from '../../../../hooks/useGetUserActivePlan';
import redirectUrl from '../../../../utils/redirectUrl';

import AddonModal from './AddonModal';
import styles from './styles.module.css';

import { useSelector } from '@/packages/store';

function Usage({ pendingModal, setPendingModal }) {
	const [userPlan, setUserPlan] = useState({});
	const [addModal, setAddModal] = useState(false);
	const [addonDetails, setAddonDetails] = useState('');
	const {
		general: { isMobile = false },
	} = useSelector((state) => state);

	const { profile } = useSelector((s) => s);
	const { getPlan, loading } = useGetUSerActivePlan({ profile });

	const { redirectManageSubscription } = redirectUrl();
	const scrollRef = useRef();
	useEffect(() => {
		if (!pendingModal) {
			getPlan({ setUserPlan });
		}
	}, [getPlan, pendingModal]);

	const { billing_cycle = {}, current_usages = [] } = userPlan || {};
	const { is_free_plan } = billing_cycle || {};

	const renderCount = (count, totalCount, addon, unlimited) => {
		if (unlimited) return <div className={styles.count}>Unlimited</div>;
		return (
			<>
				<div className={styles.count}>
					{+count + +addon}
					{' '}
					/
				</div>
				<div className="totalCount">{+totalCount + +addon}</div>
			</>
		);
	};

	const renderProgress = (count, addon, total, is_unlimited) => {
		const totalCount = +total + +addon;
		const leftCount = +count + +addon;
		const percentage = (+leftCount * 100) / +totalCount;
		const calculateWidth = `${Math.round(percentage) % ''}`;

		return (
			<div
				className={
					percentage < 20 && !is_unlimited ? styles.panic_container : styles.chill_container
				}
			>
				<div className={styles.progress} style={{ width: `${calculateWidth}` }} />
			</div>
		);
	};
	const calculatePercentage = (count, addon, total) => {
		const totalCount = +total + +addon;
		const leftCount = +count + +addon;
		const percentage = (+leftCount * 100) / +totalCount;
		return percentage < 20;
	};
	const scrollHandler = () => {
		scrollRef.current.scrollLeft += 820;
	};

	return (
		<div className={styles.container}>
			<div className={styles.title_container}>
				<div className={styles.title}>
					Add-Ons
				</div>
				{!isMobile && (
					<Button className="md" onClick={redirectManageSubscription}>
						Manage Subscriptions
					</Button>
				)}
			</div>
			<div className={styles.card_row}>
				{loading && (
					<div className={styles.load_container}>
						<img src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/loading.svg" alt="cogo" />
					</div>
				)}
				{!loading && current_usages?.length === 0 && (
					<div className={styles.empty_state}>No Data Found</div>
				)}
				<div className={styles.card_container} ref={scrollRef}>
					{!loading
						&& current_usages?.length > 0
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
													className={`${
														calculatePercentage(left_quota, addon_quota, total_quota)
														&& !is_unlimited
														&& styles.warn
													} ${styles.count_container}`}
												>
													{renderCount(
														left_quota,
														total_quota,
														addon_quota,
														is_unlimited,
													)}
												</div>
												{isMobile
													&& renderProgress(
														left_quota,
														addon_quota,
														total_quota,
														is_unlimited,
													)}
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
									{!is_unlimited
										&& calculatePercentage(left_quota, addon_quota, total_quota) && (
											<div className={styles.warning}>
												<IcMError fill="#DB4634" width={13} height={13} />
												<div className="txt">
													Only
													{+left_quota + +addon_quota}
													remaining, kindly add on to
													continue
												</div>
											</div>
									)}
								</div>
							),
						)}
				</div>
				{current_usages?.length > 4 && !isMobile && (
					<div
						className={styles.icn_container}
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
			{isMobile && (
				<div className={styles.footer}>
					<Button className="md" onClick={redirectManageSubscription}>
						Manage Subscriptions
					</Button>
				</div>
			)}
		</div>
	);
}
export default Usage;
