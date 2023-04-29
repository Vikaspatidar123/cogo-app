import { useEffect, useState } from 'react';

import useGetQuota from '../../hooks/useGetQuota';
import useGetServiceRates from '../../hooks/useGetServiceRates';
import usePayment from '../../hooks/usePayment';
import checkoutFn from '../../utils/checkoutFn';

import Info from './Info';
import styles from './styles.module.css';
import Summary from './Summary';

import { useRouter } from '@/packages/next';

function Checkout() {
	const { query } = useRouter();
	const [localStorageData, setLocalStorageData] = useState({});
	const { trade_engine_id } = query || {};

	const { isQuotaLeft = false, quotaValue, prioritySequence } = useGetQuota();
	const { serviceRatesLoading, serviceRateData } = useGetServiceRates(prioritySequence);
	const { initiatePayment, paymentLoading } = usePayment({
		hsCode: localStorageData?.hsCode,
	});

	const {
		prefillData = {},
		MAPPING,
		getPrice,
		paymentHandler,
	} = checkoutFn({ localStorageData, serviceRateData, initiatePayment });

	useEffect(() => {
		if (trade_engine_id) {
			console.log(trade_engine_id, 'trade_engine_id');
			const localStorageFormData = JSON.parse(localStorage.getItem('transportDetails'));
			console.log(localStorageFormData, 'localStorageFormData');
			if (localStorageFormData) {
				setLocalStorageData(localStorageFormData);
			}
		}
	}, [trade_engine_id]);

	return (
		<div className={styles.container}>
			<div className={styles.details}>
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
					loading={serviceRatesLoading || paymentLoading}
				/>
			</div>
		</div>
	);
}

export default Checkout;
