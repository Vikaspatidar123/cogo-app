import { cl } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

import { Image } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

function EmptyState({ containerHeight = '' }) {
	const { t } = useTranslation(['createTicketPublic']);
	return (
		<div className={styles.empty_card}>
			<div className={styles.container}>
				<div className={cl`${styles.wrapper} ${containerHeight ? styles.wrapper_height : ''}`}>
					<Image
						src={GLOBAL_CONSTANTS.image_url.create_ticket_empty_state}
						alt={t('createTicketPublic:empty_state')}
						height={360}
						width={360}
					/>
					<div className={styles.content}>{t('createTicketPublic:empty_state')}</div>
				</div>
			</div>
		</div>
	);
}

export default EmptyState;
