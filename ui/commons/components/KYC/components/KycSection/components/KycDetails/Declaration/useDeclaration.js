import { Toast } from '@cogoport/components';
import { useState } from 'react';

import getApiErrorString from '@/packages/forms/utils/getApiError';
import { useRequest } from '@/packages/request';

const useDeclaration = ({
	source,
	setShow = () => {},
	onClose = () => {},
	channelPartnerDetails = {},
	setKycDetails = () => {},
	kycDetails = {},
}) => {
	const { verification = [], id } = channelPartnerDetails;

	const [{ loading }, trigger] = useRequest({
		url    : '/submit_channel_partner_kyc',
		method : 'post',
	}, { manual: true });

	const [showData, setShowData] = useState(true);
	const [checked, setChecked] = useState(() => !!kycDetails.declaration_accepted_at);

	const handleSubmitKyc = async () => {
		if (!checked) {
			Toast.warn('Please accept declaration first!');

			return;
		}

		try {
			const response = await trigger({
				data: {
					id,
					verification_id    : verification?.[0].id,
					kyc_submitted_from : source,
				},
			});

			setKycDetails({
				...kycDetails,
				kyc_status: response.data?.kyc_status || kycDetails.kyc_status,
			});

			Toast.success('KYC Submitted Successfully!');

			setShow?.(false);
			onClose?.();
		} catch (err) {
			Toast.error(getApiErrorString(err.data));
		}
	};

	const { verification_progress } = kycDetails;

	const disableSubmitButton =		Object.values(verification_progress || {}).includes('incomplete')
		|| !checked;

	return {
		showData,
		setChecked,
		setShowData,
		checked,
		handleSubmitKyc,
		disableSubmitButton,
		apiLoading: loading,
	};
};

export default useDeclaration;
