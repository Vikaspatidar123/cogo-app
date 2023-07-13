import { Button, Modal, Checkbox } from '@cogoport/components';
import { IcMPlus } from '@cogoport/icons-react';
import { useState } from 'react';

import { TERMS_AND_CONDITIONS, VALID_DOC_STATUS, VALID_INVOICE_STATUS } from '../../../../common/constant';

import AddEditSbInfo from './components/AddEditSbInfo';
import SbDetailsInfo from './components/SbDetailsInfo';
import styles from './styles.module.css';

import useSubmitSbDocsDetails from '@/ui/page-components/export-factoring/hooks/useSubmitSbDocsDetails';

function ShippingBill({
	openDocsModal,
	setOpenDocsModal,
	data = {},
	refetch,
	creditRequest,
}) {
	const { overall_document_status = {}, status = '', documents = {} } = data;
	const {
		shipping_bill = [],
	} = documents;
	const { shipping_bill: statusTag = '' } = overall_document_status || {};

	const shouldDisplaySubmitButton =	VALID_DOC_STATUS.includes(statusTag)
		|| VALID_INVOICE_STATUS.includes(status);

	const [isPrivacyPolicyChecked, setIsPrivacyPolicyChecked] = useState(false);
	const [showSbForm, setShowSbForm] = useState(
		(shipping_bill || []).length === 0,
	);

	const { onSbDocSubmit, loading } = useSubmitSbDocsDetails({
		data,
		refetch,
		openDocsModal,
		setOpenDocsModal,
		creditRequest,
	});

	return (
		<Modal
			show={openDocsModal}
			size="lg"
			onClose={() => setOpenDocsModal((pv) => !pv)}
		>
			<Modal.Header title="Shipping Bill" />
			<Modal.Body style={{ minHeight: '300px' }}>
				<>
					{status === 'active'
					&& (!showSbForm ? (
						<div className={styles.buttonDiv}>
							<Button
								type="button"
								size="md"
								themeType="accent"
								onClick={() => setShowSbForm((pv) => !pv)}
							>
								<IcMPlus size={3} />
								Add SB
							</Button>
						</div>
					) : (
						<AddEditSbInfo
							data={data}
							refetch={refetch}
							shipping_bill={shipping_bill}
							showSbForm={showSbForm}
							setShowSbForm={setShowSbForm}
							creditRequest={creditRequest}
							TERMS_AND_CONDITIONS={TERMS_AND_CONDITIONS}
						/>
					))}
					{(shipping_bill || []).length > 0
					&& (shipping_bill || []).map((doc, index) => (
						<SbDetailsInfo
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
						|| shipping_bill.length < 1
						|| loading
					}
							onClick={onSbDocSubmit}
						>
							Submit
						</Button>
					</Modal.Footer>
				</>
			)}
		</Modal>
	);
}

export default ShippingBill;
