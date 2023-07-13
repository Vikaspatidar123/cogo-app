import { Button, Modal, Checkbox } from '@cogoport/components';
import { IcMPlus } from '@cogoport/icons-react';
import { useState } from 'react';

import { TERMS_AND_CONDITIONS, VALID_DOC_STATUS, VALID_INVOICE_STATUS } from '../../../../common/constant';

import AddEditPoInfo from './components/AddEditPoInfo';
import PoDetailsInfo from './components/PoDetailsInfo';
import styles from './styles.module.css';

import useSubmitPoDocsDetails from '@/ui/page-components/export-factoring/hooks/useSubmitPoDocsDetails';

function PurchaseOrder({
	openDocsModal,
	setOpenDocsModal,
	creditRequest,
	data = {},
	refetch,
}) {
	const { overall_document_status = {}, status = '', documents = {} } = data;
	const {
		purchase_order = [],
	} = documents;
	const { purchase_order: statusTag = '' } = overall_document_status || {};

	const shouldDisplaySubmitButton =	VALID_DOC_STATUS.includes(statusTag)
		|| VALID_INVOICE_STATUS.includes(status);

	const [isPrivacyPolicyChecked, setIsPrivacyPolicyChecked] = useState(false);
	const [showPoForm, setShowPoForm] = useState(
		(purchase_order || []).length === 0,
	);

	const { onPoDocSubmit, loading } = useSubmitPoDocsDetails({
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
			<Modal.Header title="Purchase Order" />
			<Modal.Body style={{ minHeight: '300px' }}>
				<>
					{status === 'active'
					&& (!showPoForm ? (
						<div className={styles.buttonDiv}>
							<Button
								type="button"
								size="md"
								themeType="accent"
								onClick={() => setShowPoForm((pv) => !pv)}
							>
								<IcMPlus size={3} />
								Add PO
							</Button>
						</div>
					) : (
						<AddEditPoInfo
							data={data}
							refetch={refetch}
							purchase_order={purchase_order}
							showPoForm={showPoForm}
							setShowPoForm={setShowPoForm}
							creditRequest={creditRequest}
							TERMS_AND_CONDITIONS={TERMS_AND_CONDITIONS}
						/>
					))}
					{(purchase_order || []).length > 0
					&& (purchase_order || []).map((doc, index) => (
						<PoDetailsInfo
							key={doc?.id}
							doc={doc}
							data={data}
							refetch={refetch}
							index={index}
							creditRequest={creditRequest}
							TERMS_AND_CONDITIONS={TERMS_AND_CONDITIONS}
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
						|| purchase_order.length < 1
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

export default PurchaseOrder;
