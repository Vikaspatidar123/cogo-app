/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Modal, Toast } from '@cogoport/components';
import { IcMPlus } from '@cogoport/icons-react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useState, useEffect } from 'react';

import LoadingBtn from '../../../../../asset/loading.svg';
import LegendInput from '../../../../../common/LegendInput';
import Slider from '../../../../../common/Slider';
import { AddonsTitleMapping } from '../../../../../common/UsageIcon';
import useCompleteOrder from '../../../../../hooks/useCompleteOrder';
import useCreateCheckout from '../../../../../hooks/useCreateCheckout';
import useGetPlanDetails from '../../../../../hooks/useGetPlanDetails';
import useVerifyRazor from '../../../../../hooks/useVerifyRazorPayStatus';
import { shortFormatNumber } from '../../../../../utils/getShortFormatNumber';
import PendingModal from '../PendingModal';
import StripePaymentModal from '../StripePaymentModal';

import styles from './styles.module.css';

import { useSelector } from '@/packages/store';

const WAIT_TIME = 3 * 1000;
const wait = (time) => new Promise((res) => {
	setTimeout(() => {
		res();
	}, time);
});

function AddonModal({
	addModal,
	setAddModal,
	addonDetails,
	pendingModal,
	setPendingModal,
}) {
	const [durationValue, setDurationValue] = useState(25);
	const [plan, setPlan] = useState({});
	const [checkoutResponse, setCheckoutResponse] = useState();
	const [completeOrderResponse, setCompleteOrderResponse] = useState();
	const [stripeModal, setStripeModal] = useState();
	const [apiTries, setApiTries] = useState(0);
	const [paymentStatus, setPaymentStatus] = useState(null);

	const { profile } = useSelector((s) => s);
	const {
		product_name = '',
		currency = 'INR',
		plan_price = '',
		plan_pricing_id = '',
		discount_percent = 0,
	} = addonDetails || {};

	const totalPrice = plan_price * durationValue;

	const { getPlan, planDataLoading } = useGetPlanDetails({ profile });

	const { createCheckout, checkoutLoading } = useCreateCheckout({
		addons   : true,
		quantity : durationValue,
	});
	const { completeOrder, completeOrderLoading } = useCompleteOrder({
		checkoutResponse,
		setCompleteOrderResponse,
		profile,
	});
	const { razorLoading, verifyRazor, setRazorLoading } = useVerifyRazor();
	const { order_id = '', gateway_key = '' } = completeOrderResponse || {};
	const { items = {}, checkout_id } = checkoutResponse || {};
	const { plan_name = '', unit_price = '' } = items[0] || [];
	const stripePromise = loadStripe(gateway_key);
	const loading = planDataLoading || checkoutLoading || completeOrderLoading;

	const addonPayHandler = async () => {
		createCheckout({
			setCheckoutResponse,
			resp     : plan,
			plan_pricing_id,
			addons   : true,
			quantity : durationValue,
			completeOrder,
			setStripeModal,
		});
	};

	const getDataHandler = () => {
		getPlan({
			setPlan,
			createCheckout,
			plan_pricing_id,
			setCheckoutResponse,
			addons: true,
		});
	};
	useEffect(() => {
		(async () => {
			if (paymentStatus?.status !== 'active' && apiTries < 10 && pendingModal) {
				const requestData = { saas_checkout_id: checkout_id, gateway: 'stripe' };
				try {
					if (apiTries < 1) setRazorLoading(true);
					const res = await verifyRazor(requestData);
					await wait(WAIT_TIME);
					setApiTries(apiTries + 1);
					setPaymentStatus(res);
				} catch (err) {
					Toast.error(err?.data);
				}
			}
		})();
	}, [apiTries]);

	useEffect(() => {
		if (durationValue < 0) {
			Toast.error('Enter valid Number', {
				autoClose : 5000,
				style     : { background: '#FFE6E3', color: '#333' },
			});
			setDurationValue(0);
		}
	}, [durationValue]);

	useEffect(() => {
		if (addModal) getDataHandler();
	}, [addModal]);

	return (
		<div className={styles.modal_container}>
			<Modal
				show={addModal}
				onClose={() => setAddModal(false)}
				className="primary"
				size="md"
				onOuterClick={() => setAddModal(false)}
				showCloseIcon
			>
				<div>
					<Modal.Header title={(
						<div className={styles.title_container}>
							<div className={styles.icon_container}>
								<IcMPlus width={22} height={22} />
							</div>
							<div className={styles.title}>Add-On</div>
						</div>
					)}
					/>
					<div className={styles.section}>
						<div className={styles.product_title}>{product_name}</div>
						<div>
							<Slider
								durationValue={durationValue}
								setDurationValue={setDurationValue}
								min={1}
								max={100}
								label={['1', '25', '50', '75', '100']}
								data={0}
							/>
						</div>
						<div className={styles.row}>
							<div className={styles.input_container}>
								<LegendInput
									label="Total quantity"
									type="number"
									labelClassName="lablePosition"
									className="inputBox"
									min={1}
									max={100}
									val={durationValue}
									setVal={(e) => {
										if (e > 100) setDurationValue(100);
										else setDurationValue(e);
									}}
									suffix={(
										<div
											className={styles.price}
										>
											{shortFormatNumber(totalPrice, currency)}
										</div>
									)}
								/>
							</div>
							{/* {discount_percent > 0 && (
								<Tagged background="#fce4bf">
									{discount_percent}
									% off
								</Tagged>
							)} */}
						</div>
						<div className={`${styles.row} ${styles.subheading_container}`}>
							<div className="subheading">
								{`1 ${product_name} = ${shortFormatNumber(plan_price, currency)}`}
							</div>
						</div>
					</div>
					<div className={styles.footer}>
						<div className={styles.btn_container}>
							<Button size="md" themeType="secondary" onClick={() => setAddModal(false)}>
								Cancel
							</Button>
							<Button
								size="md"
								themeType="primary"
								onClick={addonPayHandler}
								disabled={loading || durationValue < 0}
							>
								{loading ? <LoadingBtn width="60px" height="15px" /> : 'Proceed to Pay'}
							</Button>
						</div>
					</div>
				</div>
			</Modal>

			{stripeModal && (
				<Elements stripe={stripePromise}>
					<StripePaymentModal
						apiTries={apiTries}
						setApiTries={setApiTries}
						checkoutDetails={items[0]}
						flag={stripeModal}
						setStripeModal={setStripeModal}
						stripeObj={stripePromise}
						checkoutId={checkout_id}
						stripePaymentId={order_id}
						wait={wait}
						razorLoading={razorLoading}
						verifyRazor={verifyRazor}
						setRazorLoading={setRazorLoading}
						setPaymentStatus={setPaymentStatus}
						setPendingModal={setPendingModal}
						finalAmt={unit_price}
						totalPrice={totalPrice}
						currency={currency}
						discount_percentage={discount_percent}
					/>
				</Elements>
			)}
			{pendingModal && (
				<PendingModal
					pendingModal={pendingModal}
					setPendingModal={setPendingModal}
					razorLoading={razorLoading}
					setRazorLoading={setRazorLoading}
					apiTries={apiTries}
					paymentStatus={paymentStatus}
					quantity={durationValue}
					name={AddonsTitleMapping[plan_name]}
					setAddModal={setAddModal}
				/>
			)}
		</div>
	);
}

export default AddonModal;
