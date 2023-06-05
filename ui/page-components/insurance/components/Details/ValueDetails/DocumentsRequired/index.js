import styles from './styles.module.css';

import FileUploader from '@/packages/forms/Business/FileUploader';

function DocumentsRequired({
	control = {},
	fields = [],
	errors = {},
	setUploadedFiles = () => {},
}) {
	return (fields || []
	).filter((items, index) => index > 3)
		.map((item) => (
			<div className={styles.docs_container}>
				<div className={styles.docs}>
					<div className={styles.column}>{item.placeholder}</div>
					<FileUploader
						{...item}
						multiple={false}
						control={control}
						showProgress
						draggable
						onChange={(val) => {
							setUploadedFiles((prev) => ({
								...prev,
								[item.name]: val,
							}));
						}}
					/>
				</div>
				{errors[item.name]?.type === 'required' ? (
					<div className={styles.error_message}>
						{errors[item.name]?.message}
					</div>
				) : null}
			</div>
		));
}

export default DocumentsRequired;
