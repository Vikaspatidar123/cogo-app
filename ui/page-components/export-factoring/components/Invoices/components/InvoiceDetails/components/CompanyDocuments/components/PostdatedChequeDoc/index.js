import { Button, Modal, Checkbox } from '@cogoport/components';
import { useState } from 'react';

import { TERMS_AND_CONDITIONS, VALID_DOC_STATUS, VALID_INVOICE_STATUS } from '../../../../common/constant';

import AddEditPdcInfo from './components/AddEditPdcInfo';
import PdcDetailsInfo from './components/PdcDetailsInfo';

import useSubmitCiDocsDetails from '@/ui/page-components/export-factoring/hooks/useSubmitCiDocsDetails';
import useSubmitPdcDocsDetails from '@/ui/page-components/export-factoring/hooks/useSubmitPdcDocsDetails';

function PostdatedChequeDoc({
	openDocsModal,
	setOpenDocsModal,
	data = {},
	refetch,
}) {
	const { overall_document_status = {}, status = '', documents = {} } = data || {};
	const { postdated_cheque = [] } = documents;
	const { postdated_cheque: statusTag = '' } = overall_document_status || {};

	const shouldDisplaySubmitButton = VALID_DOC_STATUS.includes(statusTag)
		|| VALID_INVOICE_STATUS.includes(status);

	const [isPrivacyPolicyChecked, setIsPrivacyPolicyChecked] = useState(false);
	const [showPdcForm, setShowPdcForm] = useState(false);

	const { loading, onPdcDocSubmit } = useSubmitPdcDocsDetails({
		setOpenDocsModal,
		openDocsModal,
		refetch,
		data,
	});

	return (
		<Modal
			show={openDocsModal}
			size="lg"
			onClose={() => setOpenDocsModal((pv) => !pv)}
		>
			<Modal.Header title="Posdated Cheque" />
			<Modal.Body>

				{(postdated_cheque || []).length > 0 ? (
					<PdcDetailsInfo
						data={data}
						refetch={refetch}
						doc={postdated_cheque?.[0]}
					/>
				) : (
					<AddEditPdcInfo
						showPdcForm={showPdcForm}
						setShowPdcForm={setShowPdcForm}
						data={data}
						refetch={refetch}
						postdated_cheque={postdated_cheque}
					/>
				)}

			</Modal.Body>
			{shouldDisplaySubmitButton && (
				<>
					<div style={{ display: 'flex', margin: '10px 0px' }}>
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
						!isPrivacyPolicyChecked
						|| postdated_cheque.length < 1
						|| loading
					}
							onClick={onPdcDocSubmit}
						>
							Submit
						</Button>
					</Modal.Footer>
				</>
			)}

		</Modal>
	);
}

export default PostdatedChequeDoc;
