import { Popover } from '@cogoport/components';
import { isEmpty, startCase } from '@cogoport/utils';

import Actions from './Actions';
import styles from './styles.module.css';

import formatAmount from '@/ui/commons/utils/formatAmount';

function Header({ children, invoice = {}, shipmentData = {} }) {
	const {
		invoice_total_currency,
		invoice_total_discounted,
		live_invoice_number,
		billing_address,
		payment_mode,
		credit_option,
	} = invoice;

	const handleDownload = () => {
		if (invoice?.status === 'reviewed') {
			window.open(
				`${process.env.BUSINESS_FINANCE_BASE_URL}/sales/invoice/proforma/${invoice?.data?.id}/download`,
			);
		} else if (invoice?.status === 'approved') {
			window.open(
				`${process.env.BUSINESS_FINANCE_BASE_URL}/sales/invoice/final/${invoice?.data?.id}/download`,
			);
		}
	};

	return (
		<div className={styles.cotainer}>
			<div className={styles.invoice_detail_container}>
				<div className={styles.invoice_party_details}>
					<div className={styles.invoice_party_number}>
						Invoice Number:
						<div
							className={`${styles.so_number} ${!isEmpty(invoice?.data) ? styles.status : null}`}
							onClick={!isEmpty(invoice?.data) ? handleDownload : null}
						>
							{live_invoice_number || ''}
						</div>
					</div>

					<div className={styles.gst}>
						<div className={styles.label}>GST Number :</div>
						<Popover
							theme="light"
							interactive
							render={(
								<div style={{ fontSize: '10px', textTransform: 'capitalize' }}>
									{billing_address?.address}
								</div>
							)}
						>
							<span className={styles.gst_number}>{billing_address?.tax_number}</span>
						</Popover>
					</div>
				</div>

				<div className={styles.invoiceValue_container}>
					<span className={styles.invoice_value_title}>Invoice Value - </span>
					<span className={styles.invoice_value}>
						{formatAmount({
							amount   : invoice_total_discounted,
							currency : invoice_total_currency,
							options  : {
								style                 : 'currency',
								currencyDisplay       : 'code',
								maximumFractionDigits : 2,
							},
						})}
					</span>
				</div>

				<div className={styles.invoice_info}>
					{payment_mode !== 'cash' ? (
						<p className={styles.payment_type}>
							{startCase(payment_mode || '')}
							{' '}
							(
							{credit_option?.selected_credit_days || ''}
							)
							{' '}
						</p>
					) : (
						<p className={styles.payment_type}>{startCase(payment_mode || '')}</p>
					)}
					<Actions invoice={invoice} shipmentData={shipmentData} />
				</div>
			</div>

			<div>{children}</div>
		</div>
	);
}
export default Header;
