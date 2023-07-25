import { Toast } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import GLOBAL_CONSTANTS from '../../../commons/constants/globals';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useCreateDunningUserInvitationNew = () => {
	const { general } = useSelector((state) => state);
	const { query } = general;
	const { token } = query || {};

	const [showSuccessPage, setShowSuccessPage] = useState(false);

	const [{ loading }, trigger] = useRequest(
		{
			url    : '/payments/dunning/create-dunning-relevant-user',
			method : 'post',
		},
		{ manual: true },
	);

	const createDunningUserInvitation = async (val) => {
		const { email, name, mobile_number, work_scopes } = val || {};
		const { number, country_code } = mobile_number || {};
		if (isEmpty(email) || isEmpty(name) || isEmpty(work_scopes) || isEmpty(number)
		|| isEmpty(country_code)) {
			Toast.error('Please Fill All The Fields');
		} else {
			try {
				const payload = {
					userToken         : token,
					email,
					name,
					mobileNumber      : number,
					mobileCountryCode : country_code,
					workScopes        : [work_scopes],
				};
				await trigger({
					data: payload,
				});
				setShowSuccessPage(true);
			} catch (error) {
				if (error?.error?.user) {
					Toast.error(error?.error?.user?.[GLOBAL_CONSTANTS.zeroth_index]);
				} else {
					Toast.error(error?.message);
				}
			}
		}
	};

	return {
		loading,
		createDunningUserInvitation,
		showSuccessPage,
	};
};

export default useCreateDunningUserInvitationNew;
