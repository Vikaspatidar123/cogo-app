import { IcMArrowBack } from '@cogoport/icons-react';

import { LoadingIcon } from '../../configuration/icon-configuration';

import Details from './Details';
import styles from './styles.module.css';

function CheckoutPage({
	quotaDetails = {},
	createDraft = () => {},
	loading = false,
	formDetails = {},
	serviceRates = {},
	setModal = () => {},
	serviceRatesLoading = false,
}) {
	const Length = Object.keys(serviceRates)?.length;
	return (
		<div className={styles.wrapper}>
			<div role="presentation" className={styles.heading} onClick={() => setModal(false)}>
				<div className={styles.back_buttton}>
					<IcMArrowBack />
				</div>
				Checkout
			</div>
			{!serviceRatesLoading && Length >= 0 && (
				<Details
					quotaDetails={quotaDetails}
					createDraft={createDraft}
					loading={loading}
					formDetails={formDetails}
					serviceRates={serviceRates}
				/>
			)}
			{serviceRatesLoading && (
				<img src={LoadingIcon} alt="" className={styles.checkout_loading} />
			)}
		</div>
	);
}

export default CheckoutPage;
