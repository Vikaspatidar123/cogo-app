import { cl } from '@cogoport/components';
import {
	IcMArrowBack, IcMShip, IcMAirport, IcMLocation,
} from '@cogoport/icons-react';
import { useState } from 'react';

import Button from '../../../common/Button';
import useDraft from '../../../hook/useDraft';
import usePayment from '../../../hook/usePayment';
import checkoutFn from '../../../utils/checkoutFn';
import style from '../styles.module.css';

import Charges from './Charges';
import PayMethodModal from './PayMethodModal';
import ServicesCharge from './ServicesCharge';

// import {
// 	Container,
// 	RouteDiv,
// 	TextDiv,
// 	TextHead,
// 	Route,
// 	Icon,
// 	Txt,
// 	Footer,
// 	Dot,
// 	RouteText,
// 	Line,
// 	PortText,
// } from './style';

import styles from './styles.module.css';

function Pay({
	formData = {},
	transportMode = 'OCEAN',
	incoterm = '',
	portDetails = {},
	prevHandler = () => {},
	isUserSubscribed = false,
	isQuotaLeft = false,
	postTradeEngine,
	serviceRateData = {},
	quotaValue,
	isMobile = false,
}) {
	const [showPayMethodModal, setShowPayMethodModal] = useState(false);
	const [paymentMode, setPaymentMode] = useState('');
	const { origin = {}, destination = {} } = portDetails || {};

	const { currency, services } = serviceRateData || {};
	const { duties_and_taxes } = services || {};
	const { refetchDraft, draftLoading = false } = useDraft();
	const { refectPayment, paymentLoading = false } = usePayment();
	const {
		submitHandler,
		checkoutHandler,
		gstAmount,
		amount,
		totalAmount,
		renderPortName,
	} = checkoutFn({
		formData,
		portDetails,
		origin,
		destination,
		refetchDraft,
		transportMode,
		postTradeEngine,
		refectPayment,
		isQuotaLeft,
		setShowPayMethodModal,
		dutiesAndTaxes: duties_and_taxes,
	});
	return (
		<div>
			<div className={styles.route_div}>
				<div className={styles.text_head}>Transportation Details</div>

				<div className={styles.text_div}>
					<div className={styles.route}>
						<div className={styles.left}>
							<IcMLocation width={20} height={20} />
						</div>

						<div className={styles.txt}>
							{transportMode === 'OCEAN' ? (
								<IcMShip width={20} height={20} />
							) : (
								<IcMAirport width={20} height={20} />
							)}
						</div>

						<div className={styles.left}>
							<IcMLocation width={20} height={20} />
						</div>
					</div>
					<div className={styles.footer}>
						<div className={styles.dot_div} />
						<div className={styles.dot} />
						<div className={styles.dot_div} />
					</div>
					<div className={styles.route_text}>
						<div className={cl`${styles.txt} ${styles.port} ${styles.origin}`}>
							<div className={styles.port_text}>{renderPortName(origin?.name)}</div>
						</div>

						<div className={styles.txt}>
							<div className={styles.incoterm}>{incoterm}</div>
						</div>

						<div className={cl`${styles.txt} ${styles.port} ${styles.destination}`}>
							<div className={styles.port_text}>{renderPortName(destination?.name)}</div>
						</div>
					</div>
				</div>
			</div>
			<div className={styles.line} />

			{/* <ServicesCharge formData={formData} />
			<Charges
				formData={formData}
				dtCurrency={currency}
				isQuotaLeft={isQuotaLeft}
				quotaValue={quotaValue}
				gstAmount={gstAmount}
				amount={amount}
				totalAmount={totalAmount}
			/> */}

			<div className={cl`${style.btn_container} ${style.checkout_btn}`}>
				<Button size="md" isPrev onClick={prevHandler}>
					<IcMArrowBack width={16} height={16} />
				</Button>
				<Button
					size="md"
					loading={draftLoading || paymentLoading}
					onClick={submitHandler}
				>
					Procced
				</Button>
			</div>
			{showPayMethodModal && (
				<PayMethodModal
					showPayMethodModal={showPayMethodModal}
					setShowPayMethodModal={setShowPayMethodModal}
					paymentMode={paymentMode}
					setPaymentMode={setPaymentMode}
					isUserSubscribed={isUserSubscribed}
					checkoutHandler={checkoutHandler}
					isMobile={isMobile}
				/>
			)}
		</div>
	);
}

export default Pay;
