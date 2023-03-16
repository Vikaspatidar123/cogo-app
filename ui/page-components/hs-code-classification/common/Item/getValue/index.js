import { getByKey } from '@cogoport/utils';

import iterateSubKeys from '../iterate-object';

const getValue = (config, data, newRenderFunction) => {
	let val = getByKey(data, config.key);
	val = iterateSubKeys(config, val);

	if (config.func) {
		val = newRenderFunction[config.func](data, config);
	} else {
		val = data[config.key];
	}
	return val;
};

export default getValue;
