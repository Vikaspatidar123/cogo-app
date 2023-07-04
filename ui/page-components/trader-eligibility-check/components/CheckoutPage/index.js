import { IcMArrowBack } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import { LoadingIcon } from '../../configuration/icon-configuration';

import Details from './Details';
import styles from './styles.module.css';

import SelectAddressComponent from '@/ui/commons/components/CreateOrganizationModel/Components/SelectAddressComponent';

function CheckoutPage({
	quotaDetails = {},
	createDraft = () => {},
	loading = false,
	formDetails = {},
	serviceRates = {},
	setModal = () => {},
	payment = {},
	serviceRatesLoading = false,
	quotaAvailableStats = {},
}) {
	const { t } = useTranslation(['traderEligibilityCheck']);
	const [address, setAddress] = useState();
	const { directPayment = false } = payment || {};
	const Length = Object.keys(serviceRates)?.length;
	return (
		<div className={styles.wrapper}>
			<div
				role="presentation"
				className={styles.heading}
				onClick={() => setModal(false)}
			>
				<div className={styles.back_buttton}>
					<IcMArrowBack />
				</div>
				{t('traderEligibilityCheck:tec_checkout_page_title')}
			</div>
			{directPayment && (
				<SelectAddressComponent
					setAddress={setAddress}
					address={address}
				/>
			)}
			{!serviceRatesLoading && Length >= 0 && (
				<Details
					quotaDetails={quotaDetails}
					createDraft={createDraft}
					loading={loading}
					formDetails={formDetails}
					serviceRates={serviceRates}
					quotaAvailableStats={quotaAvailableStats}
					payment={payment}
					address={address}
					setAddress={setAddress}
				/>
			)}
			{serviceRatesLoading && (
				<img
					src={LoadingIcon}
					alt=""
					className={styles.checkout_loading}
				/>
			)}
		</div>
	);
}

export default CheckoutPage;
