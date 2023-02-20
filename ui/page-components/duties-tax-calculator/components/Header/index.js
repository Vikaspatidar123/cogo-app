import { DutiesTax } from '../../configuration/icon-configuration';

import Stepper from './Stepper';
import styles from './styles.module.css';

function Header({
	stepper,
	tradeEngineRespLength,
	setStepper,
	billId = '',
	isMobile,
}) {
	return (
		<div className={styles.container}>
			<div className={styles.title}>
				{/* <div className={styles.icon}> */}
				<img src={DutiesTax} alt="" width="32px" height="32px" />
				{/* </div> */}
				<div>Duties & Taxes Calculator</div>
			</div>
			<Stepper
				stepper={stepper}
				setStepper={setStepper}
				tradeEngineRespLength={tradeEngineRespLength}
				billId={billId}
				isMobile={isMobile}
			/>
		</div>
	);
}

export default Header;
