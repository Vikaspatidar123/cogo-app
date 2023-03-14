import { useState } from 'react';

const useValidateModal = ({
	servicesSelected,
	setServiceSelected,
	productInfoArr,
	isUserSubscribed,
	setShowCheckout,
}) => {
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

	const clickHandler = () => {
		calculateService();
		setShowCheckout(true);
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

	return {
		renderTitle, renderButton, deleteProduct, checkBoxChangeHandler, clickHandler, serviceProduct,
	};
};

export default useValidateModal;
