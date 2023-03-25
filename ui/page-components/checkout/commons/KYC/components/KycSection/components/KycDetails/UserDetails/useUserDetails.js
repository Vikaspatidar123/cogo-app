import { Toast } from '@cogoport/components';
import { getByKey, isEmpty } from '@cogoport/utils';
import { useEffect, useState } from 'react';

import controls from './get-user-controls';

import { useForm } from '@/packages/forms';
import getApiErrorString from '@/packages/forms/utils/getApiError';
import { useRequest } from '@/packages/request';

const useUserDetails = ({
	channelPartnerDetails = {},
	kycDetails = {},
	setKycDetails = () => {},
}) => {
	const [selectedUser, setSelectedUser] = useState({});
	const [showMobileVerificationModal, setShowMobileVerificationModal] = useState(null);

	const [{ loading }, getChannelPartnerUsersApi] = useRequest({
		url    : '/get_channel_partner_users',
		method : 'get',
	}, { manual: true });

	const [{ loading }, updateChannelPartnerVerificationApi] = useRequest({
		url    : '/update_channel_partner_verification',
		method : 'post',
	}, { manual: true });

	const [{ loading : resendApiLoading}, resendEmailVerificationMailApi] = useRequest({
		url    : '/resend_channel_partner_user_verification_email',
		method : 'post',
	}, { manual: true });


	const [{ loading: createChannelApiLoading }, createChannelPartnerVerificationDocumentApi] = useRequest({
		url    : '/create_channel_partner_document',
		method : 'post',
	}, { manual: true });

	const [{ loading }, getOrganizationDocumentsApi] = useRequest({
		url    : '/create_channel_partner_document',
		method : 'get',
	}, { manual: true });



	const {
		fields = {},
		handleSubmit = () => {},
		formState = {},
		setValue = () => {},
	} = useForm(controls);

	useEffect(() => {
		getChannelPartnerUsers();
	}, []);

	useEffect(() => {
		if (isEmpty(selectedUser)) {
			return;
		}

		getOrganizationDocuments();
	}, [selectedUser]);

	const getChannelPartnerUsers = async () => {
		try {
			const response = await getChannelPartnerUsersApi({
				params: {
					partner_id    : channelPartnerDetails.id,
					account_types : channelPartnerDetails.account_types,
				},
			});

			const usersList = getByKey(response, 'data.list') || [];

			const { kyc_submitted_for_user_id: kycSubmittedForUserId = '' } =				kycDetails;
			if (!kycSubmittedForUserId) {
				return;
			}

			const userObj = usersList.find((user) => user.user_id === kycSubmittedForUserId);

			if (isEmpty(userObj || {})) {
				return;
			}

			setSelectedUser(userObj);
		} catch (error) {
			console.log('error :: ', error);
		}
	};

	const handleChangeUser = async (_, obj) => {
		setSelectedUser(obj);

		const payload = {
			id                        : channelPartnerDetails.verification?.[0].id,
			kyc_submitted_for_user_id : obj.user_id,
		};

		const response = await updateChannelPartnerVerificationApi({
			data: payload,
		});

		setKycDetails((previousState) => ({
			...(previousState || {}),
			...(getByKey(response, 'data.verification') || {}),
			verification_progress: {
				...(previousState.verification_progress || {}),
				...(getByKey(response, 'data.verification_progress') || {}),
			},
		}));
	};

	const getOrganizationDocuments = async () => {
		try {
			const response = await getOrganizationDocumentsApi({
				params: {
					partner_id    : channelPartnerDetails.id,
					account_types : channelPartnerDetails.account_types,
					filters       : {
						user_id       : selectedUser.user_id,
						document_type : 'user_id_proof',
					},
				},
			});

			const documentUrl = getByKey(response, 'data[0].image_url') || '';

			if (!documentUrl) {
				return;
			}

			setValue('user_id_proof', {
				name : decodeURIComponent(documentUrl.split('/').pop()),
				url  : documentUrl,
				uid  : documentUrl,
			});
		} catch (error) {
			console.log('error :: ', error);
		}
	};

	const verifyEmailId = async () => {
		try {
			const params = {
				partner_id : channelPartnerDetails.id,
				user_id    : selectedUser.user_id,
			};

			await resendEmailVerificationMailApi({ params });

			Toast.success(
				`Verification Email sent to "${selectedUser.email}" successfully!`,
			);
		} catch (error) {
			Toast.error(getApiErrorString(error.data));
		}
	};

	const onSubmit = async (values = {}) => {
		try {
			const {
				verification = [],
				twin_importer_exporter_id = '',
				twin_service_provider_id = '',
			} = channelPartnerDetails;

			const accountTypes = [
				twin_importer_exporter_id ? 'importer_exporter' : '',
				twin_service_provider_id ? 'service_provider' : '',
			].filter((accountType) => accountType);

			const payload = {
				partner_id      : channelPartnerDetails.id,
				user_id         : selectedUser.user_id,
				account_types   : accountTypes,
				name            : 'Photo ID Proof',
				document_type   : 'user_id_proof',
				image_url       : getByKey(values, 'user_id_proof.url'),
				verification_id : verification?.[0].id,
			};

			const response = await createChannelPartnerVerificationDocumentApi({
				data: payload,
			});

			setKycDetails({
				...kycDetails,
				verification_progress: {
					...(getByKey(kycDetails, 'verification_progress') || {}),
					...(getByKey(response, 'data.verification_progress') || {}),
				},
			});

			Toast.success('Details updated!');
		} catch (err) {
			Toast.error(getApiErrorString(err.data));
		}
	};

	return {
		usersList: getByKey(getChannelPartnerUsersApi, 'data.list') || [],
		selectedUser,
		handleChangeUser,
		setShowMobileVerificationModal,
		showMobileVerificationModal,
		fields,
		formState,
		handleSubmit,
		onSubmit,
		controls,
		createChannelPartnerVerificationDocumentLoading:
		createChannelApiLoading.loading,
		verifyEmailId,
		loadingResendEmail: resendApiLoading.loading,
	};
};

export default useUserDetails;
