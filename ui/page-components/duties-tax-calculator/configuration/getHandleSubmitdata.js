import { Toast } from '@cogoport/components';

const checkError = (promiseValues) => {
	if (promiseValues.includes(true)) {
		Toast.error('Please fill all deatils');
		return true;
	}
	promiseValues.map((value) => {
		if (value?.check) {
			Toast.error('Please fill all deatils');
			return true;
		}
		if (value?.products?.length === 0) {
			Toast.error('Please add atleast one Product');
			return true;
		}
		return false;
	});
	return false;
};

const getHandleSubmitData = async ({ quoteRef = {}, headerHandleSubmit, transportMode, premiumQuote = false }) => {
	let refValues = Object.keys(quoteRef).filter((ref) => {
		if (premiumQuote && ref === 'charges') {
			return null;
		}
		return quoteRef?.[ref]?.handleSubmit;
	});

	const promises = refValues.map((ref) => quoteRef?.[ref]?.handleSubmit());

	refValues = [...refValues, 'header'];

	const val = new Promise((resolve) => {
		const onSubmit = (data) => data;
		const onError = () => true;
		headerHandleSubmit(
			(value) => resolve(onSubmit(value)),
			(value) => resolve(onError(value)),
		)();
	});

	const promiseValues = await Promise.all([...promises, val]);

	const isError = checkError(promiseValues);

	if (isError) {
		return false;
	}

	const data = {
		sellerAddress          : quoteRef?.sellerAddress,
		buyerDetails           : quoteRef?.buyerDetails,
		destinationPortDetails : quoteRef?.transport?.destinationPortDetails,
		originPortDetails      : quoteRef?.transport?.originPortDetails,
		transportMode,
	};

	refValues.forEach((key, index) => {
		const value = promiseValues[index];
		data[key] = value;
	});

	return data;
};
export default getHandleSubmitData;
