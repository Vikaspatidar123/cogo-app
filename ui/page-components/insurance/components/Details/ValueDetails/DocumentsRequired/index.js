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
		.map((item) => {
			const renderingField = fields.find((ele) => ele.name === item.name);
			return (
				<div className={styles.docs_container}>
					<div className={styles.docs}>
						<div className={styles.column}>{renderingField.placeholder}</div>
						<FileUploader
							{...renderingField}
							multiple={false}
							control={control}
							showProgress
							draggable
							onChange={(val) => {
								setUploadedFiles((prev) => ({
									...prev,
									[renderingField.name]: val,
								}));
							}}
						/>
					</div>
					{errors[renderingField.name]?.type === 'required' ? (
						<div className={styles.error_message}>
							{errors[renderingField.name]?.message}
						</div>
					) : null}
				</div>
			);
		});
}

export default DocumentsRequired;
