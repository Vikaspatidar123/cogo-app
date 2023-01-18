import { useEffect, useState } from 'react';
import { toast } from '@cogoport/front/components';
import { useFormCogo } from '@cogoport/front/hooks';
import { useSelector } from '@cogoport/front/store';
import { getApiErrorString } from '@cogoport/front/utils';
import useRequest from '@/utils/request/useRequest';
import controls from './get-user-controls.js';

const useUserDetails = ({ setKycDetails = () => {}, kycDetails = {} }) => {
	const {
		profile = {},
		general: { isMobile },
	} = useSelector((state) => state);

	const { partner = {} } = profile;

	const {
		twin_importer_exporter_id = '',
		twin_service_provider_id = '',
		verifications = [],
		company_type,
	} = partner;

	const [showMobileVerificationModal, setShowMobileVerificationModal] =
		useState(null);

	const account_type = twin_importer_exporter_id
		? 'importer_exporter'
		: 'service_provider';

	const getAccountType = () => {
		return [
			twin_importer_exporter_id ? 'importer_exporter' : '',
			twin_service_provider_id ? 'service_provider' : '',
		].filter((accountType) => accountType);
	};

	const resendEmailVerificationMailAPI = useRequest(
		'post',
		false,
		'partner',
	)(`/resend_channel_partner_user_verification_email`);

	const createChannelPartnerVerificationDocumentAPI = useRequest(
		'post',
		false,
		'partner',
	)('/create_channel_partner_document');

	const getOrganizationDocumentsAPI = useRequest(
		'get',
		['partnership', 'proprietorship'].includes(company_type),
		'partner',
	)('/get_channel_partner_documents', {
		params: {
			account_types: [account_type],
			filters: {
				document_type: 'user_id_proof',
				status: 'active',
			},
		},
	});

	const {
		fields = {},
		handleSubmit = () => {},
		formState = {},
		setValue = () => {},
		setError = () => {},
	} = useFormCogo(controls);

	const { data = [] } = getOrganizationDocumentsAPI;

	useEffect(() => {
		setValue('user_id_proof', data?.[0]?.image_url);

		if (data[0]?.rejection_reason) {
			setError('user_id_proof', {
				type: 'custom',
				message: `Reason of rejection : ${data[0]?.rejection_reason}`,
			});
		}
	}, [data]);

	const verifyEmailId = async () => {
		try {
			await resendEmailVerificationMailAPI?.trigger();

			toast.success(
				`Verification Email sent to "${profile.email}" successfully!`,
			);
		} catch (error) {
			toast.error(getApiErrorString(error.data));
		}
	};

	const onSubmit = async (values = {}) => {
		try {
			const verification_data = verifications.filter(
				(verification) => verification.account_type === account_type,
			);

			const body = {
				account_types: getAccountType(),
				name: 'Photo ID Proof',
				document_type: 'user_id_proof',
				image_url: values.user_id_proof.url,
				verification_id: verification_data[0].id,
			};

			const res = await createChannelPartnerVerificationDocumentAPI.trigger({
				data: body,
			});

			setKycDetails({
				...kycDetails,
				verification_progress:
					res.data?.verification_progress || kycDetails.verification_progress,
			});

			toast.success('Details updated!');
		} catch (err) {
			toast.error(getApiErrorString(err.data));
		}
	};

	return {
		isMobile,
		profile,
		setShowMobileVerificationModal,
		showMobileVerificationModal,
		fields,
		formState,
		handleSubmit,
		onSubmit,
		controls,
		company_type,
		loading: createChannelPartnerVerificationDocumentAPI.loading,
		verifyEmailId,
	};
};

export default useUserDetails;
