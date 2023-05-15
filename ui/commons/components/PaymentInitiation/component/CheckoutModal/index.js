/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Modal, Checkbox, cl } from '@cogoport/components';
import { IcMHourglass } from '@cogoport/icons-react';
import { Frames, CardNumber, ExpiryDate, Cvv } from 'frames-react';
import React, { useState, useEffect } from 'react';

import framesConfig from '../../constants/framesConfig';
import useCancelOrder from '../../hooks/useCancelOrder';
import useCapturePayment from '../../hooks/useCapturePayment';

import styles from './styles.module.css';

function CheckoutModal({
	checkoutModal = false,
	setModal = () => {},
	paymentInitiationResponse = {},
}) {
	const [tokenGeneratedResponse, setTokenGeneratedResponse] = useState({});
	const [isThreeDsEnabled, setIsThreeDsEnabled] = useState(true);
	const [countDown, setCountDown] = useState(0);
	const [startTimer, setStartTimer] = useState(false);
	const [loading, setLoading] = useState(false);
	const seconds = String(countDown % 60);
	const minutes = String(Math.floor(countDown / 60));

	const { capturePayment } = useCapturePayment();
	const { cancelOrder = () => {} } = useCancelOrder({ paymentInitiationResponse });

	const cancelOrderFunction = () => {
		setModal(() => ({ checkoutModal: false }));
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
			setModal(() => ({ checkoutModal: false }));
			setStartTimer(false);
			setCountDown(0);
		}
	}, [countDown, startTimer]);

	useEffect(() => {
		if (Object.keys(tokenGeneratedResponse).length > 0) {
			capturePayment({
				tokenGeneratedResponse,
				paymentInitiationResponse,
				isThreeDsEnabled,
			});
		}
	}, [tokenGeneratedResponse]);

	return (
		<Modal
			show={checkoutModal}
			onOuterClick={cancelOrderFunction}
			onClose={cancelOrderFunction}
			withAnimation
			className="primary md"
		>
			<Frames
				ready={() => setStartTimer(true)}
				config={framesConfig}
				cardSubmitted={() => setLoading(true)}
				cardTokenized={(e) => setTokenGeneratedResponse(e)}
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
						className={styles.companylogo}
					/>
					<img
						src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/chec.png"
						alt="CHECKOUT.COM"
						height="50px"
						width="50px"
					/>
				</div>
				<>
					{startTimer && (
						<div className={styles.wrapper}>
							<div className={styles.timer}>
								<IcMHourglass />
								{minutes}
								:
								{seconds?.toString()?.padStart(2, '0')}
							</div>
						</div>
					)}
					<div className={styles.container}>
						<div className={styles.card_property_title}>
							<strong>Card Number</strong>
							<span>Enter 16-digit card number on the card</span>
						</div>
						<CardNumber />
					</div>
					<div className={cl`${styles.container} ${styles.expiry}`}>
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
							<Checkbox
								checked={isThreeDsEnabled}
								onChange={() => setIsThreeDsEnabled(!isThreeDsEnabled)}
							/>
							<div className={styles.checkboxText}>Enable 3D security</div>
						</div>
						<Button
							onClick={async () => {
								Frames.submitCard();
							}}
							className={styles.button}
							disabled={loading}
						>
							{loading ? 'Please Wait..' : 'Pay Now'}
						</Button>
					</div>
				</>
			</Frames>
		</Modal>
	);
}

export default CheckoutModal;
