import { useEffect, useState } from 'react';

import Header from '../../common/Header';
import useCheckout from '../../hooks/useCheckout';

import Info from './Info';
import styles from './styles.module.css';
import Summary from './Summary';

import { useRouter } from '@/packages/next';
import PaymentModal from '@/ui/commons/components/PaymentInitiation/component/PaymentModal';

function Checkout() {
	const { query } = useRouter();
	const { trade_engine_id = '' } = query || {};

	const [localStorageData, setLocalStorageData] = useState({});
	const [address, setAddress] = useState({});

	const {
		prefillData = {},
		MAPPING,
		getPrice,
		paymentHandler,
		isQuotaLeft = false,
		quotaValue = 0,
		loading = false,
		modal,
		setModal,
		data = {},
	} = useCheckout({
		localStorageData,
		address,
	});

	useEffect(() => {
		if (trade_engine_id) {
			const localStorageFormData = JSON.parse(localStorage.getItem('formInfo'));
			if (localStorageFormData) {
				setLocalStorageData(localStorageFormData);
			}
		}
	}, [trade_engine_id]);

	return (
		<div className={styles.container}>
			<div className={styles.details}>
				<Header title="Control Details" back />
				<Info
					prefillData={prefillData}
					MAPPING={MAPPING}
					localStorageData={localStorageData}
				/>
			</div>
			<div className={styles.summary}>
				<Summary
					quotaValue={quotaValue}
					tradeEngineId={trade_engine_id}
					isQuotaLeft={isQuotaLeft}
					getPrice={getPrice}
					paymentHandler={paymentHandler}
					loading={loading}
					setAddress={setAddress}
					address={address}
				/>
			</div>
			{modal && (
				<PaymentModal paymentData={data} modal={modal} setModal={setModal} />
			)}
		</div>
	);
}

export default Checkout;
