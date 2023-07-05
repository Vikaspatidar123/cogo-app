import { Button } from '@cogoport/components';
import React, { useState } from 'react';

// import ReviewDetails from './components/ReviewDetails';
import ReviewDetails from './components/ReviewDetails';
import styles from './styles.module.css';

import StatusTag from '@/ui/page-components/export-factoring/common/StatusTag';
// import ReviewDetails from './components/ReviewDetails';

function FundingRequest({
	creditRequest = {},
	data = {},
	refetch,
}) {
	const {
		created_at = '',
		invoice_number = '',
		invoice_amount = '',
		currency = '',
		documents = {},
		overall_document_status = {},
		status = '',
		buyer_name = '',
		offer_receivable_details = {},
		noa_details = {},
	} = data || {};

	const { offer_receivable: status_offer_receivable = '', ...rest } = overall_document_status;

	const { offer_receivable = [] } = documents;

	const [receivableModal, setReceivableModal] = useState(false);

	const isOrgOptedPdc = creditRequest?.cheque_type === 'postdated_cheque';

	const is_any_docs_rejected = Object.keys(rest || {})
		.filter((key) => !(isOrgOptedPdc === false && key === 'postdated_cheque'))
		.some((key) => ['rejected', 'pending'].includes(overall_document_status[key]));

	return (
		<>
			<div className={styles.flexBox}>
				<StatusTag status={status_offer_receivable} />
				<Button
					size="md"
					themeType="primary"
					style={{ marginRight: '20px' }}
					disabled={
						status_offer_receivable === 'approved'
						|| (status !== 'active'
							&& status_offer_receivable !== 'rejected')
						|| is_any_docs_rejected
					}
					onClick={() => setReceivableModal((pv) => !pv)}
				>
					{(offer_receivable || []).length > 0
						? 'Re-generate'
						: 'Generate'}
				</Button>
			</div>
			{receivableModal && (
				<ReviewDetails
					data={data}
					refetch={refetch}
					receivableModal={receivableModal}
					setReceivableModal={setReceivableModal}
				/>
			)}
		</>
	);
}

export default FundingRequest;
