import { isEmpty } from '@cogoport/utils';
import { useEffect, useState } from 'react';

import useGetAlertInfo from '../../../../../hooks/useGetAlertInfo';

import AddAlert from './AddAlert';
import SelectContact from './SelectContact';
import styles from './styles.module.css';

function CustomizeAlert({ closeHandler, shipmentId }) {
	const [step, setStep] = useState('select_contact');
	const [selectContactList, setSelectContactList] = useState([]);
	const {
		loading, data = [], alertList = [], alertListLoading,
	} = useGetAlertInfo({ shipmentId, step });

	useEffect(() => {
		if (!isEmpty(data)) {
			setStep('add_alert');
		}
	}, [data]);

	const nextStepHandler = () => setStep('add_alert');
	const prevStepHandler = () => setStep('select_contact');

	return (
		<div className={styles.container}>
			{step === 'select_contact' && (
				<SelectContact
					closeHandler={closeHandler}
					nextStepHandler={nextStepHandler}
					setSelectContactList={setSelectContactList}
				/>
			)}

			{step === 'add_alert' && (
				<AddAlert
					prevStepHandler={prevStepHandler}
					selectContactList={selectContactList}
					prevAlertData={data}
					alertList={alertList}
					alertListLoading={alertListLoading}
					shipmentId={shipmentId}
				/>
			)}
		</div>
	);
}

export default CustomizeAlert;
