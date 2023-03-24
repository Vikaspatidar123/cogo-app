import { useRequest } from '@cogo/commons/hooks';
import { useSelector } from '@cogo/store';
import { toast } from '@cogoport/front/components/admin';
import { getApiErrorString } from '@cogoport/front/utils';

const useSendMobileVerificationEmail = ({ user_id = '' }) => {
	const {
		general: { scope },
	} = useSelector((state) => state);

	const sendMobileVerificationEmailApi = useRequest(
		'post',
		false,
		scope,
	)('/send_mobile_verification_email');

	const sendVerificationLink = async () => {
		try {
			await sendMobileVerificationEmailApi.trigger({
				data: {
					user_id,
				},
			});

			toast.success('Mobile Verification Link Sent Successfully!');
		} catch (error) {
			toast.error(getApiErrorString(error.data));
		}
	};

	return {
		sendVerificationLink,
	};
};

export default useSendMobileVerificationEmail;
