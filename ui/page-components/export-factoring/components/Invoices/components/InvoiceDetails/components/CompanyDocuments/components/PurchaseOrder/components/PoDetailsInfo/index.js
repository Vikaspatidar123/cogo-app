import { Tooltip } from '@cogoport/components';
import { IcMPdf } from '@cogoport/icons-react';
import { useState } from 'react';

import PopoverAlert from '../../../../../../common/PopoverAlert';
import AddEditPoInfo from '../AddEditPoInfo';

import styles from './styles.module.css';

import formatDate from '@/ui/commons/utils/formatDate';
import PdfViewer from '@/ui/page-components/export-factoring/common/PdfViewer';
import StatusBox from '@/ui/page-components/export-factoring/common/StatusBox';
import useSavePoDocsDetails from '@/ui/page-components/export-factoring/hooks/useSavePoDocsDetails';

function PoDetailsInfo({
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
	} = doc;
	const { document_date = '', document_number = '' } = document_data || {};

	const { loading, onPoDocSave } = useSavePoDocsDetails({
		data,
		doc,
		refetch,
		creditRequest,
		is_deleted 	  : true,
		showPoForm    : showDeleteForm,
		setShowPoForm : setShowDeleteForm,
	});

	return (
		<div className={styles.container}>
			<div style={{ display: 'flex' }}>
				<div style={{ fontSize: '16px' }}>
					PO #
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
										onSubmit={onPoDocSave}
										loading={loading}
										showDeleteForm={showDeleteForm}
										setShowDeleteForm={setShowDeleteForm}
									/>
								)}
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
						</div>
						<div className={styles.detailsContainer}>
							<div className={styles.dataDiv}>
								<div className={styles.labelText}>
									PO No:
								</div>
								<div className={styles.valueText}>
									{document_number}
								</div>
							</div>

							<div className={styles.dataDiv}>
								<div className={styles.labelText}>
									PO Date:
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
					<AddEditPoInfo
						doc={doc}
						data={data}
						refetch={refetch}
						creditRequest={creditRequest}
						showPoForm={showEditForm}
						setShowPoForm={setShowEditForm}
					/>
				)}
			</div>
		</div>
	);
}

export default PoDetailsInfo;
