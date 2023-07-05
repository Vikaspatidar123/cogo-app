import { Modal, Skeleton } from '@cogoport/components';

import styles from './styles.module.css';

import formatAmount from '@/ui/commons/utils/formatAmount';
import useFetchFundingSummary from '@/ui/page-components/export-factoring/hooks/useFetchFundingSummary';

const formatCredit = (currency, amount) => {
	const value = formatAmount({
		amount,
		currency,
		options: {
			style                 : 'currency',
			currency,
			currencyDisplay       : 'symbol',
			maximumFractionDigits : 4,
		},
	}).replace(/[T]/, 'K');
	return value;
};

function FundingSummaryModal({
	data = {},
	showFundingSummary,
	setShowFundingSummary,
}) {
	const { data: fundingData = {}, loading } = useFetchFundingSummary({
		invoice: data,
		// creditRequest,
	});
	const {
		currency = '',
		deductions = '',
		due_date = '',
		final_advance_amount = '',
		gross_invoice_amount = '',
		interest_charges = '',
		max_advance_amount = '',
		settlement_amount = '',
		stated_amount = '',
		total_charges = '',
	} = fundingData;
	return (
		<Modal
			size="lg"
			show={showFundingSummary}
			onClose={() => (setShowFundingSummary((pv) => !pv))}
		>
			<Modal.Header title="View Funding Summary" />
			<Modal.Body>
				{loading ? (
					Array(4)
						.fill(1)
						.map(() => (
							<div className="loader">
								<Skeleton height="50px" width="900px" />
								<Skeleton height="50px" width="900px" />
							</div>
						))
				) : (
					<>
						<div className={StyleSheet.heading} style={{ fontSize: '15px', padding: '10px 0px' }}>
							Funding Details
						</div>
						<div className={styles.flexBox}>
							<div className={styles.labelText}>Gross Invoice Amount</div>
							<div className={styles.valueText}>
								{formatCredit(currency, gross_invoice_amount)}
							</div>
						</div>
						<div className={styles.flexBox}>
							<div className={styles.labelText}>Prior payments & deductions </div>
							<div className={styles.valueText} style={{ color: '#bf291e' }}>
								-
								{' '}
								{formatCredit(currency, deductions)}
							</div>
						</div>
						<div className={styles.flexBox}>
							<div className={styles.labelText}>Stated Amount </div>
							<div className={styles.valueText}>{formatCredit(currency, stated_amount)}</div>
						</div>
						<div className={styles.flexBox}>
							<div className={styles.labelText}>Max Advance Amount </div>
							<div className={styles.valueText}>
								{formatCredit(currency, max_advance_amount)}
							</div>
						</div>

						<div
							className={styles.flexBox}
							style={{ borderTop: '1px dashed #abcd62', borderBottom: '1px solid #e0e0e0' }}
						>
							<div className={styles.labelText} style={{ fontWeight: 'bolder' }}>
								Final Advance Amount
							</div>
							<div className={styles.valueText}>
								{formatCredit(currency, final_advance_amount)}
							</div>
						</div>

						<div className={StyleSheet.heading} style={{ fontSize: '15px', padding: '10px 0px' }}>
							Estimated Settlement Details
						</div>
						<div className={styles.flexBox}>
							<div className={styles.labelText}>Estimated due date</div>
							<div className={styles.valueText}>{due_date}</div>
						</div>
						<div className={styles.flexBox}>
							<div className={styles.labelText}>Estimated Interest/Finance charges </div>
							<div className={styles.valueText}>{formatCredit(currency, interest_charges)}</div>
						</div>
						<div className={styles.flexBox}>
							<div className={styles.labelText} style={{ fontWeight: 'bolder' }}>
								Estimated Total Charges
							</div>
							<div className={styles.valueText}>{formatCredit(currency, total_charges)}</div>
						</div>
						<div
							className={styles.flexBox}
							style={{ borderTop: '1px dashed #abcd62', borderBottom: '1px solid #e0e0e0' }}
						>
							<div className={styles.labelText} style={{ fontWeight: 'bolder' }}>Settlement Amount</div>
							<div className={styles.valueText}>{formatCredit(currency, settlement_amount)}</div>
						</div>
					</>
				)}
			</Modal.Body>
		</Modal>
	);
}

export default FundingSummaryModal;
