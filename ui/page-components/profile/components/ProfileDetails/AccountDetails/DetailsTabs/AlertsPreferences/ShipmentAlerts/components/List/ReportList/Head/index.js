import { Button } from '@cogoport/components';
import { IcMDownload } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

function Head(props) {
	const { isEdit } = props || {};
	const { t } = useTranslation(['settings']);

	return (
		<div className={styles.container}>
			<div className={styles.text}>{t('settings:shipment_alerts_text_10')}</div>
			{!isEdit ? (
				<Button type="button" themeType="linkUi">
					<IcMDownload />
					<span className={styles.button_text}>{t('settings:shipment_alerts_text_11')}</span>
				</Button>
			) : null}
		</div>
	);
}

export default Head;
