import { useEffect, useState } from 'react';
import { useFormCogo } from '@cogoport/front/hooks';
import { useRequest } from '@cogo/commons/hooks';
import { get, getApiErrorString, isEmpty } from '@cogoport/front/utils';
import { toast } from '@cogoport/front/components/admin';
import { useSelector } from '@cogo/store';
import controls from './invite-signatory-controls';

const useSigningAuthority = ({
	channelPartnerDetails = {},
	kycDetails = {},
	setKycDetails = () => {},
}) => {
	const {
		general: { scope },
	} = useSelector((state) => state);

	const [selectedUser, setSelectedUser] = useState();

	const getChannelPartnerUsersApi = useRequest(
		'get',
		false,
		scope,
	)('/get_channel_partner_users');

	const updateUserApi = useRequest(
		'post',
		false,
		scope,
	)('/update_channel_partner_user');

	const inviteUserAPI = useRequest(
		'post',
		false,
		scope,
	)('/create_partner_user_invitation');

	const formProps = useFormCogo(controls);

	const {
		fields = {},
		handleSubmit = () => {},
		formState = {},
		setValues = () => {},
	} = formProps;

	useEffect(() => {
		getChannelPartnerUsers();
	}, []);

	const getChannelPartnerUsers = async () => {
		try {
			const params = {
				partner_id: channelPartnerDetails.id,
				account_types: channelPartnerDetails.account_types,
			};

			const response = await getChannelPartnerUsersApi.trigger({ params });

			const usersList = get(response, 'data.list') || [];

			if (isEmpty(usersList)) {
				return;
			}

			const signingAuthorityUser = usersList.find((user) => {
				return user.is_signing_authority;
			});

			if (isEmpty(signingAuthorityUser || {})) {
				return;
			}

			setSelectedUser(signingAuthorityUser.user_id);
		} catch (error) {
			console.log('error :: ', error);
		}
	};

	const handleChangeUser = (_, obj) => {
		setSelectedUser(obj.user_id);
	};

	const selectSigningAuthority = async () => {
		try {
			const payload = {
				partner_id: channelPartnerDetails.id,
				user_id: selectedUser,
				is_signing_authority: true,
				verification_id: channelPartnerDetails.verification?.[0].id,
			};

			const response = await updateUserApi.trigger({ data: payload });

			setKycDetails({
				...kycDetails,
				verification_progress: {
					...(get(kycDetails, 'verification_progress') || {}),
					...(get(response, 'data.verification_progress') || {}),
				},
			});

			toast.success('Signing Authority chosen!');
		} catch (err) {
			toast.error(getApiErrorString(err.data));
		}
	};

	const onCreate = async (values = {}) => {
		try {
			const payload = {
				partner_id: channelPartnerDetails.id,
				verification_id: channelPartnerDetails.verification?.[0].id,
				account_types: channelPartnerDetails.account_types,
				user_details: [
					{
						name: values.name,
						mobile_country_code: values.phone_number.country_code,
						mobile_number: values.phone_number.number,
						email: values.email,
						work_scopes: ['i_am_signing_authority'],
					},
				],
			};

			const response = await inviteUserAPI.trigger({ data: payload });

			setKycDetails({
				...kycDetails,
				verification_progress: {
					...(get(kycDetails, 'verification_progress') || {}),
					...(get(response, 'data.verification_progress') || {}),
				},
			});

			setValues({});

			toast.success('Invitation for signatory sent successfully!');
		} catch (err) {
			toast.error(getApiErrorString(err.data));
		}
	};

	return {
		usersList: get(getChannelPartnerUsersApi, 'data.list') || [],
		handleChangeUser,
		handleSubmit,
		onCreate,
		selectedUser,
		updateUserAPILoading: updateUserApi.loading,
		selectSigningAuthority,
		fields,
		formState,
		controls,
		inviteUserAPILoading: inviteUserAPI.loading,
	};
};

export default useSigningAuthority;
