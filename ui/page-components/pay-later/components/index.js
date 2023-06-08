import { useState } from 'react';

// import useGetOrganizationCreditRequest from '../hooks/useGetOrganizationCreditRequest';

import Form from './Form';
import Stepper from './Stepper';
import styles from './styles.module.css';

function PayLater() {
	const [active, setActive] = useState('basic_details');

	// const { data } = useGetOrganizationCreditRequest();

	return (
		<div className={styles.wrapper}>
			<Stepper active={active} setActive={setActive} />
			<Form active={active} />
		</div>
	);
}
export default PayLater;
