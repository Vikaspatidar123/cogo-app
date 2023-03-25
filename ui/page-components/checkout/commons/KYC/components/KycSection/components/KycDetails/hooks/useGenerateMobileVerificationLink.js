import { Toast } from '@cogoport/components';
import { copyToClipboard } from '@cogoport/utils';
import { useEffect } from 'react';

import getApiErrorString from '@/packages/forms/utils/getApiError';
import { useRequest } from '@/packages/request';

const useGenerateMobileVerificationLink = ({ user_id = '' }) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/generate_mobile_verification_link',
		method : 'post',
	}, { manual: true });

	const generateVerificationLink = async () => {
		try {
			await trigger({
				data: {
					user_id,
				},
			});

			Toast.success('Mobile Verification Link Generated Successfully!');
		} catch (error) {
			Toast.error(getApiErrorString(error.data));
		}
	};

	const { mobile_number_verification_link: mobileVerificationLink = '' } = data;

	useEffect(() => {
		if (mobileVerificationLink) {
			copyToClipboard(mobileVerificationLink);

			Toast.success('Link Copied to Clipboard');
		}
	}, [mobileVerificationLink]);

	return {
		generateVerificationLink,
		loadingMobileVerificationLink: loading,
		mobileVerificationLink,
	};
};

export default useGenerateMobileVerificationLink;
