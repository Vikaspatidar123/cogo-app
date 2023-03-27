import { getByKey } from '@cogoport/utils';
import { useEffect, useState, useCallback } from 'react';

import { useRequest } from '@/packages/request';

const useKycSection = ({ channelPartnerDetails = {} }) => {
	const [kycDetails, setKycDetails] = useState({});

	const [{ loading }, trigger] = useRequest({
		url    : '/get_channel_partner_verification',
		method : 'get',
	}, { manual: true });

	const getChannelPartnerVerification = useCallback(async () => {
		const response = await trigger({
			params: {
				id: getByKey(channelPartnerDetails, 'verification[0].id'),
			},
		});

		setKycDetails(getByKey(response, 'data') || {});
	}, [channelPartnerDetails, trigger]);

	useEffect(() => {
		getChannelPartnerVerification();
	}, [getChannelPartnerVerification]);

	return {
		kycDetails,
		setKycDetails,
		loading,
	};
};

export default useKycSection;
