import { Toast } from '@cogoport/components';

const getHandleSubmitData = async ({ quoteRef = {}, headerHandleSubmit }) => {
	let refValues = Object.keys(quoteRef).filter((ref) => quoteRef?.[ref]?.handleSubmit);
	const promises = Object.values(quoteRef).filter((ref) => ref?.handleSubmit).map((refObj) => refObj?.handleSubmit());

	refValues = [...refValues, 'header'];

	const val = new Promise((resolve) => {
		const onSubmit = (data) => data;
		const onError = (data) => data;
		headerHandleSubmit(
			(value) => resolve(onSubmit(value)),
			(value) => resolve(onError(value)),
		)();
	});

	const promiseValues = await Promise.all([...promises, val]);

	if (promiseValues.includes(true)) {
		Toast.error('Please fill all deatils');
		return false;
	}

	const data = { sellerAddress: quoteRef?.sellerAddress, buyerDetails: quoteRef?.buyerDetails };

	refValues.forEach((key, index) => {
		const value = promiseValues[index];
		data[key] = value;
	});

	return data;
};
export default getHandleSubmitData;
