import { Toast } from '@cogoport/components';
import { useState } from 'react';

const MAPPING = {
	originId       : 'Origin Port',
	destinationId  : 'Destination Port',
	containerCount : 'Container Count',
	weight         : 'Container weight',
	volume         : 'Container volume',
	quantity       : 'Package Count',
};
const useGetRatesModal = ({ current, setCalculateCharge }) => {
	const [data, setData] = useState([]);
	const getRatesModalHandler = async () => {
		const promises = current.transport.handleSubmit();
		const details = current.details.handleSubmit();
		const product = current.product.handleSubmit();
		const promiseValues = await Promise.all([promises, details, product]);

		const check = promiseValues.map((item) => item.check);
		const error = promiseValues.map(
			(e) => e?.err !== undefined && Object.keys(e?.err),
		);
		const errKey = error.flat().filter((item) => item !== false);
		const ne = errKey.map((x) => MAPPING[x]);
		if (check.includes(true)) {
			Toast.error(`Required ${ne.join()}`);
			return false;
		}
		setData(promiseValues);
		setCalculateCharge(true);

		return true;
	};
	return {
		getRatesModalHandler, data,
	};
};

export default useGetRatesModal;
