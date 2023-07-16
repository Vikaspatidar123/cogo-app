// import useGetAsyncOptions from '../../hooks/useGetAsyncOptions';

import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

import { SelectController, AsyncSelectController } from '@/packages/forms';
import FileUploader from '@/packages/forms/Business/FileUploader';
import TextAreaController from '@/packages/forms/Controlled/TextAreaController';

function RaiseIssueForm({
	controls = [],
	errors = {},
	control,
	showList = false,
	// isTicketNotUtlilized = false,

}) {
	const { t } = useTranslation(['createTicketPublic']);
	// const { loadOptions, defaultOptions } = useGetAsyncOptions({
	// 	isTicketNotUtlilized,
	// });

	return (
		<div
			className={`${styles.container} 
            ${showList ? styles.container_show_list : ''}`}
		>
			<div className={styles.row}>
				<div className={styles.col}>
					<div className={styles.label}>{t('createTicketPublic:raise_issue_label_1')}</div>
					<AsyncSelectController
						{...controls[0]}
						asyncKey="issue_type"
						// getModifiedOptions={loadOptions}
						// defaultOptions={defaultOptions}
						control={control}
					/>
					{errors?.issue_type
					&& <div className={styles.error}>{t('createTicketPublic:raise_issue_error')}</div>}
				</div>
				<div className={styles.col}>
					<div className={styles.label}>{t('createTicketPublic:raise_issue_label_2')}</div>
					<TextAreaController {...controls[1]} control={control} />
				</div>
				<div className={styles.col}>
					<div className={styles.label}>{t('createTicketPublic:raise_issue_label_3')}</div>
					<SelectController {...controls[2]} control={control} />
				</div>
				<div className={styles.col}>
					<div className={styles.label}>{t('createTicketPublic:raise_issue_label_4')}</div>
					<FileUploader {...controls[3]} control={control} multiple type="card" />
				</div>
			</div>
		</div>
	);
}

export default RaiseIssueForm;
