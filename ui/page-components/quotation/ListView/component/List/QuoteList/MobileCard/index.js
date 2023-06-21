import { cl, Popover, Placeholder } from '@cogoport/components';
// import { ToastContent } from '@cogoport/components/dist/types/tokens/Toast';
import { IcMOverflowDot, IcCYelloCircle } from '@cogoport/icons-react';

import tooltipConfig from '../../../../configurations/tooltipConfig';

import styles from './styles.module.css';

import formatAmount from '@/ui/commons/utils/formatAmount';

const tooltipContent = ({ documentStatus, quotationId, setShowDeleteModal, setQuoteId }) => {
	const tooltipContentConfig = tooltipConfig({ documentStatus, quotationId, setShowDeleteModal, setQuoteId });

	return (
		<div>
			{(tooltipContentConfig || []).map((item, index) => (
				item?.condition && (
					<div
						style={{ borderTop: `${index > 0 && '1px solid #d3d3d3'}` }}
						className={cl`${styles.info} ${styles[item?.className]}`}
					>
						{item?.icon}
						<span
							className={styles.text}
							onClick={item?.onClick}
							role="presentation"
						>
							{item?.name}
						</span>
					</div>
				)
			))}
		</div>
	);
};

function MobileCard({ data = [], loading = false, setQuoteId, setShowDeleteModal }) {
	return data.map((ele) => (
		<div className={styles.box} key={ele?.quotationId}>
			{loading && (
				<div>
					<Placeholder margin="0 0 12px 0" />
					<Placeholder margin="0 0 12px 0" />
					<Placeholder margin="0 0 12px 0" />
					<Placeholder margin="0 0 12px 0" />
				</div>
			)}
			{!loading && (
				<>
					<div className={cl`${styles.date_row} ${styles.date_col}`}>
						<div className={styles.flexs}>
							<div className={styles.date}>ID:</div>
							<div className={styles.quote_no}>{ele?.quotationNo}</div>
						</div>
						<div>
							<Popover
								placement="bottom"
								render={tooltipContent({ quotationId: ele?.id, setShowDeleteModal, setQuoteId })}
							>
								<IcMOverflowDot />
							</Popover>
						</div>

					</div>

					<div className={styles.date_col}>
						<div className={styles.date}>Buyer:</div>
						<div className={styles.date_digits}>
							{ele?.buyerName}
						</div>
					</div>

					<div className={cl`${styles.date_row} ${styles.date_col}`}>
						<div className={styles.flexs}>
							<div className={styles.date}>Date:</div>
							<div className={styles.date_digits}>
								{ele?.quotationDate}
							</div>
						</div>
						<div className={styles.border} />
						<div className={styles.flexs}>
							<div className={styles.date}>Expiry:</div>
							<div className={styles.date_digits}>
								{ele?.expiryDate}
							</div>
						</div>
					</div>

					<div className={cl`${styles.amount} ${styles.date_col}`}>
						<div className={styles.flexs}>
							<div className={styles.date}>Amount:</div>
							<div className={styles.date_digits}>
								{formatAmount({
									amount   : ele?.totalAmount,
									currency : ele?.currency,
									options  : {
										style: 'currency',
									},
								})}
							</div>
						</div>

						<div className={styles.last}>
							<IcCYelloCircle className={styles.dot} />
							{ele?.documentStatus}
						</div>
					</div>

				</>
			)}
		</div>
	));
}

export default MobileCard;
