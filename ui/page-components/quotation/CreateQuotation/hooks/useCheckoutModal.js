import { Toast } from '@cogoport/components';

import { SERVICES_MAPPING, DISPLAY_NAME } from '../utils/serviceMapping';

const useCheckoutModal = ({
	quoteId = '',
	traderCheck,
	paymentMode,
	headerResLength = 0,
	refetchDraft,
	serviceProduct = {},
	serviceData,
	postPayemnt,
	prioritySequence,
	createHeader,
	createlineItem,
	postTradeEngine,
	setTransactionModal,
	setShowCheckout,
}) => {
	const { services = {}, currency: serviceCurrency = 'INR' } = serviceData || {};

	const renderBtn = () => {
		if (paymentMode === 'addon' || headerResLength > 0) {
			return 'Get Details';
		}
		return 'Proceed to Pay';
	};

	const createBillLineItems = () => {
		const countArr = Object.keys(serviceProduct);

		if (traderCheck) countArr.push(4);

		const payloadData = countArr.map((ele) => {
			const serviceName = SERVICES_MAPPING[ele];
			const displayName = DISPLAY_NAME[ele];
			const perPrice = services?.[serviceName]?.price;
			const discount = services?.[serviceName]?.discount;
			const quantity = ele === 4 ? 1 : serviceProduct[ele].length;
			const totalPrice = +quantity * +perPrice;
			const amount = +totalPrice - (+totalPrice * +discount) / 100;
			const taxAmount = (+amount * 0.18).toFixed(2);
			const netAmount = (+taxAmount + +amount).toFixed(2);

			return {
				description    : serviceName,
				displayName,
				pricePerUnit   : perPrice,
				quantity,
				totalAmount    : totalPrice.toFixed(2),
				discountAmount : (+totalPrice - +amount).toFixed(2),
				subTotalAmount : (+amount).toFixed(2),
				taxAmount,
				netAmount,
				metadata       : null,
			};
		});
		const totalAmount = payloadData.reduce(
			(acc, { totalAmount: currTotalAmt = 0 }) => +acc + +currTotalAmt,
			0,
		);
		const discountAmount = payloadData.reduce(
			(acc, { discountAmount: currDiscountAmt = 0 }) => +acc + +currDiscountAmt,
			0,
		);
		const taxAmount = payloadData.reduce(
			(acc, { taxAmount: currTaxAmt = 0 }) => +acc + +currTaxAmt,
			0,
		);
		const subTotalAmount = payloadData.reduce(
			(acc, { subTotalAmount: currSubTotalAmt = 0 }) => +acc + +currSubTotalAmt,
			0,
		);
		const netAmount = payloadData.reduce(
			(acc, { netAmount: currNetAmount = 0 }) => +acc + +currNetAmount,
			0,
		);

		return {
			payloadData,
			totalAmount    : totalAmount.toFixed(2),
			discountAmount : discountAmount.toFixed(2),
			taxAmount      : taxAmount.toFixed(2),
			subTotalAmount : subTotalAmount.toFixed(2),
			netAmount      : netAmount.toFixed(2),
		};
	};

	const submitHandler = async () => {
		const draftHeader = await createHeader(traderCheck);
		if (!draftHeader) {
			Toast.error('Something went wrong');
			return;
		}

		const lineItem = createlineItem();
		const {
			payloadData,
			...rest
		} = createBillLineItems();

		const draftResp = await refetchDraft({
			draftHeader, lineItem,
		});
		if (draftResp && paymentMode === 'directPay') {
			await postPayemnt({
				billRefId     : draftResp,
				currency      : serviceCurrency,
				billLineItems : payloadData,
				quoteId,
				prioritySequence,
				...rest,
			});
		} else if (draftResp && paymentMode === 'addon') {
			setTransactionModal(true);
			postTradeEngine({
				tradeEngineInputId : draftResp,
				paymentMode        : 'QUOTA',
			});
			setShowCheckout(false);
		}
		console.log(draftResp, 'draftResp');
	};

	return { submitHandler, renderBtn };
};

export default useCheckoutModal;
