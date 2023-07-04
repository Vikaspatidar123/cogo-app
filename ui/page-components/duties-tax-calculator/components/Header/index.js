import { useTranslation } from 'next-i18next';

import { DutiesTax } from '../../configuration/icon-configuration';

import Stepper from './Stepper';
import styles from './styles.module.css';

function Header({
	stepper,
	tradeEngineRespLength,
	setStepper,
	billId = '',
}) {
	const { t } = useTranslation(['dutiesTaxesCalculator']);
	return (
		<div className={styles.container}>
			<div className={styles.title}>
				<img src={DutiesTax} alt="" width="32px" height="32px" />
				<div>{t('dutiesTaxesCalculator:main_title')}</div>
			</div>
			<Stepper
				stepper={stepper}
				setStepper={setStepper}
				tradeEngineRespLength={tradeEngineRespLength}
				billId={billId}
			/>
		</div>
	);
}

export default Header;
