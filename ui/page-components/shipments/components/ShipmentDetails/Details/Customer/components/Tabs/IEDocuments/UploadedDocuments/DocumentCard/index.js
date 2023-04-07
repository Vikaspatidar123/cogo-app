import { Tooltip, Button } from '@cogoport/components';
import { format, startCase } from '@cogoport/utils';
import { saveAs } from 'file-saver';
import { useState } from 'react';

import styles from './styles.module.css';

const printableDocs = ['draft_house_bill_of_lading'];

function DocumentCard({
	details = {},
	shipment_data = {},
	containsFreightCertificate,
	refetch = () => {},
	primary_service = {},
}) {
	const [showPrintDoc, setShowPrintDoc] = useState(false);
	const [showHbl, setShowHbl] = useState(null);

	const handleDownload = (url) => {
		saveAs(url);
	};
	const document_data = details?.data ? JSON.parse(details?.data) : {};
	const handleView = (url) => {
		window.open(url, '_blank');
	};
	const showUpdateAWBStakeholders = ['superadmin', 'service_ops2'];
	const allowedStakeHolder = shipment_data?.stakeholder_types?.some((e) => showUpdateAWBStakeholders.includes(e));

	const airActions =	details?.document_type === 'draft_airway_bill'
		&& document_data?.status === 'generated';

	const isBlReleased = [
		'approved',
		'released',
		'surrendered',
		'delivered',
	].includes(details?.bl_detail_status);

	const watermark = !isBlReleased ? 'draft' : ' ';

	return (
		<>
			<div className={`${styles.container} ${styles.documentcard_container}`}>
				<div className={styles.document_name}>
					<img
						src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/ic-document.svg"
						alt="docs"
						width={28}
						height={28}
					/>

					<div className={styles.heading}>{startCase(details?.document_type)}</div>
				</div>

				<p className={styles.file_status}>
					Upload On :
					{' '}
					{format((details?.uploaded_at, 'dd MMM yyyy'))}
				</p>

				<Tooltip
					placement="bottom"
					theme="light"
					content={(
						<div style={{ fontSize: '10px' }}>
							{details?.uploaded_by_org?.business_name}
						</div>
					)}
				>
					<div className={styles.source_details}>
						<div className={styles.source_name}>
							Source :
							{' '}
							{details?.uploaded_by_org?.business_name || ''}
						</div>
					</div>
				</Tooltip>

				<div
					className={`${styles.service_name} ${details?.service_type ? '' : styles.service_not_available}`}
				>
					{details?.service_type
						? `Service : ${startCase(details?.service_type)}`
						: '-'}
				</div>

				<div className={styles.doc_status}>
					Status:
					{startCase(details?.state)}
				</div>

				<div className={styles.action_container}>
					{printableDocs.includes(details?.document_type) && (
						<Button
							onClick={() => setShowHbl(true)}
							className="primary md text"
						>
							Print
						</Button>
					)}
					{details?.document_type === 'airway_bill'
						&& details?.state === 'document_accepted'
						&& shipment_data?.shipment_type === 'air_freight'
						&& allowedStakeHolder && (
							<Button
								className="primary md text"
							>
								Update
							</Button>
					)}

					{airActions ? (
						<Button
							className="primary md text"
							onClick={() => setShowPrintDoc(!showPrintDoc)}
						>
							View
						</Button>
					) : null}

					{(details?.document_type !== 'draft_house_bill_of_lading'
						|| isBlReleased)
					&& !airActions ? (
						<>
							<Button
								className="primary md text"
								onClick={() => handleView(details?.document_url)}
							>
								View
							</Button>
							<Button
								className="primary md text"
								onClick={() => handleDownload(details?.document_url)}
							>
								Download
							</Button>
						</>
						) : null}

					{showHbl ? (
						<PrintDoc
							summary={shipment_data}
							services={shipment_data?.all_services || []}
							show={showHbl}
							setShow={setShowHbl}
							watermark={watermark}
							hblData={document_data}
						/>
					) : null}

					{containsFreightCertificate
						&& details?.document_type === 'freight_certificate' && (
							<Button
								className="primary md text"
								disabled={details?.state === 'document_rejected'}
							>
								Update
							</Button>
					)}
				</div>
			</div>
			<div>
				{showPrintDoc && (
					<GenerateDoc
						shipment_data={shipment_data}
						viewDoc={showPrintDoc}
						details={details}
						primary_service={primary_service}
					/>
				)}
			</div>
		</>
	);
}

export default DocumentCard;
