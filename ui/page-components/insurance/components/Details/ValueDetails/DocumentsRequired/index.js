import styles from './styles.module.css';

import FileUploader from '@/packages/forms/Business/FileUploader';

function DocumentsRequired({
	control = {},
	fields = [],
	errors = {},
	setUploadedFiles = () => {},
}) {
	return (
		<div className={styles.upload_and_file_name}>
			{(fields || []).map((item, index) => {
				if (index > 3) {
					return (
						<div className={styles.docs_container} key={item.name}>
							<div className={styles.docs}>
								<div className={styles.column}>{item.placeholder}</div>
								<div className={styles.file}>
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
							</div>
							{errors[item.name]?.type === 'required' ? (
								<div className={styles.error_message}>
									{errors[item.name]?.message}
								</div>
							) : null}
						</div>
					);
				}
				return null;
			})}
		</div>
	);
}

export default DocumentsRequired;
