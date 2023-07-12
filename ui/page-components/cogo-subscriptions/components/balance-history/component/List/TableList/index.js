import { Placeholder, cl } from '@cogoport/components';
import { IcMArrowNext } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import tableStyles from '../TableHeader/styles.module.css';

import EventName from './EventName';
import styles from './styles.module.css';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import formatDate from '@/ui/commons/utils/formatDate';

const renderUsage = ({ type, value, t }) => {
	if (type) {
		return (
			<>
				<div className={tableStyles.credit}>
					<IcMArrowNext fill="#01C0AA" width={14} height={14} />
				</div>
				{value}
			</>
		);
	}

	if (type === null) {
		return value === -1 ? t('subscriptions:unlimited_text') : value;
	}

	return (
		<>
			<div className={tableStyles.debit}>
				<IcMArrowNext fill="#EE2E6B" width={14} height={14} />
			</div>
			{value}
		</>
	);
};

const getEventType = (type) => {
	if (type) return 'credit';
	if (type === null) return 'reset';
	return 'debit';
};

function TableList({ list = [], loading = false }) {
	const { t } = useTranslation(['subscriptions']);

	return (
		<div>

			{loading
				&& [...Array(5).keys()].map((item) => (
					<>
						<div className={cl`${tableStyles.web_view} ${tableStyles.row}`} key={item}>
							{[...Array(5).keys()].map((ele) => (
								<div className={tableStyles.wd_150} key={ele}>
									<Placeholder />
								</div>
							))}
						</div>
						<div className={cl`${styles.mobile_view} ${styles.card}`}>
							<div className={styles.date}>
								<Placeholder height="15px" width="70px" />
							</div>
							<div className={styles.div}>
								<div className={styles.vertical_div}>
									<div className={styles.type}>
										<Placeholder height="16px" width="60px" />
									</div>
									<div className={styles.sub_heading}>
										<Placeholder height="12px" margin="8px 0px" width="50px" />
									</div>
									<div className={styles.title}>
										<Placeholder height="18px" width="70px" />
									</div>
								</div>
								<div className={styles.quantity}>
									<Placeholder height="24px" width="50px" />
								</div>
							</div>
						</div>
					</>
				))}
			{!loading && isEmpty(list?.length) && <div>{t('subscriptions:no_data_text')}</div>}
			{!loading
				&& !isEmpty(list?.length)
				&& (list || []).map(
					(
						{
							created_at = '',
							is_credit,
							product_name = '',
							quantity = 0,
							event_name = '',
						},
						index,
					) => {
						const eventType = getEventType(is_credit);
						return (
							<div>
								<div className={cl`${styles.mobile_view} ${styles.card}`}>
									<div className={styles.date}>
										{t('subscriptions:dated_text')}
										:
										{formatDate({
											date       : created_at,
											dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
											formatType : 'date',
										})}
									</div>
									<div className={styles.div}>
										<div className={styles.vertical_div}>
											<div
												className={`${styles.type} ${styles[eventType]}`}
											>
												<EventName type={is_credit} name={event_name} />
											</div>
											<div className={styles.sub_heading}>
												{t('subscriptions:feature_name_text')}

											</div>
											<div className={styles.title}>{product_name}</div>
										</div>
										<div className={styles.quantity}>
											{renderUsage({
												type  : is_credit,
												value : quantity,
												t,
											})}

										</div>
									</div>
								</div>

								<div className={cl`${tableStyles.web_view} ${tableStyles.row}`}>
									<div className={tableStyles.wd_100}>{index + 1}</div>
									<div className={tableStyles.wd_150}>{product_name}</div>
									<div className={tableStyles.wd_150}>
										<EventName type={is_credit} name={event_name} />
									</div>
									<div className={tableStyles.wd_150}>
										{formatDate({
											date       : created_at,
											dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
											formatType : 'date',
										})}
									</div>
									<div className={cl`${tableStyles.wd_150} ${tableStyles.flex}`}>
										{renderUsage({
											type  : is_credit,
											value : quantity,
											t,
										})}
									</div>
								</div>
							</div>
						);
					},
				)}
		</div>
	);
}
export default TableList;
