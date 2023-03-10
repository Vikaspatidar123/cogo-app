import styles from './styles.modules.css';
// import FileUploaderController from '@/packages/forms/Business/FileUploader';

function DocumentsRequired({
	// control = {},
	fields = [], errors = {},
}) {
	return fields
		.filter((items, index) => index > 3)
		.map((item, index) => (
			<div className={styles.doc_container}>
				<div className={styles.docs}>
					<div className={styles.column}>{fields[index].placeholder}</div>
					{/* <FileUploaderController multiple={false} /> */}
				</div>
				{errors[fields[index].name]?.type === 'required' ? (
					<div className={styles.error_message}>
						{errors[fields[index].name]?.message}
					</div>
				) : null}
			</div>
		));
}

export default DocumentsRequired;
