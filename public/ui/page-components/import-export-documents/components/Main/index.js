import { useTranslation } from 'next-i18next';

import useGetQuota from '../../hooks/useGetQuota';
import iconUrl from '../../utils/iconUrl.json';

import Details from './Details';
import styles from './styles.module.css';

function Main() {
	const { t } = useTranslation(['importExportDoc']);
	const { isUserSubscribed = false, isQuotaLeft = false } = useGetQuota();

	return (
		<div className={styles.container}>
			<div className={styles.title}>
				<img src={iconUrl.logo} alt={t('importExportDoc:logo')} />
				<h2>{t('importExportDoc:main_title')}</h2>
			</div>
			<Details isUserSubscribed={isUserSubscribed} isQuotaLeft={isQuotaLeft} />
		</div>
	);
}
export default Main;
