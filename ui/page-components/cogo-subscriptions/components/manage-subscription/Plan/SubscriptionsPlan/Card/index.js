import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import {
	MOST_POPPULAR_INDEX,
} from '../../../../../constants/dimensions';
import useCard from '../../../../../hooks/useCard';
import useSubscriptionActivateNow from '../../../../../hooks/useSubscriptionActivateNow';
import ActivateModal from '../../../SubscriptionsPlanList/PlanDescription/ActivateModal';
import ActivatePendingModal from '../../../SubscriptionsPlanList/PlanDescription/ActivatePendingModal';

import CardInfo from './CardInfo';
import styles from './styles.module.css';
import Subscribe from './Subscribe';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import SuccessModal from '@/ui/page-components/cogo-subscriptions/common/SuccessModal';

const CUSTOM_IMAGE_MAPPING = {
	true  : GLOBAL_CONSTANTS.image_url.custom_hover_image,
	false : GLOBAL_CONSTANTS.image_url.custom_image,
};
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

	const activeHoverCheck = prioritySequence === activeHover;
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
			<CardInfo
				prioritySequence={prioritySequence}
				description={description}
				displayPricing={displayPricing}
				metadata={metadata}
				active={active}
			/>

			{item.category === 'custom'
				&& (
					<div
						className={styles.custom}
						style={{ backgroundImage: `url(${CUSTOM_IMAGE_MAPPING[activeHoverCheck]})` }}
					/>
				)}

			<div>
				{!displayPricing?.is_active_plan
					? (
						<Subscribe
							is_free_plan={is_free_plan}
							currency={currency}
							totalAmt={totalAmt}
							activeTab={activeTab}
							displayPricing={displayPricing}
							item={item}
							onSubmit={onSubmit}
							setShowActivateModal={setShowActivateModal}
						/>
					) : null}

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
