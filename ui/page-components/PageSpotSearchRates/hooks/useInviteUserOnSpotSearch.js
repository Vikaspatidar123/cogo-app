import { Toast } from '@cogoport/components';
import { useCallback } from 'react';

import getApiErrorString from '@/packages/forms/utils/getApiError';
import { useRequest } from '@/packages/request';

const emptyFunction = () => { };

const useInviteUserOnSpotSearch = ({
	reset = emptyFunction,
	searchIds = {},
	setStatus = emptyFunction,
}) => {
	const { spot_search_id = '', rate_card_id = '' } = searchIds || {};

	const [{ loading }, trigger] = useRequest({
		url    : '/communication/invite_user_on_whatsapp',
		method : 'POST',
	}, { manual: true, autoCancel: false });

	const inviteUser = useCallback(async (values) => {
		const { country_code, mobile_number, full_name, email } = values || {};
		const autoFormattedCode = country_code?.slice(1) || '';
		const autoMobileNumber = mobile_number;
		const fullName = full_name;
		const emailAddress = email;

		try {
			await trigger({
				data: {
					auth_token      : process.env.NEXT_PUBLIC_COGOVERSE_AUTH_TOKEN,
					whatsapp_number : autoMobileNumber,
					country_code    : autoFormattedCode,
					spot_search_id,
					rate_card_id,
					name            : fullName,
					email           : emailAddress,
					invitations     : ['email', 'whatsapp'],
					utm_source     	: 'public_page',
					utm_medium     	: 'rate_discovery',
				},
			});
			reset();
			setStatus(true);
		} catch (err) {
			Toast.error(getApiErrorString(err?.response?.data?.error));
		}
	}, [trigger, spot_search_id, rate_card_id, reset, setStatus]);

	return {
		inviteUser,
		loading,
	};
};

export default useInviteUserOnSpotSearch;
