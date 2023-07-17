import { Tooltip } from '@cogoport/components';
import { IcMPdf } from '@cogoport/icons-react';
import { useState } from 'react';

import PopoverAlert from '../../../../../../common/PopoverAlert';
import AddEditMiInfo from '../AddEditMiInfo';

import styles from './styles.module.css';

import PdfViewer from '@/ui/page-components/export-factoring/common/PdfViewer';
import StatusBox from '@/ui/page-components/export-factoring/common/StatusBox';
import useSaveMiDocsDetails from '@/ui/page-components/export-factoring/hooks/useSaveMiDocsDetails';

function MiDetailsInfo({
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
	const { insuring_party_name = '', document_number = '' } = document_data;

	const { loading, onMiDocSave } = useSaveMiDocsDetails({
		data,
		doc,
		refetch,
		creditRequest,
		is_deleted 	  : true,
		showMiForm    : showDeleteForm,
		setShowMiForm : setShowDeleteForm,
	});

	return (
		<div className={styles.container}>
			<div style={{ display: 'flex' }}>
				<div style={{ fontSize: '16px' }}>
					MI #
					{index + 1}
					{' '}
				</div>
				<StatusBox
					status={statusTag}
					rejection_reason={rejection_reason}
				/>
			</div>
			<div className={styles.main_container}>
				{!showEditForm ? (
					<>
						<div className={styles.top_container}>
							<Tooltip
								content={<PdfViewer url={document_url} width="100%" />}
								placement="right"
								theme="light"
								interactive
							>
								<div className={styles.link_box}>
									<IcMPdf height="30px" width="20px" />
									<div className={styles.main_head}>Doc</div>
								</div>
							</Tooltip>
							<div style={{ display: 'flex', alignItems: 'center' }}>
								{status === 'active' && (
									<PopoverAlert
										onSubmit={onMiDocSave}
										loading={loading}
										showDeleteForm={showDeleteForm}
										setShowDeleteForm={setShowDeleteForm}
									/>
								)}
								{(statusTag === 'review_requested' || status === 'active') && (
									<div
										className={styles.main_head}
										onClick={() => setShowEditForm((pv) => !pv)}
									>
										Edit
									</div>
								)}
							</div>
						</div>
						<div className={styles.details_container}>
							<div className={styles.data_div}>
								<div className={styles.label_text}>
									MI No:
								</div>
								<div className={styles.value_text}>
									{document_number}
								</div>
							</div>

							<div className={styles.data_div}>
								<div className={styles.label_text}>
									Insuring Party Name:
								</div>
								<div className={styles.value_text}>
									{insuring_party_name}
								</div>
							</div>

						</div>
					</>

				) : (
					<AddEditMiInfo
						doc={doc}
						data={data}
						refetch={refetch}
						creditRequest={creditRequest}
						showMiForm={showEditForm}
						setShowMiForm={setShowEditForm}
					/>
				)}
			</div>
		</div>
	);
}

export default MiDetailsInfo;
