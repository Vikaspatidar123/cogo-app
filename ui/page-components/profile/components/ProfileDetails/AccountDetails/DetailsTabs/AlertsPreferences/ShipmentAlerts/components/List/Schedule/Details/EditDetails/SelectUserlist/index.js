import { Input } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';
import UserTable from './UserTable';

function SelectUserlist({ data, hookSetter, isLoading }) {
	const { setPageNumber, setQuery, query } = hookSetter || {};

	const { t } = useTranslation(['settings']);

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div>{t('settings:schedule_alerts_text_6')}</div>
				<Input
					name="search"
					style={{ width: '300px' }}
					placeholder={t('settings:schedule_alerts_text_7')}
					size="sm"
					suffix={<IcMSearchlight style={{ marginRight: '10px' }} />}
					onChange={setQuery}
					value={query}
				/>
			</div>
			<UserTable data={data} setPageNumber={setPageNumber} isLoading={isLoading} />
		</div>
	);
}
export default SelectUserlist;
