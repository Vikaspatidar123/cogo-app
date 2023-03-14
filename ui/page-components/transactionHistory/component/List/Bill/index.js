import { billListConfig } from '../../../configurations/billListConfig';

import styles from './styles.module.css';

import getShortFormatNumber from '@/ui/commons/utils/getShortFromatNumber';

function Bill({ drillDownData }) {
	const { billLineItems = [] } = drillDownData || {};
	const currency = billLineItems?.[0]?.currency || 'INR';
	return (
		<div className={styles.container}>
			<div className={styles.title}><h2>Bill Summary</h2></div>
			<div className={styles.section}>
				<div className={styles.styles_row}>
					{(billListConfig || []).map((item) => (
						<div className={styles.styled_col}>
							<div className={styles.label}>{item.label}</div>
						</div>
					))}
				</div>

				<div className={styles.card_bill}>
					{(billLineItems || []).map((item) => (
						<div className={styles.styled_row}>
							<div className={styles.styled_col} key={item.id}>
								<div>
									{item.description
										.replaceAll('-', ' ')
										.replaceAll('_', ' ')
										.toUpperCase()}
								</div>
							</div>
							<div className={styles.styled_col}>
								<div>
									{getShortFormatNumber(item.pricePerUnit, item.currency)}
									x
									{item?.quantity}
								</div>
							</div>
							<div className={styles.styled_col}>
								<div>{getShortFormatNumber(item.discountAmount, item.currency)}</div>
							</div>
							<div className={styles.styled_col}>
								<div>{getShortFormatNumber(item.taxAmount, item.currency)}</div>
							</div>
							<div className={styles.styled_col}>
								<div>{getShortFormatNumber(item.netAmount, item.currency)}</div>
							</div>
						</div>
					))}
				</div>
				<div className={styles.total_amount}>
					<div>Total Amount : </div>
					<div className={styles.total_value}>{getShortFormatNumber(drillDownData.netAmount, currency)}</div>
				</div>
			</div>
		</div>
	);
}

export default Bill;
