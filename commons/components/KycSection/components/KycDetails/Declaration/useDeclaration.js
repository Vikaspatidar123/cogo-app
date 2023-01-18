import { useState } from 'react';
import useRequest from '@/utils/request/useRequest';
import { getApiErrorString } from '@cogoport/front/utils';
import { toast } from '@cogoport/front/components/admin';
import { useDispatch, useSelector } from '@cogoport/front/store';
import { setProfileStoreState } from '@/utils/stores';

const useDeclaration = ({ setKycDetails = () => {}, kycDetails = {} }) => {
	const {
		profile: { partner = {} },
	} = useSelector((state) => state);

	const { verifications = [], twin_importer_exporter_id = '' } = partner;

	const dispatch = useDispatch();

	const [checked, setChecked] = useState(() => {
		return kycDetails.declaration_accepted_at || false;
	});

	const submitKycAPI = useRequest('post', false)('/submit_channel_partner_kyc');

	const handleSubmitKyc = async () => {
		if (!checked) {
			toast.warn('Please accept declaration first!');

			return;
		}

		try {
			const account_type = twin_importer_exporter_id
				? 'importer_exporter'
				: 'service_provider';

			const verification_data = verifications.filter(
				(verification) => verification.account_type === account_type,
			);

			const res = await submitKycAPI.trigger({
				data: {
					verification_id: verification_data[0].id,
					kyc_submitted_from: 'cp_lsp_kyc_page',
				},
			});

			const newVerifications = verifications.map((verification) => ({
				...verification,
				kyc_status: 'pending_verification',
			}));

			dispatch(
				setProfileStoreState({
					partner: {
						...partner,
						verifications: newVerifications,
					},
				}),
			);

			setKycDetails({
				...kycDetails,
				kyc_status: res.data?.kyc_status || kycDetails.kyc_status,
			});

			toast.success('KYC Submitted Successfully!');
		} catch (err) {
			toast.error(getApiErrorString(err.data));
		}
	};

	const disableSubmitButton =
		Object.values(kycDetails?.verification_progress || {}).includes(
			'incomplete',
		) || !checked;

	return {
		setChecked,
		checked,
		handleSubmitKyc,
		disableSubmitButton,
		submitKycAPILoading: submitKycAPI.loading,
	};
};

export default useDeclaration;
