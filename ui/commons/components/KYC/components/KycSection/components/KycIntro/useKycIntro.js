import { Toast } from '@cogoport/components';

import { useRequest } from '@/packages/request';

const useKycIntro = ({
	verification,
	setKycDetails = () => {},
	kycDetails = {},
}) => {
	const [{ loading }, startKYCVerificationAPI] = useRequest({
		url    : '/update_channel_partner_verification',
		method : 'post',
	}, { manual: true });

	const handleStartKYC = async () => {
		try {
			const body = {
				id: verification.id,
			};

			const res = await startKYCVerificationAPI({ data: body });

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
		startKYCVerificationLoading: loading,
		handleStartKYC,
	};
};

export default useKycIntro;
