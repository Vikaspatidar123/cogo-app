/* eslint-disable react-hooks/exhaustive-deps */
import { upperCase } from '@cogoport/utils';
import { useEffect, useMemo } from 'react';

import { useRequest } from '@/packages/request';

const useGetGstInListByPan = ({ registrationNumber = '', action }) => {
	const [{ loading, data }, getCogoScoreTaxNumApi] = useRequest({
		url    : 'get_cogoscore_tax_numbers',
		method : 'get',
	}, { manual: true });

	const params = {
		registration_number: (registrationNumber || '').toUpperCase(),
	};

	useEffect(() => {
		if (action === 'edit' || (registrationNumber || '').length !== 10) {
			return;
		}

		getCogoScoreTaxNumApi({ params });
	}, [registrationNumber]);

	const defaultSelectOption = 'gst_not_found';

	const gstinList = ((data || {}).data || {}).gsts || [];

	if (!gstinList.includes(defaultSelectOption)) {
		gstinList.push(defaultSelectOption);
	}

	const gstinOptions = useMemo(() => gstinList.map((gstin) => (gstin === 'gst_not_found'
		? { label: upperCase(gstin), value: gstin }
		: { label: gstin, value: gstin })), [gstinList.length]);

	return {
		gstinOptions,
		getCogoScoreTaxNumApi,
		loading,
	};
};

export default useGetGstInListByPan;
