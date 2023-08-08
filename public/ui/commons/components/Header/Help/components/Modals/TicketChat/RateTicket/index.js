import { Button, RatingComponent } from '@cogoport/components';
import { IcCStar } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import useUpdateTicketFeedback from '../../../../hooks/useUpdateTicketFeedback';

import styles from './styles.module.css';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const translationKey = 'common:components_header_tickets_feedback';

function RateTicket({
	id = '',
	ticketRating = GLOBAL_CONSTANTS.zeroth_index,
	refetchTicket = () => {},
	status,
}) {
	const { t } = useTranslation(['common']);

	const [rating, setRating] = useState(ticketRating);

	const { updateTicketFeedback = () => {}, updateLoading } =	useUpdateTicketFeedback({ refetchTicket });

	if (status === 'rejected') {
		return (
			<div className={styles.feedback_text}>
				{t(`${translationKey}_reject`)}
			</div>
		);
	}

	return (
		<div className={styles.container} key={ticketRating}>
			{ticketRating === GLOBAL_CONSTANTS.zeroth_index ? (
				<>
					<div className={styles.rating_text}>
						{t(`${translationKey}_question`)}
					</div>
					<div className={styles.rating_container}>
						<RatingComponent
							type="star"
							totalStars={5}
							value={rating}
							onChange={setRating}
							disabled={updateLoading || ticketRating > GLOBAL_CONSTANTS.zeroth_index}
						/>
					</div>
					<div className={styles.button_container}>
						<Button
							type="button"
							themeType="secondary"
							disabled={updateLoading}
							onClick={() => {
								updateTicketFeedback(rating, id);
							}}
						>
							{t(`${translationKey}_submit`)}
						</Button>
					</div>
				</>
			) : (
				<div className={styles.feedback_text}>
					{t(`${translationKey}_thanks`)}
					{' '}
					{ticketRating}
					<IcCStar className={styles.ticket_star} />
				</div>
			)}
		</div>
	);
}

export default RateTicket;
