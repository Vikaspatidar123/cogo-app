/* eslint-disable react/no-unknown-property */
// import GLOBAL_CONSTANTS from '@cogo/globalization/constants/globals.js';
// import formatDate from '@cogo/globalization/utils/formatDate';
// import { Button, TextArea, toast } from '@cogoport/front/components/admin';
// import { startCase } from '@cogoport/front/utils';
// import React, { useState } from 'react';

import { Button, Textarea, Toast } from '@cogoport/components';
import { format, startCase } from '@cogoport/utils';
import { useState } from 'react';

import styles from './styles.module.css';

// import useGetPreRequirements from '../../../hooks/useGetPreRequirements';
// import updateShipmentDocument from '../../../hooks/useUpdateShipmentDocument';

// import ConfirmationModal from './ConfirmationModal';
// import {
// 	Container,
// 	DisplayDetails,
// 	SubHeading,
// 	SubDetail,
// 	SubHalfDetail,
// 	FileView,
// 	ActionButtons,
// 	Remark,
// 	Row,
// } from './styles';

const incoTermMapping = {
	cif : 'export',
	cfr : 'export',
	cpt : 'export',
	cip : 'export',
	dat : 'export',
	dap : 'export',
	ddp : 'export',
	fob : 'import',
	exw : 'import',
	fca : 'import',
	fas : 'import',
};

export function Form({
	task,
	shipment_data,
	refetch = () => {},
	onClose = () => {},
}) {
	const { shipment_type = '', inco_term = '' } = shipment_data;

	const { doc_data } = useGetPreRequirements('/list_shipment_documents', {
		filters             : { shipment_id: task.shipment_id, id: task.task_field_id },
		performed_by_org_id : task.organization_id,
		service_type        : shipment_data.service_type,
	});

	const description = doc_data?.data
		? JSON.parse(doc_data?.data)?.description
		: undefined;

	const [approvalState, setApprovalState] = useState(null);
	const [remarkValue, setRemarkValue] = useState('');
	const [confirmationApproval, setConfirmationApproval] = useState(false);

	const { updateDocument, loading } = updateShipmentDocument({
		remarkValue,
		task,
		doc_data,
		refetch,
		onClose,
	});

	const handleApprove = async () => {
		await updateDocument('document_accepted');
	};

	const handleAmmend = () => {
		setApprovalState({ ammend: true });
	};

	const handleSubmit = async () => {
		if (approvalState?.ammend) {
			if (!remarkValue) {
				Toast.error('Please provide amendment reason');
			}
			await updateDocument('document_amendment_requested');
		} else {
			await updateDocument('document_accepted');
		}
	};

	const isLTL = shipment_type === 'ltl_freight';
	const documentUrlData =		isLTL && doc_data?.data ? JSON.parse(doc_data?.data) : {};

	return (
		<div>
			<div className={styles.display_details}>
				<div className={styles.sub_half_detail}>
					<div className={styles.row}>
						<p className={styles.sub_heading}>Document Type : </p>
						<p className={styles.sub_detail}>{startCase(doc_data.document_type)}</p>
					</div>
					<div className={styles.row}>
						<p className={styles.sub_heading}>Document State : </p>
						<p className={styles.sub_detail}>{startCase(doc_data.state)}</p>
					</div>
				</div>
				<div className={styles.sub_half_detail}>
					<div className={styles.row}>
						<p className={styles.sub_heading}>Uploaded At : </p>
						<p className={styles.sub_detail}>
							{format(doc_data.Uploaded_at, 'dd MMM yyyy')}
						</p>
					</div>
					<div className={styles.row}>
						<p className={styles.sub_heading}>Uploaded By :</p>
						<p className={styles.sub_detail}>
							{startCase(doc_data.uploaded_by_org?.business_name)}
						</p>
					</div>
				</div>
				{description && shipment_type === 'air_freight' && (
					<div className={styles.sub_half_detail}>
						<p className={styles.sub_heading}>Remarks : </p>
						<p className={styles.sub_detail}>{description}</p>
					</div>
				)}
				{isLTL ? (
					<div>
						<div className={styles.sub_half_detail}>
							<div className={styles.row}>
								<p className={styles.sub_heading}>Amount :</p>
								<p className={styles.sub_detail}>
									{`${documentUrlData?.currency || ''} ${
										documentUrlData?.price || ''
									}`}
								</p>
							</div>
							<div className={styles.row}>
								<p className={styles.sub_heading}>Invoice Number :</p>
								<p className={styles.sub_detail}>{documentUrlData?.invoice_number || ''}</p>
							</div>
						</div>
						<div className={styles.sub_half_detail}>
							<div className={styles.row}>
								<p className={styles.sub_heading}>Payment Reference Number :</p>
								<p className={styles.sub_detail}>
									{documentUrlData?.payment_reference_number || ''}
								</p>
							</div>
						</div>
					</div>
				) : null}
			</div>
			{!approvalState ? (
				<div className={styles.file_view}>
					<object
						title="review_file"
						data={doc_data.document_url}
						width="100%"
						type="application/pdf"
						allowFullScreen
					/>
				</div>
			) : null}
			{approvalState?.ammend ? (
				<div className={styles.remark}>
					<p className={styles.sub_heading}>Please specify the reason for this </p>
					<Textarea
						className="remark_text"
						value={remarkValue}
						onChange={(e) => setRemarkValue(e?.target?.value)}
						placeholder="Type Remarks"
					/>
				</div>
			) : null}
			{!approvalState ? (
				<div className={styles.action_button}>
					<Button
						onClick={handleAmmend}
						disabled={loading}
						themeType="secondary"
					>
						Amend
					</Button>
					{shipment_type === 'air_freight'
					&& incoTermMapping[inco_term] === 'import' ? (
						<Button onClick={() => setConfirmationApproval(true)}>
							Approve
						</Button>
						) : (
							<Button onClick={handleApprove} disabled={loading}>
								Approve
							</Button>
						)}
				</div>
			) : (
				<div className={styles.action_button}>
					<Button
						onClick={() => {
							onClose();
						}}
						className="secondary md"
						disabled={loading}
					>
						Cancel
					</Button>
					<Button onClick={handleSubmit} disabled={loading}>
						Submit
					</Button>
				</div>
			)}
			{confirmationApproval && (
				<ConfirmationModal
					confirmationApproval={confirmationApproval}
					setConfirmationApproval={setConfirmationApproval}
					updateDocument={updateDocument}
					loading={loading}
				/>
			)}
		</div>
	);
}

export default Form;
