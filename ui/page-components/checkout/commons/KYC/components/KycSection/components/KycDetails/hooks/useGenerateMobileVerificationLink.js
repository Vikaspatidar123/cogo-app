import { useRequest } from '@cogo/commons/hooks';
import { useSelector } from '@cogo/store';
import { toast } from '@cogoport/front/components/admin';
import { getApiErrorString } from '@cogoport/front/utils';
import copyToClipboard from '@cogo/utils/copyToClipboard';
import { useEffect } from 'react';

const useGenerateMobileVerificationLink = ({ user_id = '' }) => {
	const {
		general: { scope },
	} = useSelector((state) => state);

	const generateMobileVerificationLinkApi = useRequest(
		'post',
		false,
		scope,
	)('/generate_mobile_verification_link');

	const generateVerificationLink = async () => {
		try {
			await generateMobileVerificationLinkApi.trigger({
				data: {
					user_id,
				},
			});

			toast.success('Mobile Verification Link Generated Successfully!');
		} catch (error) {
			toast.error(getApiErrorString(error.data));
		}
	};

	const { loading: loadingMobileVerificationLink = false, data = {} } =
		generateMobileVerificationLinkApi;

	const { mobile_number_verification_link: mobileVerificationLink = '' } = data;

	useEffect(() => {
		if (mobileVerificationLink) {
			copyToClipboard(mobileVerificationLink);

			toast.success('Link Copied to Clipboard');
		}
	}, [mobileVerificationLink]);

	return {
		generateVerificationLink,
		loadingMobileVerificationLink,
		mobileVerificationLink,
	};
};

export default useGenerateMobileVerificationLink;
