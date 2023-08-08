import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

import { Image } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

function EmptyState() {
	const { t } = useTranslation(['orderHistory']);
	return (
		<div>
			<Image
				className={styles.empty_state}
				src={GLOBAL_CONSTANTS.image_url.empty_state}
				width={270}
				height={270}
				alt={t('orderHistory:empty_state_alt')}
			/>
		</div>
	);
}

export default EmptyState;
