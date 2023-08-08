import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import { forwardRef } from 'react';

import styles from './styles.module.css';

export const SCROLL_VALUE = 220;

function Body({ values, header, index }, ref) {
	const { current } = ref;
	current.body[index] = {};
	const { t } = useTranslation(['settings']);

	if (isEmpty(values)) {
		return <div className={styles.empty}>{t('settings:shipment_alerts_text_15')}</div>;
	}
	return (
		(values || []).map((item, i) => (
			<div className={styles.container} key={`${i + 1}`}>
				<div className={styles.icon_check} />
				<div
					className={styles.list}
					ref={(r) => {
						current.body[index][i] = r;
					}}
				>
					{(header || []).map((value) => (
						<div className={styles.text} key={value}>
							{item[value]}
						</div>
					))}

				</div>
				<div className={styles.icon} />
			</div>
		))
	);
}
export default forwardRef(Body);
