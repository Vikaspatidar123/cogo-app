import { Toast } from '@cogoport/components';

const productFn = ({
	setFormData,
	setFormStepper,
	setStepper,
	setValue,
	setPrevCurr,
	exchangeApi,
	watchCurrency,
	watchConsignmentValue,
	name = '',
	description = '',
	setShowValidate,
	isQuotaLeft = false,
	verifySixDigitHs,
	watchHsCode,
}) => {
	const validateSubmitHandler = async (data) => {
		setFormData((prev) => ({
			...prev,
			...data,
			name,
			description,
		}));
		setFormStepper((prev) => ({
			...prev,
			formProductDetails : false,
			formChargeDetails  : true,
		}));
		setStepper((prev) => ({
			...prev,
			chargeDetails: true,
		}));
	};

	const submitHandler = async (data) => {
		const resp = await verifySixDigitHs({ hsCode: watchHsCode });
		if (resp) {
			if (isQuotaLeft) {
				setShowValidate(true);
			} else {
				validateSubmitHandler(data);
			}
		}
	};

	const errorHandler = () => {
		Toast.error('Fill all mandatory details', {
			autoClose : 3000,
			style     : { color: '#333', background: '#FFD9D4' },
		});
	};

	const convertCurrency = async (fromCurr, toCurr) => {
		const rate = await exchangeApi(fromCurr, toCurr);
		const newConsignmentValue = (rate * watchConsignmentValue).toFixed(3);
		setValue('consignmentValue', newConsignmentValue);
		setPrevCurr(watchCurrency);
	};

	return {
		submitHandler,
		errorHandler,
		convertCurrency,
		validateSubmitHandler,
	};
};

export default productFn;
