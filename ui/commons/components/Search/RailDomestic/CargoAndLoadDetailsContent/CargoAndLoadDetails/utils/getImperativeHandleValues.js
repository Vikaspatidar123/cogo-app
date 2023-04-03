import { isEmpty } from '@cogoport/front/utils';

const getImperativeHandleValues = async ({ imperativeHandleRef }) => {
	const promises = [];
	Object.values(imperativeHandleRef.current).forEach((imperativeHandleObj) => {
		const { handleSubmit } = imperativeHandleObj || {};
		if (handleSubmit) {
			promises.push(handleSubmit());
		}
	});

	const promiseValues = await Promise.all(promises);

	const errorsHash = {};
	const valuesHash = {};

	Object.keys(imperativeHandleRef.current).forEach((refKey, index) => {
		const { hasError, errors, values } = promiseValues[index];

		if (hasError) {
			errorsHash[refKey] = { ...errors };
			return;
		}

		valuesHash[refKey] = values;
	});

	if (!isEmpty(errorsHash)) {
		return {};
	}

	return valuesHash;
};

export default getImperativeHandleValues;
