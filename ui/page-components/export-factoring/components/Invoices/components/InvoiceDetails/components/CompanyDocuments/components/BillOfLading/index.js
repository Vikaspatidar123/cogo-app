import { Button, Modal, Checkbox } from '@cogoport/components';
import { IcMPlus } from '@cogoport/icons-react';
import { useState } from 'react';

import { TERMS_AND_CONDITIONS, VALID_DOC_STATUS, VALID_INVOICE_STATUS } from '../../../../common/constant';

import AddEditBlInfo from './components/AddEditBlInfo';
import BlDetailsInfo from './components/BlDetailsInfo';
import styles from './styles.module.css';

import useSubmitBlDocsDetails from '@/ui/page-components/export-factoring/hooks/useSubmitBlDocsDetails';

function BillOfLading({
	openDocsModal,
	setOpenDocsModal,
	data = {},
	refetch,
	creditRequest,
}) {
	const { overall_document_status = {}, status = '', documents = {} } = data;
	const {
		bill_of_lading = [],
	} = documents;
	const { purchase_order: statusTag = '' } = overall_document_status || {};

	const shouldDisplaySubmitButton =	VALID_DOC_STATUS.includes(statusTag)
		|| VALID_INVOICE_STATUS.includes(status);

	const [isPrivacyPolicyChecked, setIsPrivacyPolicyChecked] = useState(false);
	const [showBlForm, setShowBlForm] = useState(
		(bill_of_lading || []).length === 0,
	);

	const { onPoDocSubmit, loading } = useSubmitBlDocsDetails({
		data,
		refetch,
		creditRequest,
		openDocsModal,
		setOpenDocsModal,
	});

	return (
		<Modal
			show={openDocsModal}
			size="lg"
			onClose={() => setOpenDocsModal((pv) => !pv)}
		>
			<Modal.Header title="Bill of Lading" />
			<Modal.Body style={{ minHeight: '500px' }}>
				<>
					{status === 'active'
					&& (!showBlForm ? (
						<div className={styles.buttonDiv}>
							<Button
								type="button"
								size="md"
								themeType="accent"
								onClick={() => setShowBlForm((pv) => !pv)}
							>
								<IcMPlus size={3} />
								Add BL
							</Button>
						</div>
					) : (
						<AddEditBlInfo
							data={data}
							refetch={refetch}
							bill_of_lading={bill_of_lading}
							showBlForm={showBlForm}
							setShowBlForm={setShowBlForm}
							creditRequest={creditRequest}
							TERMS_AND_CONDITIONS={TERMS_AND_CONDITIONS}
						/>
					))}
					{(bill_of_lading || []).length > 0
					&& (bill_of_lading || []).map((doc, index) => (
						<BlDetailsInfo
							key={doc?.id}
							doc={doc}
							data={data}
							refetch={refetch}
							index={index}
							creditRequest={creditRequest}
						/>
					))}
				</>
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
						|| bill_of_lading.length < 1
						|| loading
					}
							onClick={onPoDocSubmit}
						>
							Submit
						</Button>
					</Modal.Footer>
				</>
			)}
		</Modal>
	);
}

export default BillOfLading;
