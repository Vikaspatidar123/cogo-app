import { startCase } from '@cogoport/utils';

import useGetQuota from './useGetQuota';
import useGetServiceRates from './useGetServiceRates';
import usePayment from './usePayment';

// const MAPPING = {
// 	exportCountry        : 'Country of Export',
// 	importCountry        : 'Country of Import',
// 	manufacturingCountry : 'Country of Manufacturing',
// 	transportMode        : 'Mode of Tranport',
// 	exportHsCode         : 'Export Hs Code',
// 	importHsCode         : 'Import Hs Code',
// 	productUse           : 'Product End Use',
// };

const useCheckout = ({ localStorageData = {}, address = {} }) => {
	const {
		exportCountry = {},
		importCountry = {},
		transportMode = '',
		manufacturingCountry = {},
		exportHsCode = '',
		importHsCode = '',
		productUse = '',
	} = localStorageData || {};

	const prefillData = {
		exportCountry        : exportCountry?.name,
		importCountry        : importCountry?.name,
		manufacturingCountry : manufacturingCountry?.name,
		transportMode        : startCase(transportMode),
		exportHsCode,
		importHsCode,
		productUse           : startCase(productUse),
	};

	const { prioritySequence = 0, ...quotaRest } = useGetQuota();
	const { initiatePayment, paymentLoading, ...paymentRest } = usePayment();
	const { serviceRatesLoading = false, serviceRateData = {} } =		useGetServiceRates(prioritySequence);

	const { currency, services = {} } = serviceRateData || {};
	const { import_export_controls: IEControls = {} } = services || {};
	const { price = 0, discount = 0 } = IEControls || {};

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

	const paymentHandler = async () => {
		const priceInfo = getPrice();
		await initiatePayment({ ...priceInfo, address });
	};

	return {
		prefillData,
		// MAPPING,
		getPrice,
		paymentHandler,
		loading: paymentLoading || serviceRatesLoading,
		...quotaRest,
		...paymentRest,
	};
};

export default useCheckout;
