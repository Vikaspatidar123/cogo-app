import { cl, Button } from '@cogoport/components';
import { IcMTick } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import {
	MOST_POPPULAR_INDEX,
	EXPIRE_DAY,
	START_COUNT,
} from '../../../../../constants/dimensions';
import useCard from '../../../../../hooks/useCard';
import useSubscriptionActivateNow from '../../../../../hooks/useSubscriptionActivateNow';
import ActivateModal from '../../../SubscriptionsPlanList/PlanDescription/ActivateModal';
import ActivatePendingModal from '../../../SubscriptionsPlanList/PlanDescription/ActivatePendingModal';

import styles from './styles.module.css';

import { Image } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import formatAmount from '@/ui/commons/utils/formatAmount';
import SuccessModal from '@/ui/page-components/cogo-subscriptions/common/SuccessModal';

const DEFAULT_MONTHLY_AMOUNT = 0;

function Card({
	item,
	activeTab,
	subscribeTab,
	priority_sequence_active_plan,
	activeHover,
	setActiveHover,
	activeIndex,
}) {
	const { t } = useTranslation(['subscriptions']);
	const [showActivateModal, setShowActivateModal] = useState(false);
	const [modal, setShowModal] = useState(false);

	const { activateLoading, subscriptionActivateNow } = useSubscriptionActivateNow();

	const { onSubmit, active, currency, totalAmt } = useCard({
		activeTab,
		subscribeTab,
		item,
		priority_sequence_active_plan,
	});
	const {
		description = '',
		priority_sequence: prioritySequence = '',
		metadata = {},
		display_pricing = {},
		is_free_plan = false,
	} = item || {};
	const displayPricing = display_pricing?.[activeTab] || {};

	const subscribeActivate = (
		<div className={cl`${styles.center_div} ${styles.subscribe}`}>
			<div>
				{!is_free_plan ? (
					<div className={styles.amount_div}>
						<div className={cl`${styles.styled_row} ${styles.priceRow}`}>
							<div className={styles.price}>
								<div className={styles.currency}>{currency}</div>
								{formatAmount({
									amount  : totalAmt || DEFAULT_MONTHLY_AMOUNT,
									currency,
									options : {
										notation : 'standard',
										style    : 'currency',
									},
								})}
								<div className={styles.per_period}>
									{' '}
									/
									{' '}
									{t('subscriptions:month_text')}
								</div>
							</div>
						</div>
						{activeTab === 'annual' && (
							<div className={cl`${styles.styled_row} ${styles.priceRow} `}>
								<div className={styles.annuallyTxt}>
									{t('subscriptions:billed_annually_text')}
								</div>
							</div>
						)}
					</div>
				) : null}
			</div>
			{!displayPricing?.activate_later ? (
				displayPricing?.show_button && (
					<Button
						className={cl`${styles.button}`}
						onClick={() => onSubmit(item)}
						type="button"
					>
						{t('subscriptions:subscribe_button_text')}
					</Button>
				)
			) : (
				<div className={styles.activate}>
					<Button
						className={cl`${styles.button}`}
						onClick={() => setShowActivateModal(true)}
						type="button"
					>
						{t('subscriptions:activate_button_text')}
					</Button>
				</div>
			)}
		</div>
	);

	return (
		<div
			onMouseEnter={() => {
				setActiveHover(prioritySequence);
			}}
			onMouseLeave={() => {
				setActiveHover(activeIndex);
			}}
			className={`${styles.container} ${prioritySequence === activeHover && styles.hover_card}`}
		>
			{active ? (
				<div className={styles.cr_inner}>
					<span>
						{' '}
						{t('subscriptions:active_text')}
					</span>
				</div>
			) : null}
			{/* img tag use for height width is not fix */}
			{prioritySequence === activeHover ? (
				<img
					className={`${styles.back_ground_image} ${styles.line_img}`}
					src={GLOBAL_CONSTANTS.image_url.card_background_line_image}
					alt={t('subscriptions:cogo_text')}
				/>
			) : null}

			{prioritySequence === MOST_POPPULAR_INDEX && (
				<div className={styles.row}>
					<div className={styles.ribbon_wrapper}>{t('subscriptions:most_popular_text')}</div>
				</div>
			)}
			<div className={`${prioritySequence !== MOST_POPPULAR_INDEX && styles.card}`}>
				<div className={`${styles.styled_row} ${styles.heading}`}>
					<div className={styles.styled_col}>
						<div
							className={`${styles.heading} ${active ? styles.head_text : styles.head_text}`}
						>
							{description}
						</div>

						{displayPricing?.activate_later ? (
							<div className={styles.date_box}>
								<Image
									src={GLOBAL_CONSTANTS.image_url.calendar_image}
									alt={t('subscriptions:cogo_text')}
									width={25}
									height={25}
								/>
								<span className={styles.days}>{displayPricing?.activates_in}</span>
								<span className={styles.date}>
									{displayPricing?.activates_in === START_COUNT ? t('subscriptions:day_text')
										: t('subscriptions:days_text')}
									{' '}
									{t('subscriptions:left_activate_text')}
								</span>
							</div>
						) : null}
						{prioritySequence > EXPIRE_DAY
							&& displayPricing?.is_active_plan
							&& displayPricing?.expires_in !== undefined ? (
								<div className={styles.date_box}>
									<Image
										src={GLOBAL_CONSTANTS.image_url.calendar_image}
										alt={t('subscriptions:cogo_text')}
										width={25}
										height={25}
									/>
									<span className={styles.days}>{displayPricing?.expires_in}</span>
									<span className={styles.date}>
										{displayPricing?.expires_in === START_COUNT ? t('subscriptions:day_text')
											: t('subscriptions:days_text')}
										{' '}
										{t('subscriptions:expire_text')}
									</span>
								</div>
							) : (
								<div className={styles.date_space} />
							)}
					</div>
				</div>

				<div className={styles.styled_row}>
					<div className={styles.list}>
						{(
							metadata?.plan_details?.sort((a, b) => a.sequence < b.sequence)
							|| []
						).map((info) => {
							const { value = '', display_name = '' } = info || {};
							return (
								<div className={styles.flex} key={display_name}>
									<IcMTick width={20} height={18} className={styles.icon} />
									<div>
										{value && <span className={styles.value}>{value}</span>}
										<span className={styles.text}>{display_name}</span>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
			{item.category === 'custom' && <div className={styles.custom} />}

			<div>
				{' '}
				{!displayPricing?.is_active_plan ? subscribeActivate : null}

			</div>

			{showActivateModal && (
				<ActivateModal
					plan_pricing_id={display_pricing?.[activeTab]?.id}
					showActivateModal={showActivateModal}
					setShowActivateModal={setShowActivateModal}
					subscriptionActivateNow={subscriptionActivateNow}
					setShowModal={setShowModal}
					item={item}
				/>
			)}
			{
				activateLoading && (
					<ActivatePendingModal activateLoading={activateLoading} />
				)
			}
			{
				modal && (
					<SuccessModal
						modal={modal}
						setShowModal={setShowModal}
						name={item?.display_name}
					/>
				)
			}
		</div>
	);
}
export default Card;
