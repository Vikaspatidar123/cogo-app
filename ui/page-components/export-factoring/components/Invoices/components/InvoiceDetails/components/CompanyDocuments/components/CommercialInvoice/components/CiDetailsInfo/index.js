import { Tooltip } from '@cogoport/components';
import { IcMPdf } from '@cogoport/icons-react';
import { useState } from 'react';

import AddEditCiInfo from '../AddEditCiInfo';

import styles from './styles.module.css';

import formatAmount from '@/ui/commons/utils/formatAmount';
import formatDate from '@/ui/commons/utils/formatDate';
import PdfViewer from '@/ui/page-components/export-factoring/common/PdfViewer';
import StatusBox from '@/ui/page-components/export-factoring/common/StatusBox';

function CiDetailsInfo({
	data = {},
	refetch,
	creditRequest,
}) {
	const [showEditForm, setShowEditForm] = useState(false);

	const {
		currency = '',
		document_url = '',
		invoice_amount = '',
		invoice_date = '',
		invoice_number = '',
		document_status = '',
		payment_terms = '',
		due_date = '',
		prior_payment = '',
		offer_letter_approved_params = {},
		status = '',
		overall_document_status = {},
		document_reject_reason = '',
	} = data;

	const { commercial_invoice = '' } = overall_document_status || {};
	const { advance_rate = '' } = offer_letter_approved_params;
	return (
		<div className={styles.container}>
			<div style={{ display: 'flex' }}>
				<div style={{ fontSize: '16px' }}>CI #01 </div>
				<StatusBox
					status={document_status}
					rejection_reason={document_reject_reason}
				/>
			</div>
			<div className={styles.mainContainer}>
				{!showEditForm ? (
					<>
						<div className={styles.topContainer}>
							<Tooltip
								content={<PdfViewer url={document_url} width="100%" />}
								placement="right"
								theme="light"
								interactive
							>
								<div className={styles.linkBox}>
									<IcMPdf height="30px" width="20px" />
									<div className={styles.mainHead}>CI Doc</div>
								</div>
							</Tooltip>
							{(status === 'active' || commercial_invoice === 'rejected') && (
								<div
									className={styles.mainHead}
									onClick={() => setShowEditForm((pv) => !pv)}
								>
									Edit
								</div>
							)}
						</div>
						<div className={styles.detailsContainer}>
							<div className={styles.dataDiv}>
								<div className={styles.labelText}>
									CI No
								</div>
								<div className={styles.valueText}>
									{invoice_number}
								</div>
							</div>

							<div className={styles.dataDiv}>
								<div className={styles.labelText}>
									CI Date
								</div>
								<div className={styles.valueText}>
									{formatDate({
										date       : invoice_date,
										formatType : 'date',
									})}
								</div>
							</div>

							<div className={styles.dataDiv}>
								<div className={styles.labelText}>
									Invoice Amount
								</div>
								<div className={styles.valueText}>
									{formatAmount({
										amount  : invoice_amount,
										currency,
										options : {
											style                 : 'currency',
											currencyDisplay       : 'code',
											maximumFractionDigits : 10,
										},
									})}
								</div>
							</div>

							<div className={styles.dataDiv}>
								<div className={styles.labelText}>
									Payment Term
								</div>
								<div className={styles.valueText}>
									{payment_terms}
								</div>
							</div>

							<div className={styles.dataDiv}>
								<div className={styles.labelText}>
									Due Date
								</div>
								<div className={styles.valueText}>
									{formatDate({
										date       : due_date,
										formatType : 'date',
									})}
								</div>
							</div>

							<div className={styles.dataDiv}>
								<div className={styles.labelText}>
									Prior Payment
								</div>
								<div className={styles.valueText}>
									{formatAmount({
										amount  : prior_payment,
										currency,
										options : {
											style                 : 'currency',
											currencyDisplay       : 'code',
											maximumFractionDigits : 10,
										},
									})}
								</div>
							</div>

							<div className={styles.dataDiv}>
								<div className={styles.labelText}>
									Net Invoice Amount
								</div>
								<div className={styles.valueText}>
									{formatAmount({
										amount  : invoice_amount - prior_payment,
										currency,
										options : {
											style                 : 'currency',
											currencyDisplay       : 'code',
											maximumFractionDigits : 10,
										},
									})}
								</div>
							</div>

							<div className={styles.dataDiv}>
								<div className={styles.labelText}>
									Max Funded Amount
								</div>
								<div className={styles.valueText}>
									{formatAmount({
										amount  : (advance_rate * (invoice_amount - prior_payment)) / 100,
										currency,
										options : {
											style                 : 'currency',
											currencyDisplay       : 'code',
											maximumFractionDigits : 10,
										},
									})}
								</div>
							</div>

						</div>
					</>

				) : (
					<AddEditCiInfo
						data={data}
						refetch={refetch}
						creditRequest={creditRequest}
						showCiForm={showEditForm}
						setShowCiForm={setShowEditForm}
					/>
				)}
			</div>
		</div>
	);
}
export default CiDetailsInfo;
