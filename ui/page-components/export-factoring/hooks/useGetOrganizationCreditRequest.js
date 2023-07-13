import { useEffect, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

import { useRequest } from '@/packages/request';
// import { useSelector } from '@/packages/store';

const useGetOrganizationCreditRequest = () => {
	const [active, setActive] = useState('');

	const { organization } = useSelector((state) => ({
		organization: state.profile.organization,
	}));

	const [{ loading, data }, trigger] = useRequest(
		{
			method : 'get',
			url    : '/get_credit',
		},
		{
			manual     : true,
			autoCancel : false,
		},
	);

	const getOrganizationCreditRequest = useCallback(async () => {
		try {
			await trigger({
				params: {
					organization_id : organization?.id,
					// organization_id : 'd7a6df4b-a229-4e4b-b1db-a64eaf763597',
					// organization_id : '3d7c2e98-14e2-4a05-8104-a133eddc8eb6',
					category        : 'export_factoring',
				},
			});
			setActive(data?.status);
		} catch (e) {
			setActive('awaiting_user_inputs');
		}
	}, [data?.status, trigger]);

	useEffect(() => {
		getOrganizationCreditRequest();
	}, [getOrganizationCreditRequest]);

	return {
		loading,
		data,
		getOrganizationCreditRequest,
		active,
	};
};

export default useGetOrganizationCreditRequest;
