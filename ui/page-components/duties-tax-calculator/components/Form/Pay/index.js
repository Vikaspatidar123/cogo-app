import { cl, Button } from '@cogoport/components';
import {
	IcMArrowBack, IcMShip, IcMAirport, IcMLocation,
} from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import useDraft from '../../../hook/useDraft';
import usePayment from '../../../hook/usePayment';
import checkoutFn from '../../../utils/checkoutFn';
import style from '../styles.module.css';

import Charges from './Charges';
import PayMethodModal from './PayMethodModal';
import ServicesCharge from './ServicesCharge';
import styles from './styles.module.css';

import SelectAddressComponent from '@/ui/commons/components/CreateOrganizationModel/Components/SelectAddressComponent';
import PaymentModal from '@/ui/commons/components/PaymentInitiation/component/PaymentModal';

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
}) {
	const { t } = useTranslation(['dutiesTaxesCalculator']);

	const [showPayMethodModal, setShowPayMethodModal] = useState(false);
	const [paymentMode, setPaymentMode] = useState('');
	const [address, setAddress] = useState('');

	const { origin = {}, destination = {} } = portDetails || {};
	const { currency, services } = serviceRateData || {};
	const { duties_and_taxes } = services || {};
	const { refetchDraft, draftLoading = false } = useDraft();
	const {
		refectPayment, paymentLoading = false,	data = {},
		modal = {},
		setModal = () => {},
	} = usePayment();

	const {
		submitHandler,
		checkoutHandler,
		gstAmount,
		amount,
		totalAmount,
		renderPortName,
	} = checkoutFn({
		t,
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
		address,
	});
	return (
		<div>
			<div className={styles.route_div}>
				{!isQuotaLeft && (
					<div className={`${styles.text_div} ${styles.billing}`}>
						<div className={styles.text_head}>{t('dutiesTaxesCalculator:form_pay_address_title')}</div>
						<SelectAddressComponent address={address} setAddress={setAddress} />
					</div>
				)}
				<div className={styles.text_head}>{t('dutiesTaxesCalculator:form_pay_main_title')}</div>

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
						<div className={cl`${styles.txt} ${styles.port} ${styles.origin_style}`}>
							<div className={styles.port_text}>{renderPortName(origin?.name)}</div>
						</div>

						<div className={styles.txt}>
							<div className={styles.incoterm}>{incoterm}</div>
						</div>

						<div className={cl`${styles.txt} ${styles.port} ${styles.destination_style}`}>
							<div className={styles.port_text}>{renderPortName(destination?.name)}</div>
						</div>
					</div>
				</div>
			</div>
			<div className={styles.line} />

			<ServicesCharge formData={formData} />
			<Charges
				formData={formData}
				dtCurrency={currency}
				isQuotaLeft={isQuotaLeft}
				quotaValue={quotaValue}
				gstAmount={gstAmount}
				amount={amount}
				totalAmount={totalAmount}
			/>

			<div className={cl`${style.btn_container} ${style.checkout_btn}`}>
				<Button size="md" themeType="secondary" onClick={prevHandler}>
					<IcMArrowBack width={16} height={16} />
				</Button>
				<Button
					size="md"
					loading={draftLoading || paymentLoading}
					onClick={submitHandler}
				>
					{t('dutiesTaxesCalculator:form_pay_proceed_btn')}
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
				/>
			)}
			{modal && <PaymentModal paymentData={data} modal={modal} setModal={setModal} />}

		</div>
	);
}

export default Pay;
