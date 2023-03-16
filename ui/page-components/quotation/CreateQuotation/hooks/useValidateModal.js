import { Toast } from '@cogoport/components';
import { useState } from 'react';

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
	setShowCheckout,
	postQuotation,
	quoteRes,
	currency,
	getExchangeRate,
}) => {
	const { currency_code: orgCurrency } = useSelector((state) => state.profile.organization.country);
	const [serviceProduct, setServiceProduct] = useState({
		1: [], 2: [], 3: [],
	});

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

	const renderTitle = ({ lineItemLength = 0 }) => {
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

	const checkProductDetails = () => {
		const isProductVerified = [];
		const isDocSelected = [];
		const productIdArr = Object.keys(servicesSelected);

		productIdArr.forEach((id) => {
			const serviceObj = servicesSelected[id];
			if (!serviceObj.destinationHs) isProductVerified.push(id);
			if (!serviceObj.duties_and_taxes
				&& !serviceObj.import_export_documents && !serviceObj.import_export_controls) {
				isDocSelected.push(id);
			}
		});

		if (isProductVerified.length > 0 && isUserSubscribed) {
			Toast.error('Please Validate all Products ');
			return false;
		}
		if (isDocSelected.length > 0) {
			Toast.error('Please select atleast one services');
			return false;
		}

		return true;
	};

	const clickHandler = async () => {
		const resp = checkProductDetails();
		if (!resp) return;
		calculateService();
		const exchangeRate = await getExchangeRate(orgCurrency, currency);
		const quoteResp = await postQuotation({ data: quoteRes, orgCurrency, exchangeRate });
		if (quoteResp) {
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
