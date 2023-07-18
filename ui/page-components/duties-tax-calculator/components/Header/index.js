import { useTranslation } from 'next-i18next';

import Stepper from './Stepper';
import styles from './styles.module.css';

import { Image } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

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
				<Image src={GLOBAL_CONSTANTS.image_url.duties_tax} alt="" width={32} height={32} />
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
