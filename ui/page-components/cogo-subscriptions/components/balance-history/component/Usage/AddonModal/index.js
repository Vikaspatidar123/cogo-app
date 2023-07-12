import { Button, Modal, Toast } from '@cogoport/components';
import { IcMPlus } from '@cogoport/icons-react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useTranslation } from 'next-i18next';
import { useState, useEffect, useCallback } from 'react';

import LegendInput from '../../../../../common/LegendInput';
import Slider from '../../../../../common/Slider';
import { AddonsTitleMapping } from '../../../../../common/UsageIcon';
import {
	DEFAULT_DURATION_VALUE,
	DEFAULT_VALUE,
	API_COUNT_TIME, START_COUNT,
	SET_DURATION,
	MAX_VALUE,
	MIN_VALUE,
	SLIDER_LABEL,
} from '../../../../../constants/dimensions';
import useCompleteOrder from '../../../../../hooks/useCompleteOrder';
import useCreateCheckout from '../../../../../hooks/useCreateCheckout';
import useGetPlanDetails from '../../../../../hooks/useGetPlanDetails';
import useVerifyRazor from '../../../../../hooks/useVerifyRazorPayStatus';
import PendingModal from '../PendingModal';
import StripePaymentModal from '../StripePaymentModal';

import styles from './styles.module.css';

import { Image } from '@/packages/next';
import { useSelector } from '@/packages/store';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import formatAmount from '@/ui/commons/utils/formatAmount';

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
	const { t } = useTranslation(['subscriptions']);
	const [durationValue, setDurationValue] = useState(DEFAULT_DURATION_VALUE);
	const [plan, setPlan] = useState({});
	const [checkoutResponse, setCheckoutResponse] = useState();
	const [completeOrderResponse, setCompleteOrderResponse] = useState();
	const [stripeModal, setStripeModal] = useState();
	const [apiTries, setApiTries] = useState(0);
	const [paymentStatus, setPaymentStatus] = useState(null);

	const { profile } = useSelector((s) => s);
	const {
		product_name = '',
		currency = GLOBAL_CONSTANTS.currency_code.INR,
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
	const { plan_name = '', unit_price = '' } = items[GLOBAL_CONSTANTS.zeroth_index] || [];
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

	const getDataHandler = useCallback(() => {
		getPlan({
			setPlan,
			createCheckout,
			plan_pricing_id,
			setCheckoutResponse,
			addons: true,
		});
	}, [createCheckout, getPlan, plan_pricing_id]);

	useEffect(() => {
		(async () => {
			if (paymentStatus?.status !== 'active' && apiTries < API_COUNT_TIME && pendingModal) {
				const requestData = { saas_checkout_id: checkout_id, gateway: 'stripe' };
				try {
					if (apiTries < START_COUNT) setRazorLoading(true);
					const res = await verifyRazor(requestData);
					await wait(WAIT_TIME);
					setApiTries(apiTries + START_COUNT);
					setPaymentStatus(res);
				} catch (err) {
					Toast.error(err?.data);
				}
			}
		})();
	}, [apiTries, checkout_id, paymentStatus?.status, pendingModal, setRazorLoading, verifyRazor]);

	useEffect(() => {
		if (durationValue < DEFAULT_VALUE) {
			Toast.error(t('subscriptions:enter_valid_number_message'));
			setDurationValue(DEFAULT_VALUE);
		}
	}, [durationValue, t]);

	useEffect(() => {
		if (addModal) getDataHandler();
	}, [addModal, getDataHandler]);

	return (
		<div className={styles.modal_container}>
			<Modal
				show={addModal}
				onClose={() => setAddModal(false)}
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
							<div className={styles.title}>{t('subscriptions:add_on_text')}</div>
						</div>
					)}
					/>
					<div className={styles.section}>
						<div className={styles.product_title}>{product_name}</div>
						<div>
							<Slider
								durationValue={durationValue}
								setDurationValue={setDurationValue}
								min={MIN_VALUE}
								max={MAX_VALUE}
								label={SLIDER_LABEL}
								data={DEFAULT_VALUE}
							/>
						</div>
						<div className={styles.row}>
							<div className={styles.input_container}>
								<LegendInput
									label={t('subscriptions:total_quantity_text')}
									type="number"
									labelClassName="lablePosition"
									className="inputBox"
									min={START_COUNT}
									max={SET_DURATION}
									val={durationValue}
									setVal={(e) => {
										if (e > SET_DURATION) setDurationValue(SET_DURATION);
										else setDurationValue(e);
									}}
									suffix={(
										<div
											className={styles.price}
										>
											{formatAmount({
												amount  : totalPrice,
												currency,
												options : {
													notation : 'standard',
													style    : 'currency',
												},
											})}
										</div>
									)}
								/>
							</div>
						</div>
						<div className={`${styles.row} ${styles.subheading_container}`}>
							<div className="subheading">
								{`1 ${product_name} = ${formatAmount({
									amount  : plan_price,
									currency,
									options : {
										notation : 'standard',
										style    : 'currency',
									},
								})
								}`}
							</div>
						</div>
					</div>
					<div className={styles.footer}>
						<div className={styles.btn_container}>
							<Button
								size="md"
								themeType="secondary"
								onClick={() => setAddModal(false)}
								type="button"
							>
								{t('subscriptions:cancel_text')}
							</Button>
							<Button
								size="md"
								themeType="primary"
								onClick={addonPayHandler}
								disabled={loading || durationValue < DEFAULT_VALUE}
								type="button"
							>
								{loading ? (
									<Image
										src={GLOBAL_CONSTANTS.image_url.loading}
										alt={t('subscriptions:loading_text')}
										width={20}
										height={20}
									/>
								) : t('subscriptions:proced_to_pay_text')}
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
