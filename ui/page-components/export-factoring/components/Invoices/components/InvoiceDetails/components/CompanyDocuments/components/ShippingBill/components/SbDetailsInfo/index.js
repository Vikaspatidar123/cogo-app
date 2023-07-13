import { Tooltip } from '@cogoport/components';
import { IcMPdf } from '@cogoport/icons-react';
import { useState } from 'react';

import PopoverAlert from '../../../../../../common/PopoverAlert';
import AddEditSbInfo from '../AddEditSbInfo';

import styles from './styles.module.css';

import formatDate from '@/ui/commons/utils/formatDate';
import PdfViewer from '@/ui/page-components/export-factoring/common/PdfViewer';
import StatusBox from '@/ui/page-components/export-factoring/common/StatusBox';
import useSaveSbDocsDetails from '@/ui/page-components/export-factoring/hooks/useSaveSbDocsDetails';

function SbDetailsInfo({
	doc = {},
	data = {},
	index,
	refetch,
	creditRequest,
}) {
	const [showEditForm, setShowEditForm] = useState(false);
	const [showDeleteForm, setShowDeleteForm] = useState(false);
	const { status = '' } = data || {};
	const {
		document_url = '',
		document_data = {},
		status: statusTag = '',
		rejection_reason = '',
	} = doc || {};

	const { document_date = '', document_number = '' } = document_data || {};

	const { loading, onSbDocSave } = useSaveSbDocsDetails({
		data,
		doc,
		refetch,
		creditRequest,
		is_deleted 	  : true,
		showSBForm    : showDeleteForm,
		setShowSbForm : setShowDeleteForm,
	});

	return (
		<div className={styles.container}>
			<div style={{ display: 'flex' }}>
				<div style={{ fontSize: '16px' }}>
					SB #
					{index + 1}
					{' '}
				</div>
				<StatusBox
					status={statusTag}
					rejection_reason={rejection_reason}
				/>
			</div>
			<div className={styles.mainContainer}>
				{!showEditForm ? (
					<>
						<div className={styles.topContainer}>
							<Tooltip
								content={<PdfViewer url={document_url} width="100%" />}
								placement="right"
								theme="light"
								interactive
							>
								<div className={styles.linkBox}>
									<IcMPdf height="30px" width="20px" />
									<div className={styles.mainHead}>Doc</div>
								</div>
							</Tooltip>
							<div style={{ display: 'flex', alignItems: 'center' }}>
								{status === 'active' && (
									<PopoverAlert
										onSubmit={onSbDocSave}
										loading={loading}
										showDeleteForm={showDeleteForm}
										setShowDeleteForm={setShowDeleteForm}
									/>
								)}
								{(statusTag === 'review_requested' || status === 'active') && (
									<div
										className={styles.mainHead}
										onClick={() => setShowEditForm((pv) => !pv)}
									>
										Edit
									</div>
								)}
							</div>
						</div>
						<div className={styles.detailsContainer}>
							<div className={styles.dataDiv}>
								<div className={styles.labelText}>
									SB No:
								</div>
								<div className={styles.valueText}>
									{document_number}
								</div>
							</div>

							<div className={styles.dataDiv}>
								<div className={styles.labelText}>
									SB Date:
								</div>
								<div className={styles.valueText}>
									{formatDate({
										date       : document_date,
										formatType : 'date',
									})}
								</div>
							</div>

						</div>
					</>

				) : (
					<AddEditSbInfo
						doc={doc}
						data={data}
						refetch={refetch}
						creditRequest={creditRequest}
						showSbForm={showEditForm}
						setShowSbForm={setShowEditForm}
					/>
				)}
			</div>
		</div>
	);
}

export default SbDetailsInfo;
