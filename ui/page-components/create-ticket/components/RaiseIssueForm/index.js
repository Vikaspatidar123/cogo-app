import { useTranslation } from 'next-i18next';

import useGetAsyncOptions from '../../hooks/useGetAsyncOptions';

import styles from './styles.module.css';

import { SelectController } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';

const OPTION_KEY = 'TicketType';

function RaiseIssueForm({
	controls = [],
	errors = {},
	control,
	showList = false,
	isTicketNotUtlilized = false,

}) {
	const { t } = useTranslation(['createTicketPublic']);
	const { defaultOptions, ...rest } = useGetAsyncOptions({
		isTicketNotUtlilized,
	});

	return (
		<div
			className={`${styles.container} 
            ${showList ? styles.container_show_list : ''}`}
		>
			<div className={styles.row}>
				<div className={styles.col}>
					<div className={styles.label}>{t('createTicketPublic:raise_issue_label_1')}</div>
					<SelectController
						{...controls[0]}
						{...rest}
						options={defaultOptions}
						labelKey={OPTION_KEY}
						valueKey={OPTION_KEY}
						control={control}
					/>
					{errors?.issue_type
					&& <div className={styles.error}>{t('createTicketPublic:raise_issue_error')}</div>}
				</div>
				{controls.map((config) => {
					const { type, label, name } = config;
					const Element = getField(type);

					if (name === 'issue_type') return null;
					return (
						<div key={name} className={styles.col}>
							<div className={styles.label}>{label}</div>
							<Element {...config} control={control} type="card" />
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default RaiseIssueForm;
