import { Button, Pill, Tooltip } from '@cogoport/components';
import { IcMCloudUpload, IcMEyeopen, IcMDelete } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

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

function UploadedDoc() {
	return (
		<div className={styles.success_container}>
			<div style={{ display: 'flex', width: '88%' }}>
				<div className={styles.success_info}>
					Document Number :
					{' '}
					<span className={styles.info}>1234</span>
				</div>
				<div className={styles.success_info}>
					Uploaded on :
					{' '}
					<span className={styles.info}>1234</span>
				</div>
				<div className={styles.success_info}>
					Valid Till :
					{' '}
					<span className={styles.info}>1234</span>
				</div>
			</div>

			<div>
				<IcMEyeopen onClick={() => window.open('/', '_blank')} className={styles.icon} />

				<IcMDelete className={styles.icon} onClick={() => console.log('delete')} />
			</div>
		</div>
	);
}

function Title({
	doc_data = {},
	data = [],
}) {
	const uploadedDoc = data?.filter((doc) => doc?.document_name === doc_data?.doc_name)
		?.[GLOBAL_CONSTANTS.zeroth_index];

	return (
		<div className={styles.title_container}>
			<div className={styles.label}>
				<Pill
					color={uploadedDoc ? COLOR_MAPPING.uploaded : COLOR_MAPPING.un_uploaded}
					className={styles.tag}
				/>

				<div className={styles.listTitle}>
					<Tooltip animation="shift-away" content={doc_data?.doc_name} placement="top">
						<div>{doc_data?.doc_name}</div>
					</Tooltip>
				</div>
			</div>

			{isEmpty(uploadedDoc) ? <UnuploadedDoc sampleLink={doc_data?.sample_link} /> : <UploadedDoc />}
		</div>
	);
}

export default Title;
