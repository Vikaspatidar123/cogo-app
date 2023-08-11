import { IcMTick } from '@cogoport/icons-react';
import React from 'react';

import {
	MOST_POPPULAR_INDEX,
	EXPIRE_DAY,
} from '../../../../../../constants/dimensions';
import ActivateLater from '../ActivateLater';
import PrioritySequence from '../PrioritySequence';
import styles from '../styles.module.css';

const RenderPlanDetails = ({ metadata }) => (
	metadata?.plan_details?.sort((a, b) => a.sequence < b.sequence) || []
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
});

function CardInfo({
	prioritySequence,
	description,
	displayPricing,
	metadata,
	active,
}) {
	return (
		<div className={prioritySequence !== MOST_POPPULAR_INDEX && styles.card}>
			<div className={`${styles.styled_row} ${styles.heading}`}>
				<div className={styles.styled_col}>
					<div className={`${styles.heading} ${active ? styles.head_text : styles.head_text}`}>
						{description}
					</div>
					{displayPricing?.activate_later && (
						<ActivateLater activatesIn={displayPricing.activates_in} />
					)}
					{prioritySequence > EXPIRE_DAY
					&& displayPricing?.is_active_plan
                    && displayPricing?.expires_in !== undefined
						? (
							<PrioritySequence
								expiresIn={displayPricing.expires_in}
							/>
						) : (
							<div className={styles.date_space} />)}
				</div>
			</div>
			<div className={styles.styled_row}>
				<div className={styles.list}>
					<RenderPlanDetails metadata={metadata} />

				</div>
			</div>
		</div>
	);
}

export default CardInfo;
