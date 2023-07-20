import { Input, Select, Button } from '@cogoport/components';
import { IcMCloudUpload } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import { getOptions } from '../../constants/documentTypeOptions';

import styles from './styles.module.css';

function UploadDocument({
	setShow = () => {},
	documentDetails = {},
	addDocument = () => {},
	loading = false,
	setDocumentDetails = () => {},
}) {
	const { image_url = '' } = documentDetails || {};

	const { t } = useTranslation(['documents']);

	const OPTIONS = getOptions({ t });

	const fileName = image_url?.split('/')?.slice(-1)?.join('');

	function UploadLink() {
		return (
			<div className={styles.upload_link} role="presentation" onClick={setShow}>
				{t('documents:documents_upload_button_label')}
			</div>
		);
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<Input
					placeholder={t('documents:filter_placeholder_3')}
					onChange={(e) => {
						setDocumentDetails((prev) => ({
							...prev,
							name: e,
						}));
					}}
				/>
			</div>
			<div className={styles.select_container}>
				<Select
					placeholder={t('documents:filter_placeholder_4')}
					options={OPTIONS}
					onChange={(val) => setDocumentDetails((prev) => ({
						...prev,
						document_type: val,
					}))}
					value={documentDetails?.document_type}
				/>
			</div>
			<div className={styles.upload_container}>
				<Input
					placeholder={t('documents:filter_placeholder_5')}
					prefix={<IcMCloudUpload height={18} width={18} />}
					suffix={<UploadLink />}
					value={fileName}
					disabled={!isEmpty(image_url)}
				/>
			</div>
			<div>
				<Button
					themeType="accent"
					onClick={addDocument}
					loading={loading}
					disabled={loading}
					className={styles.button}
				>
					{t('documents:documents_upload_button_label_2')}
				</Button>
			</div>
		</div>
	);
}

export default UploadDocument;
