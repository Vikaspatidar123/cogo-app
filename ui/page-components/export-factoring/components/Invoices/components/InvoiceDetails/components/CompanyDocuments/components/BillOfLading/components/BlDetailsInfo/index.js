import { Tooltip } from '@cogoport/components';
import { IcMPdf } from '@cogoport/icons-react';
import { useState } from 'react';

import PopoverAlert from '../../../../../../common/PopoverAlert';
import AddEditBlInfo from '../AddEditBlInfo';

import styles from './styles.module.css';

import formatAmount from '@/ui/commons/utils/formatAmount';
import formatDate from '@/ui/commons/utils/formatDate';
import PdfViewer from '@/ui/page-components/export-factoring/common/PdfViewer';
import StatusBox from '@/ui/page-components/export-factoring/common/StatusBox';
import useSaveBlDocsDetails from '@/ui/page-components/export-factoring/hooks/useSaveBlDocsDetails';

function BlDetailsInfo({
	doc = {},
	data = {},
	index,
	refetch,
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

	const {
		vessel_name = '',
		document_date = '',
		shipping_line = {},
		consignee_name = '',
		document_number = '',
		container_number = [],
		destination_port = {},
		consignee_country = {},
		origin_country = {},
		goods = [],
	} = document_data;

	const { loading, onPoDocSave } = useSaveBlDocsDetails({
		data,
		doc,
		refetch,
		is_deleted 	  : true,
		showBlForm    : showDeleteForm,
		setShowBlForm : setShowDeleteForm,
	});

	return (
		<div className={styles.container}>
			<div style={{ display: 'flex' }}>
				<div style={{ fontSize: '16px' }}>
					BL #
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
									BL No:
								</div>
								<div className={styles.valueText}>
									{document_number}
								</div>
							</div>

							<div className={styles.dataDiv}>
								<div className={styles.labelText}>
									BL Date:
								</div>
								<div className={styles.valueText}>
									{formatDate({
										date       : document_date,
										formatType : 'date',
									})}
								</div>
							</div>

							<div className={styles.dataDiv}>
								<div className={styles.labelText}>
									Vessel Name
								</div>
								<div className={styles.valueText}>
									{vessel_name}
								</div>
							</div>

							<div className={styles.dataDiv}>
								<div className={styles.labelText}>
									Consignee Name
								</div>
								<div className={styles.valueText}>
									{consignee_name}
								</div>
							</div>

							<div className={styles.dataDiv}>
								<div className={styles.labelText}>
									Consignee Country
								</div>
								<div className={styles.valueText}>
									{consignee_country.name}
								</div>
							</div>

							<div className={styles.dataDiv}>
								<div className={styles.labelText}>
									Shipping Line
								</div>
								<div className={styles.valueText}>
									{shipping_line.name}
								</div>
							</div>

							<div className={styles.dataDiv}>
								<div className={styles.labelText}>
									Destination Port
								</div>
								<div className={styles.valueText}>
									{destination_port.name}
								</div>
							</div>

							<div className={styles.dataDiv}>
								<div className={styles.labelText}>
									Origin Country
								</div>
								<div className={styles.valueText}>
									{origin_country.name}
								</div>
							</div>

							<div className={styles.dataDiv}>
								<div className={styles.labelText}>
									Container Number
								</div>
								<div className={styles.valueText}>
									{container_number?.map((x) => (
										<div className={styles.containerBox} key={x}>{x}</div>
									))}
								</div>
							</div>

							<div className={styles.dataDiv}>
								<div className={styles.labelText}>
									Goods
								</div>
								<div className={styles.valueText}>
									{goods?.map((x) => (
										<div className={styles.containerBox} key={x}>{x}</div>
									))}
								</div>
							</div>

						</div>
					</>

				) : (
					<AddEditBlInfo
						doc={doc}
						data={data}
						refetch={refetch}
						showBlForm={showEditForm}
						setShowBlForm={setShowEditForm}
					/>
				)}
			</div>
		</div>
	);
}

export default BlDetailsInfo;
