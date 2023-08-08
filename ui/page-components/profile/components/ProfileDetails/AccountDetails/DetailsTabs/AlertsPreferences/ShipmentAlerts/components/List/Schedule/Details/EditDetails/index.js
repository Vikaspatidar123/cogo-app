import { useTranslation } from 'next-i18next';

import ReprtTypeSelectOptions from './ReprtTypeSelectOptions';
import SelectUserlist from './SelectUserlist';
import styles from './styles.module.css';
import TimeZoneSelectFilter from './TimeZoneSelectFilter';

function EditDetails(props) {
	const {
		data, hookSetter, isLoading, reportData, formHooks, setUserIds,
		type, userIds, setType,
	} = props || {};

	const { control, formState: { errors } } = formHooks || {};

	const { t } = useTranslation(['settings']);
	return (
		<div className={styles.conatiner}>
			<ReprtTypeSelectOptions control={control} onChange={setType} value={type} />
			{type !== 'never' ? (
				<div>
					<TimeZoneSelectFilter control={control} value={type} reportData={reportData} errors={errors} />
					<SelectUserlist
						data={data}
						hookSetter={hookSetter}
						isLoading={isLoading}
						setUserIds={setUserIds}
						userIds={userIds}
					/>
				</div>
			) : (
				<div className={styles.text}>{t('settings:never_text')}</div>
			)}
		</div>
	);
}
export default EditDetails;
