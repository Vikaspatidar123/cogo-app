import { Placeholder } from '@cogoport/components';
// import { formatDateToString } from '@cogoport/front/date';
import { IcCRedCircle, IcCGreenCircle, IcMArrowNext } from '@cogoport/icons-react';
import { format } from '@cogoport/utils';

import tableStyles from '../TableHeader/styles.module.css';

import styles from './styles.module.css';

const renderEventName = (type, name) => {
	if (type) {
		return (
			<>
				<IcCGreenCircle width={6} height={6} />
				{' '}
				{name}
			</>
		);
	}
	if (type === null) {
		return (
			<>
				<div className={tableStyles.grey_dot} />
				{name}
			</>
		);
	}
	return (
		<>
			<IcCRedCircle width={6} height={6} />
			{' '}
			{name}
		</>
	);
};

const renderUsage = (type, value) => {
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
		return value === -1 ? 'Unlimited' : value;
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

function TableList({ list = [], loading = false, isMobile = false }) {
	const loaderCount = [1, 2, 3, 4, 5];

	return (
		<>
			{loading
				&& !isMobile
				&& loaderCount.map(() => (
					<div className={tableStyles.row}>
						{loaderCount.map(() => (
							<div className={tableStyles.wd_150}>
								<Placeholder />
							</div>
						))}
					</div>
				))}
			{loading
				&& isMobile
				&& loaderCount.map(() => (
					<div className={styles.card}>
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
				))}
			{!loading && list?.length === 0 && <div>No Data found</div>}
			{!loading
				&& list?.length > 0
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
						return isMobile ? (
							<div className={styles.card}>
								<div className={styles.date}>
									Dated:
									{format(created_at, 'dd MMM yyyy')}
								</div>
								<div className={styles.div}>
									<div className={styles.vertical_div}>
										<div
											className={`${styles.type} ${styles[eventType]}`}
										>
											{renderEventName(is_credit, event_name)}
										</div>
										<div className={styles.sub_heading}>Feature Name</div>
										<div className={styles.title}>{product_name}</div>
									</div>
									<div className={styles.quantity}>{renderUsage(is_credit, quantity)}</div>
								</div>
							</div>
						) : (
							<div className={tableStyles.row}>
								<div className={tableStyles.wd_100}>{index + 1}</div>
								<div className={tableStyles.wd_150}>{product_name}</div>
								<div className={tableStyles.wd_150}>{renderEventName(is_credit, event_name)}</div>
								<div className={tableStyles.wd_150}>
									{format(created_at, 'dd MMM yyyy')}
								</div>
								<div className={`${tableStyles.wd_150} ${tableStyles.flex}`}>
									{' '}
									{renderUsage(is_credit, quantity)}
								</div>
							</div>
						);
					},
				)}
		</>
	);
}
export default TableList;
