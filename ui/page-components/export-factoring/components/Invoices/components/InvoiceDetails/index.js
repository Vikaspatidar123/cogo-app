import { Breadcrumb, Button } from '@cogoport/components';
import { useState } from 'react';

import CompanyDocuments from './components/CompanyDocuments';
import FundingRequest from './components/FundingRequest';
import ExporterSigningDetails from './components/FundingRequest/components/ExporterSigningDetails';
import FundingSummaryModal from './components/FundingSummaryModal';
import NoaSigning from './components/NoaSigning';
import styles from './styles.module.css';

import formatAmount from '@/ui/commons/utils/formatAmount';
import formatDate from '@/ui/commons/utils/formatDate';
import StatusTag from '@/ui/page-components/export-factoring/common/StatusTag';
import useFetchInvoiceDetails from '@/ui/page-components/export-factoring/hooks/useFetchInvoiceDetails';

const STATUS_FILTER = [
	'active',
	'approval_pending',
	'rejected',
	'signing_pending',
	'signing_initiated',
	'disbursement_pending',
];

const emptyFunction = () => null;

const DETAILS_ARRAY = ['company_documents', 'funding_request', 'noa_signing', 'disbursement'];

const formMapping = {
	company_documents: {
		heading     : 'Upload documents',
		subHeading  : 'Kindly upload all the documents to generate funding request letter',
		subChildren : emptyFunction,
		children    : CompanyDocuments,
	},
	funding_request: {
		heading     : 'Signing of Funding Request Letter',
		subHeading  : 'Kindly generate the funding request letter to start the invoice processing',
		subChildren : FundingRequest,
		children    : ExporterSigningDetails,
	},
	noa_signing: {
		heading     : 'NOA Signing',
		subHeading  : 'NOA Signing is initiated once all the documents are approved',
		subChildren : emptyFunction,
		children    : NoaSigning,
	},
	disbursement: {
		heading     : 'Disbursement',
		subChildren : emptyFunction,
		children    : emptyFunction,
	},
};

function InvoiceDetails({
	refetchList,
	creditRequest = {},
	setShowCiDetails,
	showCiDetails,
}) {
	const [showFundingSummary, setShowFundingSummary] = useState(false);

	const {
		loading,
		data = {},
		fetchInvoiceDetails,
	} = useFetchInvoiceDetails({
		showCiDetails,
		creditRequest,
	});

	const {
		created_at = '',
		invoice_amount = '',
		currency = '',
		status = '',
		buyer_name = '',
	} = data;

	const handleClick = () => {
		setShowCiDetails((pv) => !pv);
		refetchList();
	};

	return (
		<div>
			<div style={{ display: 'flex', alignItems: 'center' }}>
				<Breadcrumb>
					<Breadcrumb.Item
						label={`SID: ${showCiDetails.sid}`}
						onClick={() => handleClick()}
						style={{ color: 'blue' }}
					/>
					<Breadcrumb.Item label={`Invoice No. ${showCiDetails.invoice_number}`} />
				</Breadcrumb>
			</div>
			<div className={styles.container}>
				<div className={styles.flexBox}>
					<div className={styles.flexDiv}>
						<div className={styles.buyerText}>
							{buyer_name}
						</div>
						{!STATUS_FILTER.includes(status) && !loading && status && (
							<Button
								themeType="link"
								onClick={() => setShowFundingSummary((pv) => !pv)}
							>
								View Funding summary
							</Button>
						)}
					</div>

					<div className={styles.flexDiv}>
						<div className={styles.labelText} style={{ fontWeight: '500' }}>
							Invoice Amount
						</div>
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

					<div className={styles.flexDiv}>
						<div className={styles.labelText}>
							Date Created
						</div>
						{formatDate({
							date       : created_at,
							formatType : 'date',
						})}

					</div>
					<StatusTag status={status} />
				</div>
				<div className={styles.horizontalLine} />

				<div className={styles.flexDiv} style={{ margin: '20px 0px' }}>

					{DETAILS_ARRAY.map((details) => {
						const formFields = formMapping[details];
						const ChildrenComponent = formFields.children;
						const SubChildrenComponent = formFields.subChildren;
						return (
							<div className={styles.step}>
								<div className={styles.stepper}>
									<div className={styles.circle} />
									{details !== 'disbursement' && <div className={styles.line} />}
								</div>
								<div className={styles.content}>
									<div className={styles.headerFlex}>
										<div style={{ width: '64%' }}>
											<div style={{ fontWeight: 'bold', fontSize: '16px' }}>
												{formFields.heading}
											</div>
											<div style={{ fontSize: '12px' }}>
												{formFields.subHeading}
											</div>
										</div>
										<div style={{ width: '50%' }}>
											<SubChildrenComponent
												data={data}
												creditRequest={creditRequest}
												refetch={fetchInvoiceDetails}
											/>
										</div>
									</div>
									<div className={styles.mainContent}>
										<ChildrenComponent
											data={data}
											creditRequest={creditRequest}
											refetch={fetchInvoiceDetails}
										/>
									</div>
								</div>
							</div>
						);
					})}

				</div>
			</div>
			{showFundingSummary && (
				<FundingSummaryModal
					data={data}
					creditRequest={creditRequest}
					showFundingSummary={showFundingSummary}
					setShowFundingSummary={setShowFundingSummary}
				/>
			)}
		</div>
	);
}
export default InvoiceDetails;
