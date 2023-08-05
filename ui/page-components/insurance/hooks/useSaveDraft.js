import { Toast } from '@cogoport/components';

import { useRequestBf } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useSaveDraft = ({
	setDraftModal = () => {},
	type = '',
	policyId = '',
	activeTab = '',
	uploadType = '',
	countryCode = '',
	insuranceType = [],
	organizationAddress = {},
}) => {
	const { profile } = useSelector((state) => state);
	const { id, organization } = profile;

	const { organizationAddressId = '', isBillingAddress = false } = organizationAddress || {};

	const addressKey = isBillingAddress
		? 'organizationBillingAddressId'
		: 'organizationAddressId';

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
					[addressKey]   : organizationAddressId,
					performedBy    : id,
				},
			});

			if (resp?.data) {
				setDraftModal(true);
			}
		} catch (error) {
			Toast.error('Could not save draft. Please try again after some time');
		}
	};
	return {
		draftResponse : response,
		draftLoading  : loading,
		policyIdDraft : data?.data?.id,
	};
};

export default useSaveDraft;
