import { get } from '@cogoport/utils';

const getValue = (object, path, defaultValue) => {
	const value = get(object, path, defaultValue);

	return value === null ? defaultValue : value;
};

export default getValue;
