import useRequest from '@/utils/request/useRequest';
import { useSelector } from '@cogoport/front/store';
import { toast } from '@cogoport/front/components/admin';

const useKycIntro = ({ setKycDetails = () => {}, kycDetails = {} }) => {
	const {
		profile: { partner = {} },
	} = useSelector((state) => state);

	const { verifications = [], twin_importer_exporter_id = '' } = partner;

	const startKYCVerificationAPI = useRequest(
		'post',
		false,
		'partner',
	)('/update_channel_partner_verification');

	const handleStartKYC = async () => {
		try {
			const account_type = twin_importer_exporter_id
				? 'importer_exporter'
				: 'service_provider';

			const verification_data = verifications.filter(
				(verification) => verification.account_type === account_type,
			);

			const body = {
				id: verification_data[0].id,
			};

			const res = await startKYCVerificationAPI.trigger({ data: body });

			setKycDetails({
				...kycDetails,
				...res.data?.verification,
				verification_progress: res.data?.verification_progress,
			});
		} catch (err) {
			toast.error(err.data);
		}
	};

	return {
		startKYCVerificationLoading: startKYCVerificationAPI.loading,
		handleStartKYC,
	};
};

export default useKycIntro;
