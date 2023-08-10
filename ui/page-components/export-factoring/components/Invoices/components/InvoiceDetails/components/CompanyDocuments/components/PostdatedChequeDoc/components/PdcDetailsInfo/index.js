import { Tooltip } from '@cogoport/components';
import { IcMPdf } from '@cogoport/icons-react';
import { useState } from 'react';

import AddEditPdcInfo from '../AddEditPdcInfo';

import styles from './styles.module.css';

import PdfViewer from '@/ui/page-components/export-factoring/common/PdfViewer';
import StatusBox from '@/ui/page-components/export-factoring/common/StatusBox';

function PdcDetailsInfo({
	data = {},
	refetch,
	doc = {},
	creditRequest,
}) {
	const [showEditForm, setShowEditForm] = useState(false);

	const { status = '' } = data || {};
	const {
		document_url,
		status: statusTag,
		rejection_reason = '',
	} = doc;

	return (
		<div className={styles.container}>
			<div style={{ display: 'flex' }}>
				<div style={{ fontSize: '16px' }}>Pdc #01 </div>
				<StatusBox
					status={statusTag}
					rejection_reason={rejection_reason}
				/>
			</div>
			<div className={styles.mainContainer}>
				{!showEditForm ? (
					<div className={styles.topContainer}>
						<Tooltip
							content={<PdfViewer url={document_url} width="100%" />}
							placement="right"
							theme="light"
							interactive
						>
							<div className={styles.linkBox}>
								<IcMPdf height="30px" width="20px" />
								<div className={styles.mainHead}>Pdc Doc</div>
							</div>
						</Tooltip>
						{(statusTag === 'review_requested' || status === 'active') && (
							<div
								role="presentation"
								className={styles.mainHead}
								onClick={() => setShowEditForm((pv) => !pv)}
							>
								Edit
							</div>
						)}
					</div>

				) : (
					<AddEditPdcInfo
						doc={doc}
						data={data}
						refetch={refetch}
						creditRequest={creditRequest}
						showPdcForm={showEditForm}
						setShowPdcForm={setShowEditForm}
					/>
				)}
			</div>
		</div>
	);
}
export default PdcDetailsInfo;
