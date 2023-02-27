import {
	Modal, Button, Input, Toast,
} from '@cogoport/components';
import { IcMUserAllocations } from '@cogoport/icons-react';
import { CardElement, useElements } from '@stripe/react-stripe-js';
import React, { useState, useMemo } from 'react';

import FormItem from '../../../../../common/FormItem';
import { shortFormatNumber } from '../../../../../utils/getShortFormatNumber';

import styles from './styles.module.css';

function StripSection({
	apiTries,
	setApiTries,
	wait,
	flag,
	setStripeModal,
	stripeObj,
	stripePaymentId,
	checkoutId,
	setPendingModal,
	verifyRazor,
	setRazorLoading,
	setPaymentStatus,
	finalAmt,
	currency,
	totalPrice,
	discount_percentage,
}) {
	// const { selectedAddress } = useSaasState();
	// const { name } = selectedAddress;

	const [cardHolder, setCardHolder] = useState('name');
	const [loading, setLoading] = useState(false);

	const useOptions = () => {
		const options = useMemo(() => ({
			style: {
				base: {
					color           : '#424770',
					letterSpacing   : '0.025em',
					'::placeholder' : { color: '#aab7c4' },
					fontSize        : 12,
				},
				invalid: { color: '#9e2146' },
			},
			hidePostalCode: true,
		}), []);

		return options;
	};

	const elements = useElements();
	const options = useOptions();
	const WAIT_TIME = 3 * 1000;

	const verifyPaymentNow = async (params) => {
		setStripeModal(false);
		if (apiTries < 10) {
			try {
				setPendingModal(true);
				if (apiTries < 1) setRazorLoading(true);
				const res = await verifyRazor(params);
				await wait(WAIT_TIME);

				setApiTries((prevState) => prevState + 1);
				setPaymentStatus(res);
			} catch (err) {
				Toast.error(err?.data);
			}
		}
	};

	const handleSubmit = async () => {
		setLoading(true);
		if (!stripeObj && !stripePaymentId) {
			return;
		}

		const stripe = await stripeObj;

		stripe
			.confirmCardPayment(stripePaymentId, {
				payment_method: {
					type            : 'card',
					card            : elements.getElement(CardElement),
					billing_details : { name: cardHolder },
				},
			})
			.then((result) => {
				if (result.error) {
					Toast.error(result.error.message, { style: { color: 'white' } });
					setLoading(false);
				} else if (
					result.paymentIntent.status === 'succeeded'
					|| result.paymentIntent.status === 'requires_capture'
				) {
					const params = {
						gateway          : 'stripe',
						gateway_order_id : result?.paymentIntent.id,
						saas_checkout_id : checkoutId,
					};
					verifyPaymentNow(params);
				}
			});
	};

	return (
		<Modal show={flag} onClose={() => setStripeModal(false)} className="primary">
			<form className="formContainer">
				<div className={styles.container}>
					<div className={styles.info}>
						<div className={styles.title}>
							Total:
							<div>{shortFormatNumber(finalAmt, currency)}</div>
							{discount_percentage > 0 && (
								<div className="crossedPrice">
									{shortFormatNumber(totalPrice, currency)}
								</div>
							)}
						</div>
						<div className={styles.form_info}>
							<FormItem label="Card holder name" className={styles.card_name}>
								<Input
									width="100%"
									value={cardHolder}
									onChange={(e) => setCardHolder(e.target.value)}
									placeholder="Card holder name"
									prefix={<IcMUserAllocations width={20} height={20} fill="#d3d3d3" />}
								/>
							</FormItem>
							<FormItem label="Card details">
								<div className={styles.stripe_box}>
									<CardElement options={options} />
								</div>
							</FormItem>
						</div>
					</div>

					<div className={styles.footer}>
						<Button
							size="lg"
							disabled={!stripeObj || loading}
							onClick={handleSubmit}
							loading={loading}
						>
							Pay
							<div className="amt">{shortFormatNumber(finalAmt, currency)}</div>
						</Button>
					</div>
				</div>
			</form>
		</Modal>
	);
}

export default StripSection;
