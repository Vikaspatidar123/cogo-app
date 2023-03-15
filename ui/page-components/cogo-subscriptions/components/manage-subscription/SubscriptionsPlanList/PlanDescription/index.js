import { Button } from '@cogoport/components';
import { IcMFtick } from '@cogoport/icons-react';
import { useState } from 'react';

import useSubscriptionActivateNow from '../../../../hooks/useSubscriptionActivateNow';
import { shortFormatNumber } from '../../../../utils/getShortFormatNumber';
import logoMapping from '../../../../utils/logoMapping';
import redirectUrl from '../../../../utils/redirectUrl';

import ActivateModal from './ActivateModal';
import ActivatePendingModal from './ActivatePendingModal';
import ActivateSuccessModal from './ActivateSuccessModal';
import styles from './styles.module.css';

function PlanDescription({
	item,
	activeTab,
	clickedPlan,
	setClickedPlan,
	priority_sequence_active_plan,
	subscribeTab,
	isMobile,
}) {
	const [showActivateModal, setShowActivateModal] = useState(false);
	const [modal, setShowModal] = useState(false);

	const plan_pricing_id = clickedPlan?.display_pricing?.[activeTab]?.id;
	const Mapping = logoMapping();
	const { redirectCheckoutSubscription } = redirectUrl();
	const {
		description = '',
		priority_sequence: prioritySequence = '',
		metadata = {},
		display_pricing = '',
	} = item || {};

	const { activateLoading, subscriptionActivateNow } = useSubscriptionActivateNow();

	const currency = display_pricing[`${activeTab}`]?.currency;
	const amount = display_pricing[`${activeTab}`]?.price;
	const lowerCurrency = currency && currency.toLowerCase();
	const crossedCurr = `prev_value_${lowerCurrency}`;
	const crossedAmount = metadata?.display_pricing?.[`${activeTab}`]?.[crossedCurr];

	const onsubmit = async (items) => {
		await setClickedPlan(items);
		redirectCheckoutSubscription(items?.id, activeTab, plan_pricing_id);
	};

	const totalAmt = activeTab === 'annual' ? amount / 12 : amount;
	const totalCrossedAmount = activeTab === 'annual' ? crossedAmount / 12 : crossedAmount;

	const isSubscribed = () => {
		if (subscribeTab === activeTab) {
			if (prioritySequence >= priority_sequence_active_plan) return true;
			return false;
		}
		if (subscribeTab !== activeTab) {
			if (activeTab === 'annual') return true;
			return false;
		}
		return false;
	};

	const subscribeActivate = display_pricing[`${activeTab}`].activate_later ? (
		<div className={styles.center_div}>
			<Button
				size="md"
				themeType="primary"
				onClick={() => {
					setShowActivateModal(true);
				}}
			>
				Activate
			</Button>
		</div>
	) : (
		display_pricing[`${activeTab}`].show_button && (
			<div className={styles.center_div}>
				<Button
					size="lg"
					themeType="secondary"
					onClick={() => onsubmit(item)}
				>
					Subscribe
				</Button>
			</div>
		)
	);
	return (
		<div className={styles.container}>
			<div>
				{prioritySequence === 2 && (
					<div className={styles.ribbon_wrapper}>
						<img src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/popular.svg" alt="cogo" />
					</div>
				)}

				<div className={styles.plan_type_heading}>
					<div className={styles.plan_type_icon}>{Mapping[prioritySequence] || ''}</div>
					<div className={styles.plan_title}>
						<div className={styles.heading} style={{ color: '#1f1945' }}>{description}</div>
						{metadata?.plan_liner && (
							<div className={`${styles.row2} ${styles.subheading}`}>{metadata?.plan_liner}</div>
						)}
					</div>
				</div>
				<div className={styles.plan_prev_price}>
					{metadata?.display_pricing?.[`${activeTab}`]?.prev_value_inr && (
						<div className={styles.row2}>
							<div className={styles.crossed_price}>
								{shortFormatNumber(totalCrossedAmount, currency)}
							</div>
						</div>
					)}
				</div>
				<div className={styles.plan_price}>
					<div className={styles.plan_new_price}>
						<div className={styles.price} style={{ color: isSubscribed() ? '#1f1945' : '#bdbdbd' }}>
							{shortFormatNumber(totalAmt, currency)}
							<div className={styles.per_period}>/ month</div>
						</div>
						{activeTab === 'annual' && (
							<div className={styles.annually_txt}>Billed Annually</div>
						)}
					</div>
				</div>

				<div className={styles.plan_features}>
					<div className={styles.list}>
						{(metadata?.plan_details?.sort((a, b) => a.sequence < b.sequence) || []).map(
							({ value = '', display_name = '' }) => (
								<div className={styles.flex} key={display_name}>
									<IcMFtick
										className={styles.tick_icon}
										fill={isSubscribed() ? '#67c676' : '#cac7d3'}
										width={16}
										height={16}
									/>
									{value && <div className={styles.number}>{value}</div>}
									<div className={styles.text}>{display_name}</div>
								</div>
							),
						)}
					</div>
				</div>
				{display_pricing[`${activeTab}`]?.is_active_plan ? (
					<div className={styles.active_plan}>
						<div className={styles.active}>
							<IcMFtick fill="#67c676" width={35} height={35} />
							Active
						</div>
					</div>
				) : (
					subscribeActivate
				)}
			</div>
			{showActivateModal && (
				<ActivateModal
					plan_pricing_id={display_pricing?.[activeTab]?.id}
					showActivateModal={showActivateModal}
					setShowActivateModal={setShowActivateModal}
					subscriptionActivateNow={subscriptionActivateNow}
					isMobile={isMobile}
					setShowModal={setShowModal}
					item={item}
				/>
			)}
			{activateLoading && <ActivatePendingModal activateLoading={activateLoading} />}
			{modal && (
				<ActivateSuccessModal
					modal={modal}
					setShowModal={setShowModal}
					name={item?.display_name}
				/>
			)}
		</div>
	);
}

export default PlanDescription;
