import { IcMArrowRotateRight } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';

import DateDepartureHandler from './DateHandler';
import styles from './styles.module.css';

function DepartureFilter({
	handleNav,
	isOpen,
	departureDate,
	setDepartureDate,
}) {
	const { t } = useTranslation(['airSchedule']);

	return (
		<>
			<div className={styles.header} role="presentation" onClick={() => handleNav('departure')}>
				<div className={styles.nav_heading}>
					{t('airSchedule:departure_text')}
				</div>
				<div className={styles.column}>
					<IcMArrowRotateRight
						height="8px"
						width="14px"
						fill="#000"
						className={isOpen.includes('departure') ? styles.open : ''}
					/>
				</div>
			</div>
			{isOpen.includes('departure') && (
				<div className={styles.date_container}>
					<DateDepartureHandler
						departureDate={departureDate}
						setDepartureDate={setDepartureDate}
					/>
				</div>
			)}
			<div className={styles.line} />
		</>
	);
}

export default DepartureFilter;
