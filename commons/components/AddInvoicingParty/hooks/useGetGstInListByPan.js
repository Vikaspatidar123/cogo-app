import { useEffect, useMemo } from 'react';
import useRequest from '@/temp/request/useRequest';
import getValue from '@/commons/utils/getValue';

const useGetGstInListByPan = ({ registrationNumber = '' }) => {
	const getCogoScoreTaxNumApi = useRequest(
		'get',
		false,
	)('/get_cogoscore_tax_numbers');

	const params = { registration_number: registrationNumber.toUpperCase() };

	useEffect(() => {
		if (registrationNumber.length !== 10) {
			return;
		}

		getCogoScoreTaxNumApi.trigger({ params });
	}, [registrationNumber]);

	const gstinList = getValue(getCogoScoreTaxNumApi, 'data.data.gsts', []);

	const gstinOptions = useMemo(() => {
		return gstinList.map((gstin) => ({ label: gstin, value: gstin }));
	}, [gstinList.length]);

	return {
		gstinOptions,
	};
};

export default useGetGstInListByPan;
