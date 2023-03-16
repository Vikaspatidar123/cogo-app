import { Toast } from '@cogoport/components';

import { SERVICES_MAPPING, DISPLAY_NAME } from '../utils/serviceMapping';

import { useSelector } from '@/packages/store';

const useCheckoutModal = ({
	quoteRes = {},
	quoteId = '',
	traderCheck,
	productInfoArr = [],
	servicesSelected = {},
	paymentMode,
	headerResLength = 0,
	getPortDetails,
	refetchDraft,
	consignmentValue = 0,
	serviceProduct = {},
	serviceData,
	postPayemnt,
	prioritySequence,
}) => {
	const { country_code } = useSelector((state) => state.profile.organization.country);
	const { services = {}, currency: serviceCurrency = 'INR' } = serviceData || {};

	const {
		transportMode,
		charges = {},
		destinationPortDetails = {}, originPortDetails = {}, header = {}, sellerAddress = {}, buyerDetails = {},
	} = quoteRes;

	const renderBtn = () => {
		if (paymentMode === 'addon' || headerResLength > 0) {
			return 'Get Details';
		}
		return 'Proceed to Pay';
	};

	const getCountryDetails = async (id, type) => {
		const response = await getPortDetails({
			status     : 'active',
			type       : [type],
			id         : type !== 'country' ? id : '',
			country_id : type === 'country' ? id : '',
		});
		return response?.country_code || response;
	};

	const createHeader = async () => {
		const {
			partyName = '',
			address: buyerAddress = '',
			pincode: buyerPinCode = '',
			country: buyerCountry = '',
			state: buyerState = '',
			city : buyerCity = '',
			countryId: buyerCountryId = '',
		} = buyerDetails;

		const buyerCountryCode = await getCountryDetails(buyerCountryId, 'country');

		const draftHeader = {
			incoterm               : charges?.incoterm,
			resultCurrency         : header?.currency,
			quotationId            : quoteId,
			modeOfTransport        : transportMode === 'OCEAN' ? 'SEA' : 'AIR',
			originCountryCode      : originPortDetails?.country_code,
			destinationCountryCode : destinationPortDetails?.country_code,
			isScreening            : traderCheck,
			consignmentValue,
			sellerDetails          : {
				name        : sellerAddress?.name,
				countryCode : country_code,
				address     : sellerAddress?.address,
				pinCode     : sellerAddress?.pincode,
				state       : null,
				city        : null,
				countryName : null,
			},
			buyerDetails: {
				name        : partyName,
				countryCode : buyerCountryCode,
				address     : buyerAddress,
				pinCode     : buyerPinCode,
				state       : buyerState,
				city        : buyerCity,
				countryName : buyerCountry,
			},
		};
		if (buyerCountryCode) {
			return draftHeader;
		}
		Toast.error('Something went wrong');
		return false;
	};

	const createlineItem = () => {
		const lineItem = productInfoArr.map(({ product_price = '', productId = '', quantity = '', name = '' }) => {
			const {
				duties_and_taxes, import_export_documents,
				import_export_controls, destinationHs,
			} = servicesSelected?.[productId] || {};
			return {
				destinationHs,
				value            : product_price,
				productId,
				servicesRequired : {
					isLandedCost    : duties_and_taxes,
					isDocumentation : import_export_documents,
					isControls      : import_export_controls,
				},
				manufactureOrigin : country_code,
				quantity,
				originCN          : '',
				productName       : name,
			};
		});

		return lineItem;
	};

	const createBillLineItems = () => {
		const countArr = Object.keys(serviceProduct);

		if (traderCheck) countArr.push('4');

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
		const draftHeader = await createHeader();
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
		}
		console.log(draftResp, 'draftResp');
	};

	return { submitHandler, renderBtn };
};

export default useCheckoutModal;
