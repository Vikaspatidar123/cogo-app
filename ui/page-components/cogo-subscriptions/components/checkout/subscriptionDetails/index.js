import { IcMFtick } from '@cogoport/icons-react';

import { getCurrencyDetail } from '../../../utils/getCurrencyDetail';
import { shortFormatNumber } from '../../../utils/getShortFormatNumber';
import logoMapping from '../../../utils/logoMapping';

import styles from './styles.module.css';

function SubscriptionDetails({ plans = {}, query }) {
	const { plan, pricing } = plans || {};
	const Mapping = logoMapping();
	let periods;
	if (query?.period === 'monthly') {
		periods = 'month';
	} else periods = 'year';

	const { metadata = '' } = plan || {};
	const { amount, currency, preValue } = getCurrencyDetail({ pricing, periods });

	const percentage = ((metadata?.display_pricing?.[query?.period]?.[preValue]
			- pricing?.[`${periods}`]?.[0]?.price)
			* 100)
		/ metadata?.display_pricing?.[query?.period]?.[preValue];

	return (
		<div>
			<div className={styles.wrapper}>
				<div className={styles.label}>Subscription Details</div>
			</div>
			<div className={styles.subscription_details}>
				<div className={styles.styled_row}>
					<div className={styles.styled_col}>{Mapping[plan?.priority_sequence] || ''}</div>
					<div className={styles.styled_col2}>
						<div className={styles.row2}>
							<div className={styles.heading}>{plan?.description}</div>
						</div>
						<div className={styles.row2}>
							{/* <Tagged background="#fce4bf"> tag */}
							<div className={styles.offer_tag}>
								{Math.round(percentage)}
								% off
							</div>
							{/* </Tagged> */}
						</div>
					</div>
				</div>
				<div className={styles.styled_col3}>{shortFormatNumber(amount, currency)}</div>
			</div>

			<div className={styles.feature_row}>
				Features Included
				<div className={styles.line_wrapper}>
					<div className={styles.line} />
				</div>
			</div>
			<div className={`${styles.styled_row} ${styles.mt_8}`}>
				<div className={styles.list}>
					{(metadata?.plan_details || []).map((item) => (
						<div className={styles.flex} key={item?.display_name}>
							<IcMFtick fill="#67c676" width={16} height={16} />
							<div className={styles.number}>
								{item?.unit_count === -1 ? 'Unlimited' : item?.unit_count}
							</div>
							<div className={styles.text}>{item?.display_name}</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
export default SubscriptionDetails;
