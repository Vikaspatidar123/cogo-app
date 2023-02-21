import { useEffect, useMemo } from 'react';

import { useRequest } from '@/packages/request';

const useGetGstInListByPan = ({ registrationNumber = '' }) => {
	const [{ data }, trigger] = useRequest({
		url    : '/get_cogoscore_tax_numbers',
		method : 'get',
	}, { manual: false });
	const params = { registration_number: registrationNumber.toUpperCase() };
	console.log(params, 'params');
	useEffect(() => {
		if (registrationNumber.length !== 10) {
			return;
		}
		trigger({ params });
	}, [registrationNumber || params]);

	const gstinList = data?.data?.gsts || [];
	console.log(data, 'data');
	const gstinOptions = useMemo(() => gstinList?.map((gstin) => ({ label: gstin, value: gstin })), [gstinList.length]);

	return {
		gstinOptions,
	};
};

export default useGetGstInListByPan;
