import { isEmpty } from '@cogoport/utils';

const getImperativeHandleValues = async ({ imperativeHandleRef }) => {
	const promises = [];
	Object.values(imperativeHandleRef.current).forEach((refObj) => {
		const { handleSubmit } = refObj;

		promises.push(handleSubmit());
	});

	const promiseValues = await Promise.all(promises);

	const errorsHash = {};
	const valuesHash = {};

	Object.keys(imperativeHandleRef.current).forEach((refKey, index) => {
		const { hasError = true, errors, values } = promiseValues[index] || {};

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
