import styles from './styles.modules.css';
// import FileUploaderController from '@/packages/forms/Business/FileUploader';

function DocumentsRequired({
	// control = {},
	fields = [], errors = {},
}) {
	return (fields || []
	).filter((items, index) => index > 3)
		.map((item) => {
			const renderingField = fields.find((ele) => ele.name === item.name);
			return (
				<div className={styles.doc_container}>
					<div className={styles.docs}>
						<div className={styles.column}>{renderingField.placeholder}</div>
						{/* <FileUploaderController multiple={false} /> */}
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
