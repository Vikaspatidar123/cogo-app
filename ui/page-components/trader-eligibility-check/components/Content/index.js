import { cl } from '@cogoport/components';

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
