import { Stepper as ArrowStepper } from '@cogoport/components';

import { STEPPER_OPTIONS } from '../../constants/steppers';

import styles from './styles.module.css';

function Stepper({ setActive = () => {}, active = '' }) {
	const activeStep = ['awaiting_user_inputs', 'payment_success'].includes(active) ? active : 'locked';

	return (
		<div className={styles.wrapper}>
			<ArrowStepper active={activeStep} setActive={setActive} items={STEPPER_OPTIONS} arrowed shadowed />
		</div>
	);
}

export default Stepper;
