import { useEffect, useState } from 'react';

import { useRequest } from '@/packages/request';

const useKycSection = ({ channelPartnerDetails = {} }) => {
	const [kycDetails, setKycDetails] = useState({});

	const api = useRequest(
		'get',
		false,
		'partner',
	)('/get_channel_partner_verification');

	const getChannelPartnerVerification = async () => {
		const response = await api.trigger({
			params: {
				// id: get(channelPartnerDetails, 'verification[0].id'),
			},
		});

		// setKycDetails(get(response, 'data') || {});
	};

	useEffect(() => {
		getChannelPartnerVerification();
	}, []);

	return {
		kycDetails,
		setKycDetails,
		loading: api.loading,
	};
};

export default useKycSection;
