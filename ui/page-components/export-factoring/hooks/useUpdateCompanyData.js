import { useCallback } from 'react';

import { useRequest } from '@/packages/request';

const useUpdateCompanyData = ({
	setAction = () => {},
	getCreditRequestResponse = {},
}) => {
	const [{ loading, data }, trigger] = useRequest({
		method : 'post',
		url    : '/update_credit',
	}, {
		autoCancel: false,
	});

	const updateCompanyData = useCallback(async ({ type }) => {
		try {
			await trigger({
				data: {
					credit_id: getCreditRequestResponse?.id,

				},
			});
			setAction(type);
		} catch (e) {
			setAction('removed');
			console.error(e);
		}
	}, [getCreditRequestResponse?.id, setAction, trigger]);

	return { updateCompanyData, loading, data };
};

export default useUpdateCompanyData;
