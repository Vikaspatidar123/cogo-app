import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

import { Image } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

function Loader() {
	const { t } = useTranslation(['dutiesTaxesCalculator']);
	return (
		<div className={styles.loader_container}>
			<Image
				src={GLOBAL_CONSTANTS.image_url.loading}
				alt={t('dutiesTaxesCalculator:alt_loader')}
				className={styles.cogoloader}
				width={100}
				height={100}
			/>
			<div className={styles.modal} />
		</div>
	);
}

export default Loader;
