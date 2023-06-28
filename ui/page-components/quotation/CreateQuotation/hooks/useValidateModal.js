import { Toast } from '@cogoport/components';
import { useEffect, useState } from 'react';

import { useSelector } from '@/packages/store';

const serviceInfo = {
	duties_and_taxes        : true,
	import_export_documents : false,
	import_export_controls  : false,
	destinationHs           : false,
};

const useValidateModal = ({
	servicesSelected,
	setServiceSelected,
	productInfoArr,
	isUserSubscribed,
	isQuotaLeft,
	setShowCheckout,
	postQuotation,
	quoteRes,
	currency,
	getExchangeRate,
	productLineItemDetails,
	refetchDraft,
	createHeader,
	createlineItem,
	postTradeEngine,
	setTransactionModal,
	setValidateProduct,
}) => {
	const { currency_code: orgCurrency } = useSelector((state) => state.profile.organization.country);
	const [serviceProduct, setServiceProduct] = useState({
		1: [], 2: [], 3: [],
	});
	const [createQuoteRes, setCreateQuoteRes] = useState();
	const productIdArr = Object.keys(servicesSelected);

	const lineItemLength = productLineItemDetails.length;

	useEffect(() => {
		if (lineItemLength > 0) {
			const obj = {};
			const info = productLineItemDetails.map((productInfo) => {
				const { productId, servicesRequired } = productInfo || {};

				return ({
					productId,
					serviceSelected: {
						duties_and_taxes        : servicesRequired?.isLandedCost,
						import_export_documents : servicesRequired?.isDocumentation,
						import_export_controls  : servicesRequired?.isControls,
					},
				});
			});

			info.forEach((ele) => {
				const { productId, serviceSelected } = ele;
				obj[productId] = { ...serviceSelected };
			});
			console.log(obj, 'obj');
			setServiceSelected(obj);
		}
	}, [lineItemLength, productLineItemDetails, setServiceSelected]);

	const calculateService = () => {
		let serviceObj = { 1: [], 2: [], 3: [] };
		productInfoArr.forEach(({ productId, name }) => {
			const info = servicesSelected?.[productId];
			const duties = info?.duties_and_taxes;
			const docs = info?.import_export_documents;
			const control = info?.import_export_controls;

			serviceObj = {
				1 : [...serviceObj[1], duties ? name : null],
				2 : [...serviceObj[2], docs ? name : null],
				3 : [...serviceObj[3], control ? name : null],
			};
		});
		const dutiesArr = serviceObj[1].filter((name) => name);
		const docsArr = serviceObj[2].filter((name) => name);
		const controlsArr = serviceObj[3].filter((name) => name);

		setServiceProduct({
			1: dutiesArr, 2: docsArr, 3: controlsArr,
		});
	};

	const renderTitle = () => {
		if (!isUserSubscribed && lineItemLength > 0) return 'Validate HS Code';
		if (!isUserSubscribed && lineItemLength === 0) return 'Services Details';
		return 'Get Accurate Data';
	};

	const renderButton = () => {
		if (isUserSubscribed) return 'Get Premium services';
		return 'Proceed to Checkout';
	};

	const deleteProduct = (id, index) => {
		const newService = {};

		const serviceArr = Object.keys(servicesSelected)
			.filter((prodId) => prodId !== id);

		serviceArr.forEach((prodId) => { newService[prodId] = { ...servicesSelected[prodId] }; });
		setServiceSelected(newService);
		productInfoArr.splice(index, 1);
	};

	const checkBoxChangeHandler = (id, name) => {
		const serviceValues = servicesSelected?.[id][name];
		const serviceArr = servicesSelected[id];

		setServiceSelected((prv) => ({
			...prv,
			[id]: { ...serviceArr, [name]: !serviceValues },
		}));
	};

	const verifyHandler = (id, hscode) => {
		const serviceArr = servicesSelected[id];
		setServiceSelected((prv) => ({
			...prv,
			[id]: { ...serviceArr, destinationHs: hscode },
		}));
	};

	const isDocSelected = () => {
		const isDocSelectedArr = [];

		productIdArr.forEach((id) => {
			const serviceObj = servicesSelected[id];
			if (!serviceObj.duties_and_taxes
				&& !serviceObj.import_export_documents && !serviceObj.import_export_controls) {
				isDocSelectedArr.push(id);
			}
		});
		if (isDocSelectedArr.length > 0) {
			// Toast.error('Please select atleast one services');
			return false;
		}
		return true;
	};
	const isProductVerified = () => {
		const isProductVerifiedArr = [];

		productIdArr.forEach((id) => {
			const serviceObj = servicesSelected[id];
			if (!serviceObj.destinationHs) isProductVerifiedArr.push(id);
		});

		if (isProductVerifiedArr.length > 0) {
			return false;
		}

		return true;
	};

	const createQuoteFunc = async () => {
		if (!createQuoteRes) {
			const exchangeRate = await getExchangeRate(orgCurrency, currency);
			const quoteResp = await postQuotation({ data: quoteRes, orgCurrency, exchangeRate });
			setCreateQuoteRes(quoteResp?.id);
			return quoteResp?.id;
		}
		return createQuoteRes;
	};

	const freeUser = async () => {
		const draftHeader = await createHeader();
		if (!draftHeader) {
			Toast.error('Something went wrong');
			return;
		}
		const lineItem = createlineItem();

		const resp = await refetchDraft({ draftHeader, lineItem });

		if (resp) {
			setTransactionModal(true);
			await postTradeEngine({ tradeEngineInputId: resp, paymentMode: 'PAYMENT' });
			setValidateProduct(false);
		}
	};

	const clickHandler = async () => {
		// const resp = checkProductDetails();
		// if (!resp) return;
		const docSelected = isDocSelected();
		const productVerify = isProductVerified();
		// const quoteId = createQuoteFunc();
		calculateService();

		if (!docSelected) {
			Toast.error('Please select atleast one services');
		} else if (!isUserSubscribed && !isQuotaLeft && lineItemLength === 0) {
			await createQuoteFunc();
			setShowCheckout(true);
		} else if (!productVerify) {
			Toast.error('Please Validate all Products ');
		} else if (productVerify && lineItemLength > 0) {
			freeUser();
		} else if (productVerify) {
			await createQuoteFunc();
			setShowCheckout(true);
		}
	};

	return {
		renderTitle,
		renderButton,
		deleteProduct,
		checkBoxChangeHandler,
		clickHandler,
		serviceProduct,
		serviceInfo,
		verifyHandler,
	};
};

export default useValidateModal;
