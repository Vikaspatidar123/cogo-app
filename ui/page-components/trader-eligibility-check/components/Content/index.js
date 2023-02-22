import CheckoutPage from '../CheckoutPage';
import TraderDetails from '../TraderDetails';

// import {
// 	Wrapper, Column, MapColumn, CheckoutColumn, MapColumn2,
// } from './styles';

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
	isMobile = false,
}) {
	return (
		<>
			{isMobile && (
				<div className={styles.map_column2}>
					<Map isMobile={isMobile} />
				</div>
			)}
			<div className={`${isMobile ? styles.wrapper_with_mobile : styles.wrapper}`}>
				{!modal && (
					<div className={styles.column}>
						<TraderDetails
							quotaLoading={quotaLoading}
							setFormDetails={setFormDetails}
							fetchQuotaDetails={fetchQuotaDetails}
							serviceRatesLoading={serviceRatesLoading}
							draftId={draftId}
							formDetails={formDetails}
							setCountryDetails={setCountryDetails}
							countryDetails={countryDetails}
							isMobile={isMobile}
						/>
					</div>
				)}
				{modal && (
					<div className={styles.checkout_column}>
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
				{!isMobile && (
					<div className={styles.map_column}>
						<Map isMobile={isMobile} />
					</div>
				)}
			</div>
		</>
	);
}

export default Content;
