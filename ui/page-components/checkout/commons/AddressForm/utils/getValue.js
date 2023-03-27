import { getByKey } from '@cogoport/utils';

const getValue = (object, path, defaultValue) => {
	const value = getByKey(object, path, defaultValue);

	return value === null ? defaultValue : value;
};

export default getValue;
