import { IcMArrowDown } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

import { useTranslation } from '@/ui/components/LocaleTranslationContext';

function ViewMore({ callBack, isOpen }) {
	const { t } = useTranslation(['spot_search']);
	return (
		<div onClick={callBack} className={styles.down_btn} role="presentation">
			{isOpen ? t('view_more') : t('view_less')}
			<div className={styles.down_btn_icon}>
				<IcMArrowDown style={{ transform: isOpen ? 'rotate(0deg)' : 'rotate(180deg)' }} />
			</div>
		</div>
	);
}

export default ViewMore;
