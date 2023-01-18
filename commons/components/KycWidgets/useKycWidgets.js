import useRequest from '@/utils/request/useRequest';
import { useSelector } from '@cogoport/front/store';
import { useEffect } from 'react';

const useKycWidgets = () => {
	const {
		profile: { partner = {}, id: user_id = '' },
	} = useSelector((state) => state);

	const { verifications = [], twin_importer_exporter_id = '' } = partner;

	const getChannelPartnerVerificationAPI = useRequest(
		'get',
		false,
		'partner',
	)('/get_channel_partner_verification');

	const { loading = false, data = [] } = getChannelPartnerVerificationAPI;

	const getChannelPartnerVerification = () => {
		const account_type = twin_importer_exporter_id
			? 'importer_exporter'
			: 'service_provider';

		const verification_data = verifications.filter(
			(verification) => verification.account_type === account_type,
		);

		if (verification_data.length === 0) return;

		getChannelPartnerVerificationAPI.trigger({
			params: {
				id: verification_data[0].id,
				filters: {
					user_id,
				},
			},
		});
	};

	useEffect(() => {
		getChannelPartnerVerification();
	}, []);

	return {
		loading,
		data,
	};
};

export default useKycWidgets;
