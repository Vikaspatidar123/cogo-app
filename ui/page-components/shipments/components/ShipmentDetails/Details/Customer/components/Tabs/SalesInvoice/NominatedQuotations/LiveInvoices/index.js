import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

import formatAmount from '@/ui/commons/utils/formatAmount';

function LiveInvoices({ data = {} }) {
	return (
		<section className={styles.section}>
			<div className={styles.heading_bq}>Quotation</div>
			<div className={styles.service_container}>
				<div className={styles.flex_row}>
					<div className={styles.div1}>{startCase(data?.service_type)}</div>
					<div className={styles.div2}>currency</div>
					<div className={styles.div2}>Rate</div>
					<div className={styles.div2}>quantity</div>
					<div className={styles.div2}>Tax</div>
					<div className={styles.div2}>Cost</div>
				</div>

				{(data?.line_items || []).map((lineItem, index) => {
					const customStyle =						(data?.line_items || []).length - 1 === index
						? { border: 'none' }
						: {};

					return (
						<div className={styles.flex_row} style={customStyle}>
							<div className={styles.div2}>{lineItem?.name}</div>
							<div className={styles.div2}>{lineItem?.currency}</div>
							<div className={styles.div2}>{lineItem?.price}</div>
							<div className={styles.div2}>{lineItem?.quantity}</div>

							<div className={styles.div2}>
								{(lineItem?.tax_price || 0, lineItem?.currency)}
								<div className="showPercent">
									(
									{lineItem.tax_percent || 0}
									%)
								</div>
							</div>

							<div className={styles.div2}>{lineItem?.total_price || 0}</div>
						</div>
					);
				})}

				<div className={styles.total}>
					<div>
						Overall Total
						<small> (excluding TAX)</small>
					</div>
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
					<div>Overall Total with TAX</div>
					{' '}
					<div className={styles.inc_of_tax}>(including all services)</div>
				</div>
				<div style={{ marginLeft: '16px' }}>
					{formatAmount({
						amount   : data.net_total,
						currency : data.net_total_price_currency,
						options  : { style: 'currency', currencyDisplay: 'code' },
					})}
				</div>
			</div>
		</section>
	);
}

export default LiveInvoices;
