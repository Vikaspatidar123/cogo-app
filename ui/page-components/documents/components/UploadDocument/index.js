import { Upload, Input } from '@cogoport/components';
import { useState } from 'react';

import styles from './styles.module.css';

function UploadDocument() {
	const [file, setFile] = useState();
	console.log('🚀 ~ file: index.js:8 ~ UploadDocument ~ file:', file);
	return (
		<div>
			<div className={styles.container}>
				<Input placeholder="Document Name" />
			</div>
			<div className={styles.container}>
				<Input placeholder="Document Type" />
			</div>
			<div>
				<Upload value={file} onChange={setFile} accept=".png,.pkg,.jpg" />
			</div>
		</div>
	);
}

export default UploadDocument;
