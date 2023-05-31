import { Input, Select, Button } from '@cogoport/components';
import { IcMCloudUpload } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import { options } from '../../constants/documentTypeOptions';

import styles from './styles.module.css';

function UploadDocument({
	setShow = () => {},
	documentDetails = {},
	addDocument = () => {},
	loading = false,
	setDocumentDetails = () => {},
}) {
	const { image_url = '' } = documentDetails || {};

	const fileName = image_url?.split('/')?.slice(-1)?.join('');

	function UploadLink() {
		return <div className={styles.upload_link} role="presentation" onClick={setShow}>Upload</div>;
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<Input
					placeholder="Document Name"
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
					placeholder="Document Type"
					options={options}
					onChange={(val) => setDocumentDetails((prev) => ({
						...prev,
						document_type: val,
					}))}
					value={documentDetails?.document_type}
				/>
			</div>
			<div className={styles.upload_container}>
				<Input
					placeholder="Drop file here, only pdf/doc..."
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
					Save
				</Button>
			</div>
		</div>
	);
}

export default UploadDocument;
