import { Toast } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useCallback, useEffect, useState } from 'react';

import CheckoutModal from '../../common/CheckoutModal';
import useCompleteOrder from '../../hooks/useCompleteOrder';
import useCreateBillingAddres from '../../hooks/useCreateBillingAddress';
import useCreateCheckout from '../../hooks/useCreateCheckout';
import useFetchBillingAddress from '../../hooks/useFetchBillingddress';
import useGetPlanDetails from '../../hooks/useGetPlanDetails';
import redirectUrl from '../../utils/redirectUrl';
import StripePaymentModal from '../balance-history/component/Usage/StripePaymentModal';

import BillingDetails from './BillingDetails';
import Charges from './Charges';
import styles from './styles.module.css';
import SubscriptionDetails from './subscriptionDetails';

import { useRouter } from '@/packages/next';
import { useSelector } from '@/packages/store';

function Checkout() {
	const { profile } = useSelector((s) => s);
	const [plan, setPlan] = useState({});
	const [datePickerValue, setDatePickerValue] = useState();
	const [addresses, setAddresses] = useState();
	const [checkoutResponse, setCheckoutResponse] = useState();
	const [addressWithoutGst, setAddressWithoutGst] = useState();
	const [isBillingAddress, setisBillingAddress] = useState();
	const [stripePromiseSet, setstripePromiseSet] = useState();

	const { query } = useRouter();
	const { billingAddress, addressApi } = useFetchBillingAddress({
		profile,
		setAddressWithoutGst,
	});
	const [checked, setChecked] = useState([]);
	const { getPlan, planDataLoading } = useGetPlanDetails({ profile });
	const { redirectManageSubscription } = redirectUrl();
	const { createSellerAddres, createAddressLoading } = useCreateBillingAddres(
		{
			profile,
		},
	);
	const {
		completeOrder,
		completeOrderLoading,
		completeOrderResponse,
		stripeModal,
		setStripeModal,
		checkoutModal,
		responseForCheckout,
		setCheckoutModal,
	} = useCompleteOrder({
		checked,
		profile,
		checkoutResponse,
		datePickerValue,
		isBillingAddress,
	});
	const { createCheckout, checkoutLoading } = useCreateCheckout();

	let stripePromise;
	const { gateway_key = '' } = completeOrderResponse || {};
	const stripefunc = async () => {
		if (gateway_key) {
			stripePromise = await loadStripe(gateway_key);
			setstripePromiseSet(stripePromise);
		}
	};
	const apicall = useCallback(async () => {
		await getPlan({
			setPlan,
			query,
			createCheckout,
			setCheckoutResponse,
		});
	}, [createCheckout, getPlan, query]);

	useEffect(() => {
		stripefunc();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [gateway_key]);

	useEffect(() => {
		apicall();
	}, [apicall]);

	useEffect(() => {
		if (checkoutResponse?.errors) {
			Toast.error(
				'Something went wrong. Please try again after sometime',
			);
		}
	}, [checkoutResponse]);

	return (
		<div className={styles.container}>
			<div className={styles.label}>
				<IcMArrowBack onClick={() => redirectManageSubscription()} />
				Checkout
			</div>
			{(planDataLoading || checkoutLoading) && (
				<img
					src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/loading.svg"
					className={styles.loading}
					alt="loading-svg"
				/>
			)}
			{!planDataLoading && !checkoutLoading && (
				<div className={styles.padded_row}>
					<div className={`${styles.wrapper} ${styles.wd_28}`}>
						<SubscriptionDetails plans={plan} query={query} />
					</div>
					<div className={`${styles.wrapper} ${styles.wd_39}`}>
						<BillingDetails
							createSellerAddres={createSellerAddres}
							createAddressLoading={createAddressLoading}
							billingAddress={billingAddress}
							addressApi={addressApi}
							setAddresses={setAddresses}
							addresses={addresses}
							addressWithoutGst={addressWithoutGst}
							checked={checked}
							setChecked={setChecked}
							setisBillingAddress={setisBillingAddress}
						/>
					</div>
					<div className={`${styles.wrapper} ${styles.wd_29}`}>
						<Charges
							plans={plan}
							query={query}
							completeOrder={completeOrder}
							completeOrderLoading={completeOrderLoading}
							checked={checked}
							checkoutResponse={checkoutResponse}
							datePickerValue={datePickerValue}
							setDatePickerValue={setDatePickerValue}
						/>
					</div>
				</div>
			)}
			{checkoutModal && (
				<CheckoutModal
					checkoutModal={checkoutModal}
					responseForCheckout={responseForCheckout}
					checkoutResponse={checkoutResponse}
					setCheckoutModal={setCheckoutModal}
				/>
			)}
			{stripeModal && !isEmpty(stripePromiseSet) && (
				<Elements stripe={stripePromiseSet}>
					<StripePaymentModal
						flag={stripeModal}
						checkoutResponse={checkoutResponse}
						setStripeModal={setStripeModal}
						completeOrderResponse={completeOrderResponse}
						stripeObj={stripePromiseSet}
						query={query}
					/>
				</Elements>
			)}
		</div>
	);
}
export default Checkout;
