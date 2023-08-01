import { Toast } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
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
		const errors = [];

		const promises = current.transport.handleSubmit();
		const details = current.details.handleSubmit();
		const product = current.product.handleSubmit();
		const promiseValues = await Promise.all([promises, details, product]);

		promiseValues.forEach((value) => {
			if (value?.check && value?.err) {
				errors.push(Object.keys(value?.err));
			}
		});

		const err = errors.flat().map((name) => MAPPING[name]);

		if (!current.date) {
			Toast.error('Please enter Expiry Date');
			return false;
		}

		if (!isEmpty(errors)) {
			Toast.error(`Please enter  ${err.join(', ')}`);
			return false;
		}
		setData([...promiseValues, { expiryDate: current.date }]);
		setCalculateCharge(true);

		return true;
	};
	return {
		getRatesModalHandler, data,
	};
};

export default useGetRatesModal;
