import { useTranslation } from 'next-i18next';
import React from 'react';

import styles from './styles.module.css';

function OrSeparator() {
	const { t } = useTranslation(['common']);
	return <div className={styles.container}>{t('common:rightPanel_verification_OR_text')}</div>;
}

export default OrSeparator;
