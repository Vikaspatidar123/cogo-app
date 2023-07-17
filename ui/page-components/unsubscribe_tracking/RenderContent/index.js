import { Button } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

function RenderContent({ status, onConfirm }) {
	const { t } = useTranslation(['unSubscribeTracking']);
	if (status === null) {
		return null;
	}
	return (
		<div>
			{
				status ? (
					<div className={styles.box}>
						<h3 className={styles.h3}>{t('unSubscribeTracking:unsubscribe_text_1')}</h3>
						<Button className={styles.button} type="button" onClick={onConfirm}>
							{t('unSubscribeTracking:unsubscribe_text_2')}
						</Button>
					</div>
				) : <h3 className={styles.h3}>{t('unSubscribeTracking:unsubscribe_text_3')}</h3>

			}
		</div>
	);
}
export default RenderContent;
