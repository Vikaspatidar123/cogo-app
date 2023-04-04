/* eslint-disable react-hooks/exhaustive-deps */
import { Toast } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useEffect, useState } from 'react';

import useCompleteOrder from '../../hooks/useCompleteOrder';
import useCreateBillingAddres from '../../hooks/useCreateBillingAddress';
import useCreateCheckout from '../../hooks/useCreateCheckout';
import useFetchBillingAddress from '../../hooks/useFetchBillingddress';
import useGetPlanDetails from '../../hooks/useGetPlanDetails';
import redirectUrl from '../../utils/redirectUrl';

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
	const { query } = useRouter();
	const { billingAddress } = useFetchBillingAddress({ profile });
	const [checked, setChecked] = useState([]);
	const { getPlan, planDataLoading } = useGetPlanDetails({ profile });
	const { redirectManageSubscription } = redirectUrl();
	const { createSellerAddres, createAddressLoading } = useCreateBillingAddres({
		profile,
	});
	const { completeOrder, completeOrderLoading } = useCompleteOrder({
		checked,
		profile,
		checkoutResponse,
		datePickerValue,
	});
	const { createCheckout, checkoutLoading } = useCreateCheckout();

	useEffect(() => {
		(async () => {
			await getPlan({
				setPlan,
				query,
				createCheckout,
				setCheckoutResponse,
			});
		})();
	}, []);

	useEffect(() => {
		if (checkoutResponse?.errors) {
			Toast.error('Something went wrong. Please try again after sometime');
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
							setAddresses={setAddresses}
							addresses={addresses}
							checked={checked}
							setChecked={setChecked}
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
		</div>
	);
}
export default Checkout;
