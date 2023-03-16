import { billListConfig } from '../../../configurations/billListConfig';

import styles from './styles.module.css';

import formatAmount from '@/ui/commons/utils/formatAmount';

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
									{formatAmount({
										amount   : item.pricePerUnit,
										currency : item.currency,
										options  : {
											notation : 'standard',
											style    : 'currency',
										},
									})}
									x
									{item?.quantity}
								</div>
							</div>
							<div className={styles.styled_col}>
								<div>
									{formatAmount({
										amount   : item.discountAmount,
										currency : item.currency,
										options  : {
											notation : 'standard',
											style    : 'currency',
										},
									})}
								</div>
							</div>
							<div className={styles.styled_col}>
								<div>
									{formatAmount({
										amount   : item.taxAmount,
										currency : item.currency,
										options  : {
											notation : 'standard',
											style    : 'currency',
										},
									})}
								</div>
							</div>
							<div className={styles.styled_col}>
								<div>
									{formatAmount({
										amount   : item.netAmount,
										currency : item.currency,
										options  : {
											notation : 'standard',
											style    : 'currency',
										},
									})}
								</div>
							</div>
						</div>
					))}
				</div>
				<div className={styles.total_amount}>
					<div>Total Amount : </div>
					<div className={styles.total_value}>
						{formatAmount({
							amount  : drillDownData.netAmount,
							currency,
							options : {
								notation : 'standard',
								style    : 'currency',
							},
						})}

					</div>
				</div>
			</div>
		</div>
	);
}

export default Bill;
