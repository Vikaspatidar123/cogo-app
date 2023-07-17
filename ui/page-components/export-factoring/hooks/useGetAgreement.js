import { useEffect, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

import { useRequest } from '@/packages/request';

const useGetAgreement = () => {
	const [{ loading, data }, trigger] = useRequest(
		{
			method : 'get',
			url    : '/get_ef_agreement',
		},
		{
			manual     : true,
			autoCancel : false,
		},
	);

	const getAgreement = useCallback(async (credit_id, agreement_type) => {
		try {
			await trigger({
				params: {
					credit_id,
					agreement_type,
				},
			});
		} catch (e) {
			console.error(e);
		}
	}, [trigger]);

	return {
		loading,
		data,
		getAgreement,

	};
};

export default useGetAgreement;
