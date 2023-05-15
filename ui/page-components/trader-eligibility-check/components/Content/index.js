import { cl } from '@cogoport/components';
import { useEffect, useState } from 'react';

import { quotaAvailabilityfunction } from '../../utils';
import CheckoutPage from '../CheckoutPage';
import TraderDetails from '../TraderDetails';

import styles from './styles.module.css';

import { dynamic } from '@/packages/next';

const Map = dynamic(() => import('../Map'), { ssr: false });
function Content({
	quotaLoading = false,
	setFormDetails = () => {},
	fetchQuotaDetails = () => {},
	serviceRatesLoading = false,
	quotaDetails = {},
	modal = false,
	createDraft = () => {},
	loading = false,
	formDetails = {},
	serviceRates = {},
	setModal = {},
	draftId = '',
	setCountryDetails = () => {},
	countryDetails = {},
}) {
	const [quotaAvailableStats, setQuotaAvailableStats] = useState({});

	const [payment, setPayment] = useState({
		paymentThroughQuota : false,
		paymentThroughAddon : false,
		directPayment       : false,
		buySubscription     : false,
	});
	useEffect(() => {
		if (Object.keys(quotaDetails)?.length > 0) {
			quotaAvailabilityfunction({ setQuotaAvailableStats, quotaDetails, setPayment });
		}
	}, [quotaDetails]);
	return (
		<>

			<div className={styles.map_column2}>
				<Map />
			</div>
			<div className={cl`${styles.wrapper_with_mobile} ${styles.wrapper}`}>
				{!modal && (
					<div className={cl`${styles.column_with_mobile} ${styles.column}`}>
						<TraderDetails
							quotaLoading={quotaLoading}
							setFormDetails={setFormDetails}
							fetchQuotaDetails={fetchQuotaDetails}
							serviceRatesLoading={serviceRatesLoading}
							draftId={draftId}
							formDetails={formDetails}
							setCountryDetails={setCountryDetails}
							countryDetails={countryDetails}
							payment={payment}
						/>
					</div>
				)}
				{modal && (
					<div className={cl`${styles.checkout_column_mobile} ${styles.checkout_column}`}>
						<CheckoutPage
							quotaDetails={quotaDetails}
							createDraft={createDraft}
							loading={loading}
							formDetails={formDetails}
							serviceRates={serviceRates}
							setModal={setModal}
							serviceRatesLoading={serviceRatesLoading}
							payment={payment}
							quotaAvailableStats={quotaAvailableStats}

						/>
					</div>
				)}

				<div className={styles.map_column}>
					<Map />
				</div>
			</div>
		</>
	);
}

export default Content;
