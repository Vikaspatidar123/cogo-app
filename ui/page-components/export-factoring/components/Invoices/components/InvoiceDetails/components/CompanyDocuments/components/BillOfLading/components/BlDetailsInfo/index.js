import { Tooltip } from '@cogoport/components';
import { IcMPdf } from '@cogoport/icons-react';
import { useState } from 'react';

import PopoverAlert from '../../../../../../common/PopoverAlert';
import AddEditBlInfo from '../AddEditBlInfo';

import styles from './styles.module.css';

import formatDate from '@/ui/commons/utils/formatDate';
import PdfViewer from '@/ui/page-components/export-factoring/common/PdfViewer';
import StatusBox from '@/ui/page-components/export-factoring/common/StatusBox';
import useSaveBlDocsDetails from '@/ui/page-components/export-factoring/hooks/useSaveBlDocsDetails';

function BlDetailsInfo({
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
		creditRequest,
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
										onSubmit={onPoDocSave}
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
									BL No:
								</div>
								<div className={styles.value_text}>
									{document_number}
								</div>
							</div>

							<div className={styles.data_div}>
								<div className={styles.label_text}>
									BL Date:
								</div>
								<div className={styles.value_text}>
									{formatDate({
										date       : document_date,
										formatType : 'date',
									})}
								</div>
							</div>

							<div className={styles.data_div}>
								<div className={styles.label_text}>
									Vessel Name
								</div>
								<div className={styles.value_text}>
									{vessel_name}
								</div>
							</div>

							<div className={styles.data_div}>
								<div className={styles.label_text}>
									Consignee Name
								</div>
								<div className={styles.value_text}>
									{consignee_name}
								</div>
							</div>

							<div className={styles.data_div}>
								<div className={styles.label_text}>
									Consignee Country
								</div>
								<div className={styles.value_text}>
									{consignee_country.name}
								</div>
							</div>

							<div className={styles.data_div}>
								<div className={styles.label_text}>
									Shipping Line
								</div>
								<div className={styles.value_text}>
									{shipping_line.name}
								</div>
							</div>

							<div className={styles.data_div}>
								<div className={styles.label_text}>
									Destination Port
								</div>
								<div className={styles.value_text}>
									{destination_port.name}
								</div>
							</div>

							<div className={styles.data_div}>
								<div className={styles.label_text}>
									Origin Country
								</div>
								<div className={styles.value_text}>
									{origin_country.name}
								</div>
							</div>

							<div className={styles.data_div}>
								<div className={styles.label_text}>
									Container Number
								</div>
								<div className={styles.value_text}>
									{container_number?.map((x) => (
										<div className={styles.container_box} key={x}>{x}</div>
									))}
								</div>
							</div>

							<div className={styles.data_div}>
								<div className={styles.label_text}>
									Goods
								</div>
								<div className={styles.value_text}>
									{goods?.map((x) => (
										<div className={styles.container_box} key={x}>{x}</div>
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
						creditRequest={creditRequest}
						showBlForm={showEditForm}
						setShowBlForm={setShowEditForm}
					/>
				)}
			</div>
		</div>
	);
}

export default BlDetailsInfo;
