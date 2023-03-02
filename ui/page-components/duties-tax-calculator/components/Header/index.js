import { DutiesTax } from '../../configuration/icon-configuration';

import Stepper from './Stepper';
import styles from './styles.module.css';

function Header({
	stepper,
	tradeEngineRespLength,
	setStepper,
	billId = '',
}) {
	return (
		<div className={styles.container}>
			<div className={styles.title}>
				<img src={DutiesTax} alt="" width="32px" height="32px" />
				<div>Duties & Taxes Calculator</div>
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
