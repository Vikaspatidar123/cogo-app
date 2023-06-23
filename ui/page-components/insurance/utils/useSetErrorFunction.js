import { Toast } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

const useSetErrorFunction = ({
	setError,
	uploadType,
	prosporerAddress,
	insuranceType,
	checked,
	setFormDetails,
	setActiveStepper,
}) => {
	const setErrorFunction = (values) => {
		console.log('🚀 ~ file: useSetErrorFunction.js:14 ~ setErrorFunction ~ values:', values);
		const isCorporate = uploadType === 'CORPORATE';
		let hasError = false;
		if (
			!Object.keys(prosporerAddress || {})?.length > 0
			&& insuranceType[0] === 'OTHER'
		) {
			Toast.error('Please add proposer\'s address');
			hasError = true;
		}
		if (isEmpty(checked?.[0]) && insuranceType?.[0] === 'SELF') {
			console.log('hii');
			Toast.error('Please Select a Address');
			hasError = true;
		}
		Object.keys(values).forEach((itm) => {
			if (isCorporate) {
				if (itm !== 'aadharNumber' && !values[itm]) {
					hasError = true;
					setError(itm, { type: 'required', message: 'required' });
				}
			} else if (itm !== 'gstin' && !values[itm]) {
				hasError = true;
				setError(itm, { type: 'required', message: 'required' });
			}
		});
		return hasError;
	};

	const handleNextClick = (values) => {
		const hasError = setErrorFunction(values);
		if (!hasError) {
			setFormDetails((prev) => ({
				...prev,
				...values,
				checkedId : checked?.[0],
				type      : [insuranceType?.[0], uploadType],
			}));
			setActiveStepper(() => ({
				1   : true,
				2   : 'pro',
				3   : false,
				svg : 1,
			}));
		}
	};
	return { handleNextClick };
};
export default useSetErrorFunction;
