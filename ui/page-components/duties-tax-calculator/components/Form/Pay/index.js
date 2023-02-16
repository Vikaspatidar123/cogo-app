import {
	IcMArrowBack, IcMShip, IcMAirport, IcMLocation,
} from '@cogoport/icons-react';
import { useState } from 'react';

import Button from '../../../common/Button';
import useDraft from '../../../hook/useDraft';
import usePayment from '../../../hook/usePayment';
import checkoutFn from '../../../utils/checkoutFn';
import { BtnContainer } from '../styles.module.css';

import Charges from './Charges';
import PayMethodModal from './PayMethodModal';
import ServicesCharge from './ServicesCharge';
import {
	Container,
	RouteDiv,
	TextDiv,
	TextHead,
	Route,
	Icon,
	Txt,
	Footer,
	Dot,
	RouteText,
	Line,
	PortText,
} from './style';

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
		<Container>
			<RouteDiv>
				<TextHead>Transportation Details</TextHead>

				<TextDiv>
					<Route>
						<Icon className="left">
							<IcMLocation width={20} height={20} />
						</Icon>

						<Txt>
							{transportMode === 'OCEAN' ? (
								<IcMShip width={20} height={20} />
							) : (
								<IcMAirport width={20} height={20} />
							)}
						</Txt>

						<Icon className="left">
							<IcMLocation width={20} height={20} />
						</Icon>
					</Route>
					<Footer>
						<Dot />
						<div className="dot" />
						<Dot />
					</Footer>
					<RouteText>
						<Txt className="port origin">
							<PortText>{renderPortName(origin?.name)}</PortText>
						</Txt>

						<Txt>
							<div className="incoterm">{incoterm}</div>
						</Txt>

						<Txt className="port destination">
							<PortText>{renderPortName(destination?.name)}</PortText>
						</Txt>
					</RouteText>
				</TextDiv>
			</RouteDiv>
			<Line />

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

			<BtnContainer className="checkoutBtn">
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
			</BtnContainer>
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
		</Container>
	);
}

export default Pay;
