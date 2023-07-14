import { IcMArrowRotateRight } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';

import AirlineContent from './AirlineContent';
import styles from './styles.module.css';

function CarrierFilter({ handleCheckList, handleNav, isOpen, carrierList }) {
	const { t } = useTranslation(['oceanSchedule']);

	return (
		<>
			<div className={styles.header} role="presentation" onClick={() => handleNav('airline')}>
				<div className={styles.nav_heading}>
					{t('oceanSchedule:carrier_text')}
				</div>
				<div className={styles.column}>
					<IcMArrowRotateRight
						height="8px"
						width="14px"
						fill="#000"
						className={isOpen.includes('airline') ? styles.open : ''}
					/>
				</div>
			</div>
			{isOpen.includes('airline') && (
				<AirlineContent
					events={handleCheckList}
					list={carrierList}
					value="carrier"
				/>
			)}
			<div className={styles.line} />
		</>
	);
}
export default CarrierFilter;
