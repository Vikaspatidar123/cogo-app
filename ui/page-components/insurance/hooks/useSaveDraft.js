import { Toast } from '@cogoport/components';
import { useSelector } from 'react-redux';

import { useRequestBf } from '@/packages/request';

const useSaveDraft = ({
	setDraftModal = () => {},
	type = '',
	policyId = '',
	activeTab = '',
	uploadType = '',
	countryCode = '',
	insuranceType = [],
}) => {
	const { profile } = useSelector((state) => state);
	const { id, organization } = profile;
	const [{ data, loading }, trigger] = useRequestBf(
		{
			method  : 'post',
			authKey : 'post_saas_insurance_draft',
			url     : '/saas/insurance/draft',
		},
		{ manual: true },
	);
	const response = async (draftPayload, policyid) => {
		const {
			aadharNumber = '',
			gstin = '',
			panNumber = '',
			...rest
		} = draftPayload || {};
		try {
			const resp = await trigger({
				data: {
					policyId       : policyid || policyId,
					policyType     : countryCode === 'IN' ? 'INLAND' : activeTab,
					userId         : id,
					organizationId : organization?.id,
					source         : 'SAAS',
					transitMode    : type === 'Ocean' ? 'SEA' : type.toUpperCase(),
					...rest,
					billingType    : uploadType,
					aadharNumber   : aadharNumber === '' ? undefined : aadharNumber,
					gstin          : gstin === '' ? undefined : gstin,
					panNumber      : panNumber === '' ? undefined : panNumber,
					policyForSelf  : insuranceType[0] === 'SELF',
				},
			});

			if (resp?.data) {
				setDraftModal(true);
			}
		} catch (error) {
			Toast.error(error?.error?.message);
		}
	};
	return {
		draftResponse : response,
		draftLoading  : loading,
		policyIdDraft : data?.data?.id,
	};
};

export default useSaveDraft;
