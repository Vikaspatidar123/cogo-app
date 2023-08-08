import { IcMArrowRotateRight } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';
import TransitDuration from './TransitDuration';

function TransitDurationFilter({ handleNav, isOpen, durationValue, onChange }) {
	const { t } = useTranslation(['oceanSchedule']);

	return (
		<>
			<div className={styles.header} role="presentation" onClick={() => handleNav('transit')}>
				<div className={styles.nav_heading}>
					{t('oceanSchedule:transit_duration_text')}
				</div>
				<div className={styles.column}>
					<IcMArrowRotateRight
						height="8px"
						width="14px"
						fill="#000"
						className={isOpen.includes('transit') ? styles.open : ''}
					/>
				</div>
			</div>
			{isOpen.includes('transit') && (
				<TransitDuration durationValue={durationValue} onChange={onChange} />
			)}
			<div className={styles.line} />
		</>
	);
}
export default TransitDurationFilter;
