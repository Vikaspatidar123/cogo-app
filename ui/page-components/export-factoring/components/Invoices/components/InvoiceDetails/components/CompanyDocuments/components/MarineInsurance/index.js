import { Button, Modal, Checkbox } from '@cogoport/components';
import { IcMPlus } from '@cogoport/icons-react';
import { useState } from 'react';

import { TERMS_AND_CONDITIONS, VALID_DOC_STATUS, VALID_INVOICE_STATUS } from '../../../../common/constant';

import AddEditMiInfo from './components/AddEditMiInfo';
import MiDetailsInfo from './components/MiDetailsInfo';
import styles from './styles.module.css';

import useSubmitMiDocsDetails from '@/ui/page-components/export-factoring/hooks/useSubmitMiDocsDetails';

function MarineInsurance({
	openDocsModal,
	setOpenDocsModal,
	data = {},
	refetch,
	creditRequest,
}) {
	const { overall_document_status = {}, status = '', documents = {} } = data;
	const {
		marine_insurance = [],
	} = documents;
	const { marine_insurance: statusTag = '' } = overall_document_status || {};

	const shouldDisplaySubmitButton =	VALID_DOC_STATUS.includes(statusTag)
		|| VALID_INVOICE_STATUS.includes(status);

	const [isPrivacyPolicyChecked, setIsPrivacyPolicyChecked] = useState(false);
	const [showMiForm, setShowMiForm] = useState(
		(marine_insurance || []).length === 0,
	);

	const { onMiDocSubmit, loading } = useSubmitMiDocsDetails({
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
			<Modal.Header title="Marine Insurance" />
			<Modal.Body style={{ minHeight: '300px' }}>
				<>
					{status === 'active'
					&& (!showMiForm ? (
						<div className={styles.buttonDiv}>
							<Button
								type="button"
								size="md"
								themeType="accent"
								onClick={() => setShowMiForm((pv) => !pv)}
							>
								<IcMPlus size={3} />
								Add PO
							</Button>
						</div>
					) : (
						<AddEditMiInfo
							data={data}
							refetch={refetch}
							marine_insurance={marine_insurance}
							showPoForm={showMiForm}
							setShowMiForm={setShowMiForm}
							creditRequest={creditRequest}
							TERMS_AND_CONDITIONS={TERMS_AND_CONDITIONS}
						/>
					))}
					{(marine_insurance || []).length > 0
					&& (marine_insurance || []).map((doc, index) => (
						<MiDetailsInfo
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
						|| marine_insurance.length < 1
						|| loading
					}
							onClick={onMiDocSubmit}
						>
							Submit
						</Button>
					</Modal.Footer>
				</>
			)}
		</Modal>
	);
}

export default MarineInsurance;
