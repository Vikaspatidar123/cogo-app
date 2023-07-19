import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

import formatAmount from '@/ui/commons/utils/formatAmount';

function LiveInvoices({ data = {} }) {
	return (
		<section className={styles.section}>
			<div className={styles.heading_bq}>Quotation</div>
			<div className={styles.service_container}>
				<div className={styles.flex_row}>
					<span className={styles.title}>{startCase(data?.service_type)}</span>
					<span className={styles.value}>currency</span>
					<span className={styles.value}>Rate</span>
					<span className={styles.value}>quantity</span>
					<span className={styles.value}>Tax</span>
					<span className={styles.value}>Cost</span>
				</div>

				{(data?.line_items || []).map((lineItem, index) => {
					const customStyle =						(data?.line_items || []).length - 1 === index
						? { border: 'none' }
						: {};

					return (
						<div className={styles.flex_row} style={customStyle} key={lineItem?.name}>
							<span className={styles.value}>{lineItem?.name}</span>
							<span className={styles.value}>{lineItem?.currency}</span>
							<span className={styles.value}>{lineItem?.price}</span>
							<span className={styles.value}>{lineItem?.quantity}</span>

							<span className={styles.value}>
								{(lineItem?.tax_price || 0, lineItem?.currency)}
								<div className={styles.showPercent}>
									(
									{lineItem.tax_percent || 0}
									%)
								</div>
							</span>

							<span className={styles.value}>{lineItem?.total_price || 0}</span>
						</div>
					);
				})}

				<div className={styles.total}>
					<span>
						Overall Total
						{' '}
						<small>(excluding TAX)</small>
					</span>
					<div style={{ marginLeft: '16px' }}>
						{formatAmount({
							amount   : data?.tax_total_price,
							currency : data?.currency,
							options  : { style: 'currency', currencyDisplay: 'code' },
						})}
					</div>
				</div>
			</div>
			<div className={styles.total}>
				<div className={styles.total_with_tax}>
					<span>Overall Total with TAX</span>
					&nbsp;
					<span className={styles.inc_of_tax}>(including all services)</span>
				</div>
				<div style={{ marginLeft: '16px' }}>
					{formatAmount({
						amount   : data?.tax_total_price_discounted,
						currency : data?.currency,
						options  : { style: 'currency', currencyDisplay: 'code' },
					})}
				</div>
			</div>
		</section>
	);
}

export default LiveInvoices;
