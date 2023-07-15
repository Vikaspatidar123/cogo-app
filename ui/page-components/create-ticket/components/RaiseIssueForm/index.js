import useGetAsyncOptions from '../../hooks/useGetAsyncOptions';

import styles from './styles.module.css';

import { SelectController, AsyncSelectController } from '@/packages/forms';
import FileUploader from '@/packages/forms/Business/FileUploader';
import TextAreaController from '@/packages/forms/Controlled/TextAreaController';

function RaiseIssueForm({
	controls = [],
	errors = {},
	control,
	showList = false,
	isTicketNotUtlilized = false,

}) {
	const { loadOptions, defaultOptions } = useGetAsyncOptions({
		isTicketNotUtlilized,
	});

	return (
		<div
			className={`${styles.container} 
            ${showList ? styles.container_show_list : ''}`}
		>
			<div className={styles.row}>
				<div className={styles.col}>
					<div className={styles.label}>Select Issue Type</div>
					<AsyncSelectController
						{...controls[0]}
						asyncKey="issue_type"
						// getModifiedOptions={loadOptions}
						// defaultOptions={defaultOptions}
						control={control}
					/>
					{errors?.issue_type && <div className={styles.error}>Issue type is required</div>}
				</div>
				<div className={styles.col}>
					<div className={styles.label}>Describe Issue</div>
					<TextAreaController {...controls[1]} control={control} />
				</div>
				<div className={styles.col}>
					<div className={styles.label}>Notification Preferrences</div>
					<SelectController {...controls[2]} control={control} />
				</div>
				<div className={styles.col}>
					<div className={styles.label}>Upload Any Supporting Documents</div>
					<FileUploader {...controls[3]} control={control} multiple type="card" />
				</div>
			</div>
		</div>
	);
}

export default RaiseIssueForm;
