import { Toast } from '@cogoport/components';
import { useState, useEffect } from 'react';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useGetOrganizationOutstandings = () => {
	const { registration_number, kyc_status } = useSelector(
		({ profile }) => ({
			registration_number: profile?.organization?.registration_number,
			kyc_status: profile?.organization?.kyc_status,
		}),
	);

	const triggerApi = kyc_status === 'verified' && registration_number !== null;

	const [statsList, setStatsList] = useState([]);

	const [{ loading }, trigger] = useRequest(
		{
			url: '/list_sage_ar_outstandings',
			method: 'get',
			autoCancel: true,
		},
		{ manual: true },
	);

	const params = {
		filters: {
			registration_number: registration_number || undefined,
		},
	};

	const organizationOutstandings = async () => {
		try {
			const res = await trigger({ params });

			if (res?.data) {
				setStatsList(res?.data);
			}
		} catch (err) {
			Toast.error(err?.message || 'Could not fetch organization outstandings.');
		}
	};

	useEffect(() => {
		if (triggerApi) {
			organizationOutstandings();
		}
	}, []);

	return {
		statsList,
		setStatsList,
		organizationOutstandings,
		statsLoading: loading,
	};
};

export default useGetOrganizationOutstandings;
