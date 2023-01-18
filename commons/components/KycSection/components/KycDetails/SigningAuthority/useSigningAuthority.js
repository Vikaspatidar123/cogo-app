import { useEffect, useState } from 'react';
import { useFormCogo } from '@cogoport/front/hooks';
import useRequest from '@/utils/request/useRequest';
import { getApiErrorString } from '@cogoport/front/utils';
import { useSelector } from '@cogoport/front/store';
import { toast } from '@cogoport/front/components/admin';
import controls from './invite-signatory-controls';

const useSigningAuthority = ({ kycDetails = {}, setKycDetails = () => {} }) => {
	const {
		profile: { partner = {} },
	} = useSelector((state) => state);

	const { verifications = [], twin_importer_exporter_id = '' } = partner;

	const account_type = twin_importer_exporter_id
		? 'importer_exporter'
		: 'service_provider';

	const verification_data = verifications.filter(
		(verification) => verification.account_type === account_type,
	);

	const [selectedUser, setSelectedUser] = useState();

	const getChannelPartnerUsersAPI = useRequest(
		'get',
		true,
		'partner',
	)('/get_channel_partner_users', {
		params: { account_types: [account_type] },
	});

	const updateUserAPI = useRequest(
		'post',
		false,
		'partner',
	)('/update_channel_partner_user');

	const inviteUserAPI = useRequest(
		'post',
		false,
		'partner',
	)('/create_partner_user_invitation');

	const usersList = getChannelPartnerUsersAPI.data?.list || [];

	const formProps = useFormCogo(controls);

	const {
		fields = {},
		handleSubmit = () => {},
		formState = {},
		setValues = () => {},
	} = formProps;

	const handleChangeUser = (val, obj) => {
		setSelectedUser(obj.user_id);
	};

	const selectSigningAuthority = async () => {
		try {
			const body = {
				user_id: selectedUser,
				partner_id: partner.id,
				is_signing_authority: true,
				verification_id: verification_data[0].id,
			};

			const res = await updateUserAPI.trigger({ data: body });

			setKycDetails({
				...kycDetails,
				verification_progress:
					res.data?.verification_progress || kycDetails.verification_progress,
			});

			toast.success('Signing Authority chosen!');
		} catch (err) {
			toast.error(getApiErrorString(err.data));
		}
	};

	const onCreate = async (values = {}) => {
		try {
			const data = {
				account_types: [account_type],
				verification_id: verification_data[0].id,
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

			const res = await inviteUserAPI.trigger({ data });

			setKycDetails({
				...kycDetails,
				verification_progress: res.data?.verification_progress,
			});

			setValues({});

			toast.success('Invitation for signatory sent successfully!');
		} catch (err) {
			toast.error(getApiErrorString(err.data));
		}
	};

	useEffect(() => {
		if (usersList.length) {
			usersList.forEach((user) => {
				if (user.is_signing_authority) {
					setSelectedUser(user.user_id);
				}
			});
		}
	}, [usersList]);

	return {
		usersList,
		handleChangeUser,
		handleSubmit,
		onCreate,
		selectedUser,
		updateUserAPILoading: updateUserAPI.loading,
		selectSigningAuthority,
		fields,
		formState,
		controls,
		inviteUserAPILoading: inviteUserAPI.loading,
	};
};

export default useSigningAuthority;
