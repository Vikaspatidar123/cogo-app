import { Button, Pill, Tooltip, cl } from '@cogoport/components';
import { IcMCloudUpload, IcMEyeopen, IcMDelete } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import useDeleteDocument from '../../../hooks/useDeleteDocument';

import styles from './styles.module.css';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import formatDate from '@/ui/commons/utils/formatDate';

const COLOR_MAPPING = {
	uploaded    : 'green',
	un_uploaded : 'red',
};

function UnuploadedDoc({ sampleLink = '' }) {
	return (
		<div className={styles.init_title}>
			{sampleLink ? (
				<div className={styles.sampleLink}>
					<a href={sampleLink}>
						View Sample Doc
					</a>
				</div>
			) : null }

			<Button themeType="secondary">
				<IcMCloudUpload />
				<div style={{ padding: '0 4px 0 0' }} />
				Upload
			</Button>
		</div>
	);
}

function UploadedDoc({
	uploadedDoc = {},
	refetch = () => {},
}) {
	const {
		deleteDocument,
		loading,
	} = useDeleteDocument({ refetch });

	const handleDelete = () => {
		deleteDocument({ item: uploadedDoc });
	};

	return (
		<div className={styles.success_container}>
			<div style={{ display: 'flex', width: '88%' }}>
				<div className={styles.success_info_doc}>
					Document Number :
					{' '}
					<span className={styles.info}>
						{uploadedDoc?.data?.document_number}
					</span>
				</div>

				<div className={styles.success_info}>
					Valid Till :
					{' '}
					<span className={styles.info}>
						{formatDate({
							date       : (uploadedDoc?.data.document_validity),
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
							formatType : 'date',
						})}
					</span>
				</div>

				<div className={styles.success_info}>
					Uploaded on :
					{' '}
					<span className={styles.info}>
						{formatDate({
							date       : (uploadedDoc?.created_at),
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
							formatType : 'date',
						})}
					</span>
				</div>
			</div>

			<div>
				<IcMEyeopen onClick={() => window.open(uploadedDoc?.image_url, '_blank')} className={styles.icon} />

				<IcMDelete
					className={cl`${styles.icon} ${loading ? styles.loading : null}`}
					onClick={!loading ? handleDelete : null}
				/>
			</div>
		</div>
	);
}

function Title({
	doc_data = {},
	data = [],
	refetch = () => {},
}) {
	const uploadedDoc = data?.filter((doc) => doc?.name === doc_data?.doc_name)
		?.[GLOBAL_CONSTANTS.zeroth_index];

	return (
		<div className={styles.title_container}>
			<div className={styles.label}>
				<Pill
					color={uploadedDoc ? COLOR_MAPPING.uploaded : COLOR_MAPPING.un_uploaded}
					className={styles.tag}
				/>

				<div className={styles.listTitle}>
					<Tooltip
						className={styles.tool_tip}
						maxWidth={500}
						animation="shift-away"
						content={doc_data?.doc_name}
						placement="top"
					>
						{doc_data?.doc_name}
					</Tooltip>
				</div>
			</div>

			{isEmpty(uploadedDoc) ? <UnuploadedDoc sampleLink={doc_data?.sample_link} />
				: <UploadedDoc uploadedDoc={uploadedDoc} refetch={refetch} />}
		</div>
	);
}

export default Title;
