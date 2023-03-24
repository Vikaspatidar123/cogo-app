import { Toast } from '@cogoport/components';

import { useRequest } from '@/packages/request';

const useKycIntro = ({
	verification,
	setKycDetails = () => {},
	kycDetails = {},
}) => {
	const startKYCVerificationAPI = useRequest(
		'post',
		false,
		'partner',
	)('/update_channel_partner_verification');

	const handleStartKYC = async () => {
		try {
			const body = {
				id: verification.id,
			};

			const res = await startKYCVerificationAPI.trigger({ data: body });

			setKycDetails({
				...kycDetails,
				...res.data?.verification,
				verification_progress: res.data?.verification_progress,
			});
		} catch (err) {
			Toast.error(err.data);
		}
	};

	return {
		startKYCVerificationLoading: startKYCVerificationAPI.loading,
		handleStartKYC,
	};
};

export default useKycIntro;
