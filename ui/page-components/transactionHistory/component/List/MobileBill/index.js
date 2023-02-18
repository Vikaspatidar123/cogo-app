import { billListConfig } from '../../../configurations/billListConfig';
import { shortFormatNumber } from '../../../utils/getShortFormatNumber';
import styles from '../styles.module.css';

function MobileBill({ drillDownData }) {
	const { billLineItems = [] } = drillDownData || {};
	const currency = billLineItems?.[0]?.currency || 'INR';
	return (
		<div className={styles.container}>
			<div className={styles.title}>Bill Summary</div>
			<div className={styles.section}>
				<div className={styles.styled_row}>
					{(billListConfig || [])
						.filter((items) => ['netAmount', 'description'].includes(items?.key))
						.map((item) => (
							<div className={styles.styled_col}>
								<div className="title">{item.label}</div>
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
								<div>{shortFormatNumber(item.netAmount, item.currency)}</div>
							</div>
						</div>
					))}
				</div>
				<div className={styles.styled_row}>
					<div className={styles.styled_col}>Total Amount</div>
					<div className={styles.styled_col}>
						<div>{shortFormatNumber(drillDownData.netAmount, currency)}</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default MobileBill;
