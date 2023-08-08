import { Toast, Tooltip } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

const TRANSPORT = {
	OCEAN : 'SEA',
	AIR   : 'AIR',
};

const checkoutFn = ({
	t,
	formData,
	origin,
	destination,
	refetchDraft,
	transportMode,
	postTradeEngine,
	refectPayment,
	isQuotaLeft = false,
	setShowPayMethodModal,
	dutiesAndTaxes = {},
	portDetails,
	address,
}) => {
	const { countryCode = '' } = origin || {};
	const { price, discount } = dutiesAndTaxes || {};

	const amount = +price - +(price * discount) / 100;
	const gstAmount = +amount * 0.18;
	const totalAmount = +amount + +gstAmount;

	const {
		incoterm = '',
		freightCharge = 0,
		consignmentValue,
		currency = 'INR',
		hsCode,
		quantity,
		name = '',
		description = '',
		incotermCharges = [],
		originPort = '',
		destinationPort = '',
	} = formData || {};

	const header = {
		incoterm,
		consignmentValue,
		originCountryCode      : countryCode,
		originPortId           : originPort,
		destinationPortId      : destinationPort,
		destinationCountryCode : destination?.countryCode,
		resultCurrency         : currency,
		modeOfTransport        : TRANSPORT[transportMode],
		isScreening            : false,
		freightCharges         : freightCharge,
		additionalChargesList  : {
			additionalCharges: [],
			incotermCharges,
		},
	};
	const lineItem = [
		{
			originCN          : '',
			manufactureOrigin : countryCode,
			originHs          : '',
			value             : consignmentValue,
			destinationHs     : hsCode,
			productName       : name || description,
			quantity,
		},
	];

	const checkoutHandler = async () => {
		const resp = await refetchDraft({ header, lineItem, isQuotaLeft });

		if (resp && !isQuotaLeft) {
			await refectPayment({
				price,
				gstAmount,
				amount,
				totalAmount,
				billRefId: resp,
				address,
			});
		} else if (resp && isQuotaLeft) {
			await postTradeEngine(resp, 'QUOTA');
		}
		return null;
	};

	const submitHandler = () => {
		if (isQuotaLeft) {
			checkoutHandler();
		} else if (isEmpty(address)) {
			Toast.error(t('dutiesTaxesCalculator:address_toast_err_msg'));
		} else {
			setShowPayMethodModal(true);
			// eslint-disable-next-line no-undef
			localStorage.setItem(
				'formData',
				JSON.stringify({ ...formData, ...portDetails, transportMode }),
			);
		}
	};

	const renderPortName = (portName) => {
		if (portName.length > 16) {
			return (
				<Tooltip theme="light" content={portName}>
					<div>
						{portName.slice(0, 16)}
						...
					</div>
				</Tooltip>
			);
		}
		return portName;
	};

	return {
		submitHandler,
		checkoutHandler,
		gstAmount,
		amount,
		totalAmount,
		renderPortName,
	};
};

export default checkoutFn;
