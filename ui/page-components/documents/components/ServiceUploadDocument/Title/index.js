import { Button, Pill, Tooltip } from '@cogoport/components';
import { IcMCloudUpload } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';
import UploadedDoc from './UploadedDoc';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const COLOR_MAPPING = {
	uploaded    : 'green',
	un_uploaded : 'red',
};

function UnuploadedDoc({ sampleLink = '' }) {
	const { t } = useTranslation(['documents']);

	return (
		<div className={styles.init_title}>
			{sampleLink ? (
				<div className={styles.sampleLink}>
					<a href={sampleLink} target="_blank" rel="noreferrer">
						{t('documents:sample_doc_btn')}
					</a>
				</div>
			) : null }

			<Button themeType="secondary">
				<IcMCloudUpload />
				<div style={{ padding: '0 4px 0 0' }} />
				{t('documents:upload_btn')}
			</Button>
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
						placement="bottom"
					>
						<div className={styles.doc_name}>
							{doc_data?.doc_name}
						</div>
					</Tooltip>
				</div>
			</div>

			{isEmpty(uploadedDoc)
				? <UnuploadedDoc sampleLink={doc_data?.sample_link} />
				: <UploadedDoc uploadedDoc={uploadedDoc} refetch={refetch} />}
		</div>
	);
}

export default Title;
