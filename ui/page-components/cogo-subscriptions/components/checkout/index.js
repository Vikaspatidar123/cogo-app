import { Toast, cl } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useTranslation } from 'next-i18next';
import { useCallback, useEffect, useState } from 'react';

import CheckoutModal from '../../common/CheckoutModal';
import CheckoutPageLoader from '../../common/CheckoutPageLoader';
import useCompleteOrder from '../../hooks/useCompleteOrder';
import useCreateBillingAddres from '../../hooks/useCreateBillingAddress';
import useCreateCheckout from '../../hooks/useCreateCheckout';
import useFetchBillingAddress from '../../hooks/useFetchBillingddress';
import useGetPlanDetails from '../../hooks/useGetPlanDetails';
import redirectUrl from '../../utils/redirectUrl';
import StripePaymentModal from '../balance-history/component/Usage/StripePaymentModal';

import BillingDetails from './BillingDetails';
import BottomContainer from './BottomContainer';
import Charges from './Charges';
import styles from './styles.module.css';
import SubscriptionDetails from './subscriptionDetails';

import { useRouter } from '@/packages/next';
import { useSelector } from '@/packages/store';

function Checkout() {
	const { query } = useRouter();

	const { t } = useTranslation(['subscriptions']);

	const { profile } = useSelector((s) => s);

	const [plan, setPlan] = useState({});
	const [datePickerValue, setDatePickerValue] = useState(new Date());
	const [addresses, setAddresses] = useState([]);
	const [checkoutResponse, setCheckoutResponse] = useState({});
	const [addressWithoutGst, setAddressWithoutGst] = useState([]);
	const [isBillingAddress, setisBillingAddress] = useState('');
	const [stripePromiseSet, setstripePromiseSet] = useState({});
	const [checked, setChecked] = useState([]);

	const { billingAddress, addressApi } = useFetchBillingAddress({
		profile,
		setAddressWithoutGst,
	});
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
				t('checkout_error_message:checkout_text'),
			);
		}
	}, [checkoutResponse, t]);

	return (
		<div className={styles.container}>

			<div className={styles.label}>
				<IcMArrowBack onClick={() => redirectManageSubscription()} />
				{t('subscriptions:checkout_text')}
			</div>

			{(planDataLoading || checkoutLoading) ? (
				<CheckoutPageLoader />
			) : (
				<div>
					<div className={styles.padded_row}>
						<div className={cl`${styles.wrapper} ${styles.wd_28}`}>
							<SubscriptionDetails plans={plan} query={query} />
						</div>
						<div className={cl`${styles.wrapper} ${styles.wd_39}`}>
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
						<div className={cl`${styles.wrapper} ${styles.wd_29}`}>
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
					{checkoutResponse?.order_type === 'recurring' ? <BottomContainer /> : null}
				</div>

			)}
			{checkoutModal ? (
				<CheckoutModal
					checkoutModal={checkoutModal}
					responseForCheckout={responseForCheckout}
					checkoutResponse={checkoutResponse}
					setCheckoutModal={setCheckoutModal}
				/>
			) : null}
			{(stripeModal && !isEmpty(stripePromiseSet)) ? (
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
			) : null}
		</div>
	);
}
export default Checkout;
