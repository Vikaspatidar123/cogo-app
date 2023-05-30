import { Input, Select, Button, FileSelect } from '@cogoport/components';
import { useState } from 'react';

import { options } from '../../constants/documentTypeOptions';

import styles from './styles.module.css';

function UploadDocument() {
	const [file, setFile] = useState();

	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<Input placeholder="Document Name" />
			</div>
			<div className={styles.select_container}>
				<Select placeholder="Document Type" options={options} />
			</div>
			<div className={styles.upload_container}>
				<FileSelect value={file} onChange={setFile} accept=".pdf,.png,.pkg,.jpg" uploadIcon={null} />
			</div>
			<div className={styles.container}>
				<Button themeType="accent">Save</Button>
			</div>
		</div>
	);
}

export default UploadDocument;
