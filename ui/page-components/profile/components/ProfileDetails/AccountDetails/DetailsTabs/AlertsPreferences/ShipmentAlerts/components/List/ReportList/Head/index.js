import { Button } from '@cogoport/components';
import { IcMDownload } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';

import useDownload from '../../../../hooks/useDownload';

import styles from './styles.module.css';

function Head(props) {
	const { isEdit } = props || {};
	const { t } = useTranslation(['settings']);
	const { refetch = () => {}, data } = useDownload();
	const onClick = async () => {
		await refetch();
		window.open(data.file_url);
	};
	return (
		<div className={styles.container}>
			<div className={styles.text}>{t('settings:shipment_alerts_text_10')}</div>
			{!isEdit ? (
				<Button type="button" themeType="linkUi" onClick={onClick}>
					<IcMDownload />
					<span className={styles.button_text}>{t('settings:shipment_alerts_text_11')}</span>
				</Button>
			) : null}
		</div>
	);
}

export default Head;
