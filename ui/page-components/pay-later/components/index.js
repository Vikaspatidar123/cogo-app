import { Loader } from '@cogoport/components';
import { useEffect, useState } from 'react';

import useGetOrganizationCreditRequest from '../hooks/useGetOrganizationCreditRequest';

import Form from './Form';
import Stepper from './Stepper';
import styles from './styles.module.css';

function PayLater() {
	const { data:getCreditRequestResponse, loading = false } = useGetOrganizationCreditRequest();

	const { status = '' } = getCreditRequestResponse || {};

	const [active, setActive] = useState();

	useEffect(() => {
		setActive(status);
	}, [status]);
	if (loading) {
		return <Loader />;
	}
	return (
		<div className={styles.wrapper}>
			<Stepper active={active} setActive={setActive} />
			<Form active={active} getCreditRequestResponse={getCreditRequestResponse} />
		</div>
	);
}
export default PayLater;
