import { Button, Modal, Checkbox } from '@cogoport/components';
import { useState } from 'react';

import { TERMS_AND_CONDITIONS, VALID_DOC_STATUS, VALID_INVOICE_STATUS } from '../../../../common/constant';

import AddEditCiInfo from './components/AddEditCiInfo';
import CiDetailsInfo from './components/CiDetailsInfo';

import useSubmitCiDocsDetails from '@/ui/page-components/export-factoring/hooks/useSubmitCiDocsDetails';

function CommercialInvoice({
	openDocsModal,
	setOpenDocsModal,
	data = {},
	refetch,
	creditRequest,
}) {
	const { overall_document_status = {}, document_url = '', status = '' } = data;
	const { commercial_invoice = '' } = overall_document_status || {};

	const shouldDisplaySubmitButton = VALID_DOC_STATUS.includes(commercial_invoice)
		|| VALID_INVOICE_STATUS.includes(status);

	const [isPrivacyPolicyChecked, setIsPrivacyPolicyChecked] = useState(false);
	const [showCiForm, setShowCiForm] = useState(false);

	const { loading, onCIDocSubmit } = useSubmitCiDocsDetails({
		setOpenDocsModal,
		openDocsModal,
		creditRequest,
		refetch,
		data,
	});

	return (
		<Modal
			show={openDocsModal}
			size="lg"
			onClose={() => setOpenDocsModal((pv) => !pv)}
		>
			<Modal.Header title="Commercial Invoice" />
			<Modal.Body style={{ minHeight: '500px' }}>
				{!document_url ? (
					<AddEditCiInfo
						data={data}
						refetch={refetch}
						creditRequest={creditRequest}
						showCiForm={showCiForm}
						setShowCiForm={setShowCiForm}
					/>
				)
					: (<CiDetailsInfo data={data} creditRequest={creditRequest} refetch={refetch} />)}
			</Modal.Body>
			{shouldDisplaySubmitButton && (
				<>
					<div style={{ display: 'flex' }}>
						<Checkbox
							checked={isPrivacyPolicyChecked}
							onChange={() => setIsPrivacyPolicyChecked((pv) => !pv)}
						/>
						<div>{TERMS_AND_CONDITIONS}</div>
					</div>
					<Modal.Footer>
						<Button
							type="button"
							size="md"
							disabled={
								!document_url
								|| !isPrivacyPolicyChecked
								|| loading
								|| commercial_invoice === 'approved'
							}
							onClick={onCIDocSubmit}
						>
							Submit
						</Button>
					</Modal.Footer>
				</>
			)}

		</Modal>
	);
}

export default CommercialInvoice;
