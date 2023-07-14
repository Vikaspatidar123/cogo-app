import { startCase } from '@cogoport/utils';

const checkutFn = ({ localStorageData = {}, serviceRateData = {}, initiatePayment }) => {
	const { currency, services } = serviceRateData || {};
	const { import_export_documents: IEDoc } = services || {};
	const { price, discount } = IEDoc || {};

	const getPrice = () => {
		const amount = +price - +(price * discount) / 100;
		const gstAmount = +amount * 0.18;
		const totalAmount = +amount + +gstAmount;

		return {
			price,
			amount,
			gstAmount,
			totalAmount,
			currency,
		};
	};

	const {
		exportCountry = {},
		importCountry = {},
		transportMode = '',
		manufacturingCountry = {},
		hsCode = '',
	} = localStorageData;

	const prefillData = {
		exportCountry        : exportCountry?.name,
		importCountry        : importCountry?.name,
		transportMode        : startCase(transportMode),
		manufacturingCountry : manufacturingCountry?.name,
		hsCode,
	};

	const paymentHandler = async () => {
		const priceInfo = getPrice();
		await initiatePayment({ ...priceInfo });
	};
	return {
		prefillData,
		getPrice,
		paymentHandler,
	};
};

export default checkutFn;
