import { Toast } from '@cogoport/components';

const getHandleSubmitData = async ({ quoteRef = {}, headerHandleSubmit }) => {
	const promises = Object.values(quoteRef).map((refObj) => refObj?.handleSubmit && refObj?.handleSubmit());
	console.log(quoteRef, 'quoteRef');
	const val = new Promise((resolve) => {
		const onSubmit = (data) => data;
		const onError = (data) => data;
		headerHandleSubmit(
			(value) => resolve(onSubmit(value)),
			(value) => resolve(onError(value)),
		)();
	});
	console.log(promises, 'promises');
	const data = await Promise.all([...promises, val]);
	if (data.includes(true)) {
		Toast.error('Please fill all deatils');
		return false;
	}
	return data;
};
export default getHandleSubmitData;
