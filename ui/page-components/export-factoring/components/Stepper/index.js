import { Stepper as ArrowStepper } from '@cogoport/components';

import { STEPPER_OPTIONS } from '../../constants/steppers';

import styles from './styles.module.css';

const CHECK = ['awaiting_user_inputs', 'awaiting_offer_letter', 'offer_letter_complete', 'payment_success'];
function Stepper({ setActive = () => { }, active = '' }) {
	const activeStep = CHECK.includes(active) ? active : 'locked';

	return (
		<div className={styles.wrapper}>
			<ArrowStepper active={activeStep} setActive={setActive} items={STEPPER_OPTIONS} arrowed shadowed />
		</div>
	);
}

export default Stepper;
