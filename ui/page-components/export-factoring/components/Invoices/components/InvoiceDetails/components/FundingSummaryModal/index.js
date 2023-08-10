import { Modal, Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

import formatAmount from '@/ui/commons/utils/formatAmount';
import useFetchFundingSummary from '@/ui/page-components/export-factoring/hooks/useFetchFundingSummary';

const formatCredit = (currency = 'USD', amount = 0) => {
	const value = formatAmount({
		amount,
		currency,
		options: {
			style                 : 'currency',
			currencyDisplay       : 'code',
			maximumFractionDigits : 10,
		},
	}).replace(/[T]/, 'K');
	return value;
};

function FundingSummaryModal({
	data = {},
	creditRequest,
	showFundingSummary,
	setShowFundingSummary,
}) {
	const { data: fundingData = {}, loading } = useFetchFundingSummary({
		invoice: data,
		creditRequest,
	});

	const { status = '' } = data || {};

	const {
		invoiceSummary = {},
		estimatedSettlementSummary = {},
		actualSettlementSummary = {},
	} = fundingData || {};
	const {
		currency = '',
		deductions = 0,
		dueDate = '',
		finalAdvanceAmount = 0,
		grossInvoiceAmount = 0,
		isFundingComplete = false,
		maxAdvanceAmount = 0,
		statedAmount = 0,
		totalUnpaidInvoiceAmount = 0,
	} = invoiceSummary;
	const {
		interestCharges = 0,
		settlementAmount = 0,
		setupFees = 0,
		totalCharges = 0,
		transactionCharges = 0,
	} = estimatedSettlementSummary;
	const {
		actualInterestCharges = 0,
		actualSettlementAmount = 0,
		actualSetupFees = 0,
		actualTotalCharges = 0,
		actualTransactionCharges = 0,
		penalCharges = 0,
		totalPaymentReceived = 0,
		paymentsFunded = [],
		paymentsReceived = [],
	} = actualSettlementSummary;

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
								<Placeholder height="50px" width="900px" />
								<Placeholder height="50px" width="900px" />
							</div>
						))

				) : (
					<>
						<div className={styles.heading} style={{ fontSize: '15px', padding: '10px 0px' }}>
							Invoice Details
						</div>
						<div className={styles.flexBox}>
							<div className={styles.labelText}>Gross Invoice Amount</div>
							<div className={styles.valueText}>
								{formatCredit(currency, grossInvoiceAmount)}
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
							<div className={styles.valueText}>{formatCredit(currency, statedAmount)}</div>
						</div>
						{totalUnpaidInvoiceAmount !== 0 && (
							<div className={styles.flexBox}>
								<div className={styles.labelText}>Total Unpaid Invoice Amount </div>
								<div className={styles.valueText}>
									{formatCredit(currency, totalUnpaidInvoiceAmount)}
								</div>
							</div>
						)}
						<div className={styles.flexBox}>
							<div className={styles.labelText}>Max Advance Amount </div>
							<div className={styles.valueText}>
								{formatCredit(currency, maxAdvanceAmount)}
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
								{formatCredit(currency, finalAdvanceAmount)}
							</div>
						</div>

						<div className={styles.heading} style={{ fontSize: '15px', padding: '10px 0px' }}>
							Estimated Settlement Details
						</div>
						<div className={styles.flexBox}>
							<div className={styles.labelText}>Estimated due date</div>
							<div className={styles.valueText}>{dueDate}</div>
						</div>
						<div className={styles.flexBox}>
							<div className={styles.labelText}>Estimated Interest/Finance charges </div>
							<div className={styles.valueText}>{formatCredit(currency, interestCharges)}</div>
						</div>
						<div className={styles.flexBox}>
							<div className={styles.labelText}>Estimated Transaction Charges </div>
							<div className={styles.valueText}>{formatCredit(currency, transactionCharges)}</div>
						</div>
						<div className={styles.flexBox}>
							<div className={styles.labelText}>Estimated Setup Fees </div>
							<div className={styles.valueText}>{formatCredit(currency, setupFees)}</div>
						</div>
						<div className={styles.flexBox}>
							<div className={styles.labelText} style={{ fontWeight: 'bolder' }}>
								Estimated Total Charges
							</div>
							<div className={styles.valueText}>{formatCredit(currency, totalCharges)}</div>
						</div>
						<div
							className={styles.flexBox}
							style={{ borderTop: '1px dashed #abcd62', borderBottom: '1px solid #e0e0e0' }}
						>
							<div className={styles.labelText} style={{ fontWeight: 'bolder' }}>Settlement Amount</div>
							<div className={styles.valueText}>{formatCredit(currency, settlementAmount)}</div>
						</div>

						{isFundingComplete === true && (
							<>
								<div className={styles.heading} style={{ fontSize: '15px', padding: '10px 0px' }}>
									Funding Details
								</div>
								{paymentsFunded.map((i) => (
									<div className={styles.flexBox} key={i.amount}>
										<div className={styles.labelText}>Payment Funded</div>
										<div className={styles.valueText}>
											{i.paymentDate}
											&ensp; &ensp;
											{formatCredit(currency, i.amount)}
										</div>
									</div>
								))}
							</>
						)}

						{status === 'settled' && (
							<>
								<div className={styles.heading} style={{ fontSize: '15px', padding: '10px 0px' }}>
									Payment Details
								</div>
								{paymentsReceived.map((i) => (
									<div className={styles.flexBox} key={i.amount}>
										<div className={styles.labelText}>Payment Received</div>
										<div className={styles.valueText}>
											{i.paymentDate}
&ensp; &ensp;
											{formatCredit(currency, i.amount)}
										</div>
									</div>
								))}
								<div
									className={styles.flexBox}
									style={{ borderTop: '1px dashed #abcd62', borderBottom: '1px solid #e0e0e0' }}
								>
									<div className={styles.labelText} style={{ fontWeight: 'bolder' }}>
										Total Payment Received
									</div>
									<div className={styles.valueText}>
										{formatCredit(currency, totalPaymentReceived)}
									</div>
								</div>
								<div className={styles.heading} style={{ fontSize: '15px', padding: '10px 0px' }}>
									Actual Settlement Details
								</div>
								<div className={styles.flexBox}>
									<div className={styles.labelText}>Finance Charges </div>
									<div className={styles.valueText}>
										{formatCredit(currency, actualInterestCharges)}
									</div>
								</div>
								<div className={styles.flexBox}>
									<div className={styles.labelText}>Transaction Charges </div>
									<div className={styles.valueText}>
										{formatCredit(currency, actualTransactionCharges)}
									</div>
								</div>
								<div className={styles.flexBox}>
									<div className={styles.labelText}>Setup Fees </div>
									<div className={styles.valueText}>
										{formatCredit(currency, actualSetupFees)}
									</div>
								</div>
								<div className={styles.flexBox}>
									<div className={styles.labelText}>Penal Charges </div>
									<div className={styles.valueText}>{formatCredit(currency, penalCharges)}</div>
								</div>
								<div className={styles.flexBox}>
									<div className={styles.labelText} style={{ fontWeight: 'bolder' }}>
										Total Charges
									</div>
									<div className={styles.valueText}>
										{formatCredit(currency, actualTotalCharges)}
									</div>
								</div>
								<div
									className={styles.flexBox}
									style={{ borderTop: '1px dashed #abcd62', borderBottom: '1px solid #e0e0e0' }}
								>
									<div className={styles.labelText} style={{ fontWeight: 'bolder' }}>
										Settlement Amount
									</div>
									<div className={styles.valueText}>
										{formatCredit(currency, actualSettlementAmount)}
									</div>
								</div>
							</>
						)}

					</>
				)}
			</Modal.Body>
		</Modal>
	);
}

export default FundingSummaryModal;
