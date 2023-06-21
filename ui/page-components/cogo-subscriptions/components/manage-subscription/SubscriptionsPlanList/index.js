import { IcMArrowNext, IcMArrowDown } from '@cogoport/icons-react';
import { useState, useEffect, useRef } from 'react';

import { dimensions } from '../../../constants/dimensions';
import useGetPlanFeatures from '../../../hooks/useGetPlanFeatures';

import DetailContainer from './DetailsContainer';
import MobileView from './DetailsContainer/MobileView';
import EnterpriseDescription from './EnterpriseDescription';
import PlanDescription from './PlanDescription';
import StarterPlanDescription from './starterPlanDescription';
import styles from './styles.module.css';

import { useSelector } from '@/packages/store';

function SubscriptionsPlanList({
	activeTab,
	userplan = {},
	description = '',
	priority_sequence_active_plan = '',
	clickedPlan,
	setClickedPlan,
	requestCallback = () => {},
	saas_plan_pricing_id,
	subscribeTab,
	callbackLoading,
}) {
	const { item_plans = [], saas_product_family_id } = userplan || {};
	const [showDetails, setShowDetails] = useState(false);
	const featureRef = useRef('');
	const { refetchPlanFeatures, planFeatureData } = useGetPlanFeatures({});
	const check = Object.keys(planFeatureData?.plan_features || {}).length || 0;
	const {
		general: { isMobile = false },
	} = useSelector((state) => state);

	const sortedPlan = item_plans?.sort(
		(a, b) => a.priority_sequence - b.priority_sequence,
	);
	const scrollToFeature = () => {
		setShowDetails(!showDetails);
		featureRef.current.scrollIntoView({ block: 'end', behavior: 'smooth' });
	};

	useEffect(() => {
		refetchPlanFeatures({ saas_product_family_id });
	}, [refetchPlanFeatures, saas_product_family_id]);

	const getActiveLaterClass = (item) => {
		if (item?.display_pricing?.[activeTab]?.activate_later) {
			return styles.activate_later;
		}
		return null;
	};

	const getSelectedPlanClass = (item) => {
		if (clickedPlan?.description === item?.description) {
			return styles.selected;
		}

		return null;
	};

	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<div className={styles.div}>
					{(sortedPlan || []).map((item) => (
						<div className={`${styles.div_ctn} ${!isMobile && styles.mobile_view}`}>
							{item?.display_pricing?.[activeTab]?.activate_later && (
								<div className={styles.tag}>
									<div className={styles.days}>
										{item?.display_pricing?.[activeTab]?.activates_in}
									</div>
									{item?.display_pricing?.[activeTab]?.activates_in === 1
										? 'day '
										: 'days '}
									left to activate
								</div>
							)}
							{item?.display_pricing?.[activeTab].is_active_plan
								&& item?.display_pricing?.[activeTab]?.expires_in !== undefined && (
									<div className={styles.tag}>
										<div className={styles.days}>
											{item?.display_pricing?.[activeTab]?.expires_in}
										</div>
										{item?.display_pricing?.[activeTab]?.expires_in === 1
											? 'day '
											: 'days '}
										to expire
									</div>
							)}

							<div
								className={`${styles.plan_wrapper} ${styles.hover_class}
								${getActiveLaterClass(item)} ${getSelectedPlanClass(item)}`}
								key={item?.id}
								width={dimensions[item?.priority_sequence]?.[0]}
								height={dimensions[item?.priority_sequence]?.[1]}
								onClick={() => item?.display_pricing?.[`to_show_for_${activeTab}_button`] === true
									&& setClickedPlan(item)}
								role="presentation"
							>
								{item?.priority_sequence > 0 ? (
									<PlanDescription
										item={item}
										activeTab={activeTab}
										description={description}
										clickedPlan={clickedPlan}
										setClickedPlan={setClickedPlan}
										priority_sequence_active_plan={priority_sequence_active_plan}
										saas_plan_pricing_id={saas_plan_pricing_id}
										subscribeTab={subscribeTab}
										isMobile={isMobile}
									/>
								) : (
									<StarterPlanDescription
										item={item}
										activeTab={activeTab}
										description={description}
										clickedPlan={clickedPlan}
										setClickedPlan={setClickedPlan}
										priority_sequence_active_plan={priority_sequence_active_plan}
										saas_plan_pricing_id={saas_plan_pricing_id}
									/>
								)}
							</div>
						</div>
					))}
					<div className={`${styles.div_ctn} ${!isMobile && styles.mobile_view}`}>
						<div
							className={`${styles.plan_wrapper} ${styles.enterprise} ${styles.hover_class}`}
							style={{ height: dimensions[3]?.[1] }}
						>
							<EnterpriseDescription
								requestCallback={requestCallback}
								callbackLoading={callbackLoading}
							/>
						</div>
					</div>
				</div>
			</div>

			<div className={styles.btn_container}>
				<div className={styles.view_details_button} role="presentation" onClick={() => scrollToFeature()}>
					Explore features
					<div className={styles.icon_container}>{isMobile ? <IcMArrowDown /> : <IcMArrowNext />}</div>
				</div>
			</div>

			{check > 0 && (
				<div className={`${styles.feature_plan} ${styles.showfeature}`} ref={featureRef}>
					{isMobile ? (
						<MobileView
							className="detailsDiv"
							clickedPlan={clickedPlan}
							planFeatureData={planFeatureData?.plan_features}
						/>
					) : (
						<DetailContainer
							className="detailsDiv"
							clickedPlan={clickedPlan}
							planFeatureData={planFeatureData?.plan_features}
						/>
					)}
				</div>
			)}
		</div>
	);
}

export default SubscriptionsPlanList;
