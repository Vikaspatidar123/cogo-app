import { cl, Popover } from '@cogoport/components';
// import { ToastContent } from '@cogoport/components/dist/types/tokens/Toast';
import { IcMOverflowDot } from '@cogoport/icons-react';

import tooltipConfig from '../../../../configurations/tooltipConfig';

import styles from './styles.module.css';

import { shortFormatNumber } from '@/ui/commons/utils/getShortFormatNumber';

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
function MobileCard({ data, setQuoteId, setShowDeleteModal }) {
	console.log(data, 'ele');
	return data.map((ele) => (
		<div className={styles.box}>

			<div className={cl`${styles.date_row} ${styles.date_col}`}>
				<div className={styles.flexs}>
					<div className={styles.date}>ID:</div>
					<div className={styles.quote_no}>{ele.quotationNo}</div>
				</div>
				<div>
					<Popover
						placement="bottom"
						render={tooltipContent({ quotationId: ele.id, setShowDeleteModal, setQuoteId })}
					>
						<IcMOverflowDot />
					</Popover>
				</div>

			</div>
			<div className={styles.second}>
				<div className={styles.date_col}>
					<div className={styles.date}>Buyer:</div>
					<div className={styles.date_digits}>{ele.buyerName}</div>

				</div>
			</div>
			<div className={styles.third} />
			<div className={cl`${styles.date_row} ${styles.date_col}`}>
				<div className={styles.flexs}>
					<div className={styles.date}>Date:</div>
					<div className={styles.date_digits}>
						{ele.quotationDate}
					</div>
				</div>
				<div className={styles.border} />
				<div className={styles.flexs}>
					<div className={styles.date}>Expiry:</div>
					<div className={styles.date_digits}>
						{ele.expiryDate}
					</div>
				</div>

			</div>
			<div className={styles.fourth} />
			<div className={cl`${styles.amount} ${styles.date_col}`}>
				<div className={styles.flexs}>
					<div className={styles.date}>Amount:</div>
					<div className={styles.date_digits}>
						{ele.totalAmount}
					</div>
				</div>
				<div>
					<div className={styles.last}>
						{ele.documentStatus}
					</div>

				</div>

			</div>
		</div>
	));
}

export default MobileCard;
