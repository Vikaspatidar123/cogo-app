import { Toast } from '@cogoport/components';
import { getByKey, isEmpty, pick } from '@cogoport/utils';
import { useEffect, useState, useCallback } from 'react';

import controls from './invite-signatory-controls';

import { useForm } from '@/packages/forms';
import getApiErrorString from '@/packages/forms/utils/getApiError';
import { useRequest } from '@/packages/request';

const useSigningAuthority = ({
	channelPartnerDetails = {},
	kycDetails = {},
	setKycDetails = () => {},
}) => {
	const [selectedUser, setSelectedUser] = useState();

	const [{ loading }, getChannelPartnerUsersApi] = useRequest({
		url    : '/get_channel_partner_users',
		method : 'get',
	}, { manual: true });

	const [{ loading: updateUserApiLoading }, updateUserApi] = useRequest({
		url    : '/update_channel_partner_user',
		method : 'post',
	}, { manual: true });

	const [{ loading: inviteUserAPILoaoding }, inviteUserAPI] = useRequest({
		url    : '/create_partner_user_invitation',
		method : 'post',
	}, { manual: true });

	const { control, formProps } = useForm();

	const {
		fields = {},
		handleSubmit = () => {},
		formState = {},
		setValues = () => {},
	} = formProps;

	const getChannelPartnerUsers = useCallback(async () => {
		try {
			const params = {
				partner_id    : channelPartnerDetails.id,
				account_types : channelPartnerDetails.account_types,
			};

			const response = await getChannelPartnerUsersApi({ params });

			const usersList = pick(response, 'data.list') || [];

			if (isEmpty(usersList)) {
				return;
			}

			const signingAuthorityUser = usersList.find((user) => user.is_signing_authority);

			if (isEmpty(signingAuthorityUser || {})) {
				return;
			}

			setSelectedUser(signingAuthorityUser.user_id);
		} catch (error) {
			console.log('error :: ', error);
		}
	}, [channelPartnerDetails.account_types, channelPartnerDetails.id, getChannelPartnerUsersApi]);

	const handleChangeUser = (_, obj) => {
		setSelectedUser(obj.user_id);
	};

	const selectSigningAuthority = async () => {
		try {
			const payload = {
				partner_id           : channelPartnerDetails.id,
				user_id              : selectedUser,
				is_signing_authority : true,
				verification_id      : channelPartnerDetails.verification?.[0].id,
			};

			const response = await updateUserApi({ data: payload });

			setKycDetails({
				...kycDetails,
				verification_progress: {
					...(getByKey(kycDetails, 'verification_progress') || {}),
					...(getByKey(response, 'data.verification_progress') || {}),
				},
			});

			Toast.success('Signing Authority chosen!');
		} catch (err) {
			Toast.error(getApiErrorString(err.data));
		}
	};

	const onCreate = async (values = {}) => {
		try {
			const payload = {
				partner_id      : channelPartnerDetails.id,
				verification_id : channelPartnerDetails.verification?.[0].id,
				account_types   : channelPartnerDetails.account_types,
				user_details    : [
					{
						name                : values.name,
						mobile_country_code : values.phone_number.country_code,
						mobile_number       : values.phone_number.number,
						email               : values.email,
						work_scopes         : ['i_am_signing_authority'],
					},
				],
			};

			const response = await inviteUserAPI({ data: payload });

			setKycDetails({
				...kycDetails,
				verification_progress: {
					...(getByKey(kycDetails, 'verification_progress') || {}),
					...(getByKey(response, 'data.verification_progress') || {}),
				},
			});

			setValues({});

			Toast.success('Invitation for signatory sent successfully!');
		} catch (err) {
			Toast.error(getApiErrorString(err.data));
		}
	};

	useEffect(() => {
		getChannelPartnerUsers();
	}, [getChannelPartnerUsers]);

	return {
		usersList            : getByKey(getChannelPartnerUsersApi, 'data.list') || [],
		handleChangeUser,
		handleSubmit,
		onCreate,
		selectedUser,
		updateUserAPILoading : updateUserApiLoading,
		selectSigningAuthority,
		fields,
		formState,
		controls,
		control,
		loading,
		inviteUserAPILoading : inviteUserAPILoaoding,
	};
};

export default useSigningAuthority;
