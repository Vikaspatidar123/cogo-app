import { useState } from 'react';
import { useRequest } from '@cogo/commons/hooks';
import { getApiErrorString } from '@cogoport/front/utils';
import { toast } from '@cogoport/front/components/admin';

const useDeclaration = ({
	source,
	setShow = () => {},
	onClose = () => {},
	channelPartnerDetails = {},
	setKycDetails = () => {},
	kycDetails = {},
}) => {
	const { verification = [], id } = channelPartnerDetails;

	const api = useRequest(
		'post',
		false,
		'partner',
	)('/submit_channel_partner_kyc');

	const [showData, setShowData] = useState(true);
	const [checked, setChecked] = useState(() => {
		return !!kycDetails.declaration_accepted_at;
	});

	const handleSubmitKyc = async () => {
		if (!checked) {
			toast.warn('Please accept declaration first!');

			return;
		}

		try {
			const response = await api.trigger({
				data: {
					id,
					verification_id: verification?.[0].id,
					kyc_submitted_from: source,
				},
			});

			setKycDetails({
				...kycDetails,
				kyc_status: response.data?.kyc_status || kycDetails.kyc_status,
			});

			toast.success('KYC Submitted Successfully!');

			setShow?.(false);
			onClose?.();
		} catch (err) {
			toast.error(getApiErrorString(err.data));
		}
	};

	const { verification_progress } = kycDetails;

	const disableSubmitButton =
		Object.values(verification_progress || {}).includes('incomplete') ||
		!checked;

	return {
		showData,
		setChecked,
		setShowData,
		checked,
		handleSubmitKyc,
		disableSubmitButton,
		apiLoading: api.loading,
	};
};

export default useDeclaration;
