import { useEffect, useState } from 'react';
import { useSelector } from '@cogoport/front/store';
import useRequest from '@/utils/request/useRequest';

const useKycSection = () => {
	const {
		profile: { partner = {}, id: user_id = '' },
	} = useSelector((state) => state);

	const { verifications = [], twin_importer_exporter_id = '' } = partner;

	const [kycDetails, setKycDetails] = useState({});

	const getChannelPartnerVerificationAPI = useRequest(
		'get',
		false,
	)('/get_channel_partner_verification');

	const getChannelPartnerVerification = async () => {
		const account_type = twin_importer_exporter_id
			? 'importer_exporter'
			: 'service_provider';

		const verification_data = verifications.filter((verification) => {
			return verification.account_type === account_type;
		});

		const res = await getChannelPartnerVerificationAPI.trigger({
			params: {
				id: verification_data[0].id,
				filters: {
					user_id,
				},
			},
		});

		setKycDetails(res.data);
	};

	useEffect(() => {
		getChannelPartnerVerification();
	}, []);

	return {
		kycDetails,
		setKycDetails,
		loading: getChannelPartnerVerificationAPI.loading,
	};
};

export default useKycSection;
