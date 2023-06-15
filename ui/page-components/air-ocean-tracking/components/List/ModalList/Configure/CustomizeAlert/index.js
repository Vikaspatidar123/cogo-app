import { isEmpty } from '@cogoport/utils';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import useGetAlertInfo from '../../../../../hooks/useGetAlertInfo';

import AddAlert from './AddAlert';
import SelectContact from './SelectContact';
import styles from './styles.module.css';

function CustomizeAlert({ closeHandler, shipmentId = '', activeTab = 'ocean' }) {
	const [step, setStep] = useState('select_contact');
	const [selectContactList, setSelectContactList] = useState([]);
	const {
		loading, data = [], alertList = [], alertListLoading,
	} = useGetAlertInfo({ shipmentId, step, activeTab });

	useEffect(() => {
		if (!isEmpty(data)) {
			setStep('add_alert');
		}
	}, [data]);

	const nextStepHandler = () => setStep('add_alert');
	const prevStepHandler = () => setStep('select_contact');

	return (
		<div className={styles.container}>
			{loading ? (
				<Image
					className={styles.loader}
					src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/loading.svg"
					alt="loading"
					width={100}
					height={100}
				/>
			) : (
				<>
					{step === 'select_contact' && (
						<SelectContact
							activeTab={activeTab}
							closeHandler={closeHandler}
							nextStepHandler={nextStepHandler}
							selectContactList={selectContactList}
							setSelectContactList={setSelectContactList}
						/>
					)}

					{step === 'add_alert' && (
						<AddAlert
							activeTab={activeTab}
							prevStepHandler={prevStepHandler}
							selectContactList={selectContactList}
							prevAlertData={data}
							alertList={alertList}
							alertListLoading={alertListLoading}
							shipmentId={shipmentId}
							closeHandler={closeHandler}
							setSelectContactList={setSelectContactList}

						/>
					)}
				</>
			)}
		</div>
	);
}

export default CustomizeAlert;
