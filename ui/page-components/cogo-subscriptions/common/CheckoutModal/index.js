/* eslint-disable react-hooks/exhaustive-deps */
import { cl, Button, Modal, CheckBox } from '@cogoport/components';
import { IcMHourglass } from '@cogoport/icons-react';
import { Frames, CardNumber, ExpiryDate, Cvv } from 'frames-react';
import { useState, useEffect } from 'react';

import useCancelOrder from '../../hooks/useCancelOrder';
import useCapturePayment from '../../hooks/useCapturePayment';
import { shortFormatNumber } from '../../utils/getShortFormatNumber';

import styles from './styles.module.css';

import framesConfig from '@/ui/commons/components/PaymentInitiation/constants/framesConfig';

function CheckoutModal({
	checkoutModal,
	checkoutResponse,
	setCheckoutModal,
	responseForCheckout,
}) {
	const [tokenGeneratedResponse, setTokenGeneratedResponse] = useState({});
	const [is3Denabled, setIs3DEnabled] = useState(true);
	const [countDown, setCountDown] = useState(0);
	const [startTimer, setStartTimer] = useState(false);
	const [loading, setLoading] = useState(false);
	const seconds = String(countDown % 60);
	const minutes = String(Math.floor(countDown / 60));
	const { currency = '', total_amount = '' } = checkoutResponse || {};
	const { capturePayment } = useCapturePayment();
	const { cancelOrder } = useCancelOrder({ responseForCheckout, checkoutResponse });
	const cancelOrderFunction = () => {
		setCheckoutModal(false);
		cancelOrder();
	};

	useEffect(() => {
		let timer;
		if (startTimer) {
			setCountDown(60 * 5);
			timer = setInterval(() => {
				setCountDown((prev) => prev - 1);
			}, 1000);
		} else {
			clearInterval(timer);
		}
		return () => {
			clearInterval(timer);
		};
	}, [startTimer]);

	useEffect(() => {
		if (countDown < 0 && startTimer) {
			cancelOrder();
			setCheckoutModal(false);
			setStartTimer(false);
			setCountDown(0);
		}
		return () => {};
	}, [countDown, startTimer]);

	useEffect(() => {
		if (Object.keys(tokenGeneratedResponse).length > 0) {
			capturePayment({
				tokenGeneratedResponse,
				checkoutResponse,
				responseForCheckout,
				is3Denabled,
			});
		}
		return () => {};
	}, [tokenGeneratedResponse]);

	return (
		<Modal
			show={checkoutModal}
			onOuterClick={cancelOrderFunction}
			onClose={cancelOrderFunction}
		>
			<Frames
				config={framesConfig}
				cardSubmitted={() => setLoading(true)}
				cardTokenized={(e) => setTokenGeneratedResponse(e)}
				ready={() => setStartTimer(true)}
				cardTokenizationFailed={() => {
					cancelOrder();
				}}
			>
				<div className={styles.logo_container}>
					<img
						src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/cogo-logo.svg"
						alt="COGOPORT"
						height="50px"
						width="50px"
						className="companylogo"
					/>
					<img
						src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/chec.png"
						alt="CHECKOUT.COM"
						height="50px"
						width="50px"
					/>
				</div>
				<div className={styles.wrapper}>
					<div className="timer">
						<IcMHourglass />
						{minutes}
						:
						{seconds}
					</div>
				</div>
				<div className={styles.container}>
					<div className={styles.card_property_title}>
						<strong>Card Number</strong>
						<span>Enter 16-digit card number on the card</span>
					</div>
					<CardNumber />
				</div>
				<div className={cl`${styles.container}  ${styles.expiry}`}>
					<div className={styles.card_property_title}>
						<strong>Expiry Date</strong>
						<ExpiryDate />
					</div>
					<div className={styles.card_property_title}>
						<strong>CVV Number</strong>
						<Cvv />
					</div>
				</div>
				<div className={styles.check_box_wrapper}>
					<div className={styles.checkbox}>
						<CheckBox
							checked={is3Denabled}
							onChange={() => {
								setIs3DEnabled(!is3Denabled);
							}}
						/>
						<div className={styles.checkbox_text}>Enable 3D security</div>
					</div>
					<Button
						onClick={async () => {
							Frames.submitCard();
						}}
						disabled={loading}
						type="button"
						className={styles.button}
					>
						{loading
							? 'Please Wait..'
							: `Pay ${shortFormatNumber(total_amount, currency, true)}`}
					</Button>
				</div>
			</Frames>
		</Modal>
	);
}

export default CheckoutModal;
