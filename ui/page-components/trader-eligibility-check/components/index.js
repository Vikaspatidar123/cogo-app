import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import { HeadingIcon } from '../configuration/icon-configuration';
import useFetchQuotaDetails from '../hooks/useFetchQuotaDetails';
import useSaveDraft from '../hooks/useSaveDraft';

import Content from './Content';
import styles from './styles.module.css';

import PaymentModal from '@/ui/commons/components/PaymentInitiation/component/PaymentModal';

function TraderEligibilty() {
	const { t } = useTranslation(['traderEligibilityCheck']);
	console.log('🚀 ~ file: index.js:15 ~ TraderEligibilty ~ t:', t);
	const [formDetails, setFormDetails] = useState({});
	const [countryDetails, setCountryDetails] = useState();
	const {
		fetchQuotaDetails = {},
		quotaLoading = false,
		modal = false,
		serviceRates = {},
		serviceRatesLoading = false,
		setModal,
		quotaDetails,
	} = useFetchQuotaDetails();

	const { createDraft, loading, draftId, paymentData, paymentModal, setPaymentModal } = useSaveDraft();

	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<div className={styles.heading}>
					<img src={HeadingIcon} alt="" className={styles.svg_style} />
					{t('traderEligibilityCheck:trader_eligibility_check_title')}
				</div>
			</div>
			<div className={styles.content_wrapper}>
				<Content
					quotaLoading={quotaLoading}
					setFormDetails={setFormDetails}
					fetchQuotaDetails={fetchQuotaDetails}
					serviceRatesLoading={serviceRatesLoading}
					quotaDetails={quotaDetails}
					modal={modal}
					createDraft={createDraft}
					loading={loading}
					formDetails={formDetails}
					serviceRates={serviceRates}
					setModal={setModal}
					draftId={draftId}
					setCountryDetails={setCountryDetails}
					countryDetails={countryDetails}
				/>
			</div>
			<PaymentModal
				modal={paymentModal}
				setModal={setPaymentModal}
				paymentData={paymentData}
			/>
		</div>
	);
}

export default TraderEligibilty;
