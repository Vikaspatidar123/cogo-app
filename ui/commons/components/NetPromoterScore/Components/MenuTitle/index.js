import { IcCStar } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

function MenuTitle({ setShow = () => {} }) {
	const { t } = useTranslation(['common']);

	return (
		<div className={styles.container}>
			<IcCStar className={styles.icon} />
			<div
				className={styles.a_container}
				onClick={() => setShow(true)}
				role="presentation"
			>
				{t('common:rate_us_button_label')}
			</div>
		</div>
	);
}

export default MenuTitle;
