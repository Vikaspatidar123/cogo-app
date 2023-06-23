import { Toast } from '@cogoport/components';
import { useState, useCallback } from 'react';

import { useRequestBf } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useInsurance = ({
	payment = () => {},
	type = '',
	uploadType = '',
	activeTab = '',
	organizationAddress = '',
	policyIdDraft = '',
	policyId = '',
	ratesResponse = {},
	countryCode = '',
	insuranceType = [],
}) => {
	const [policyIdPost, setPolicyIdPost] = useState();
	const billingtype = uploadType;
	const { profile } = useSelector((state) => state);
	const { id, organization } = profile;

	const { isBillingAddress = false, organizationAddressId = '' } = organizationAddress || {};

	const [{ loading }, trigger] = useRequestBf(
		{
			method  : 'post',
			authKey : 'post_saas_insurance_checkout',
			url     : '/saas/insurance/checkout',
		},
		{ manual: true },
	);

	const {
		convenienceFee = 0,
		platformCharges = 0,
		netPremium = 0,
		totalApplicableCharges = 0,
		taxAmount = 0,
		premium = 0,
		sumInsured = 0,
	} = ratesResponse || {};

	const addressKey = isBillingAddress
		? 'organizationBillingAddressId'
		: 'organizationAddressId';

	const resp = useCallback(
		async (item) => {
			const { aadharNumber = '', gstin = '', ...rest } = item || {};
			try {
				const res = await trigger({
					data: {
						...rest,
						aadharNumber   : aadharNumber === '' ? undefined : aadharNumber,
						gstin          : gstin === '' ? undefined : gstin,
						source         : 'SAAS',
						email          : profile?.email,
						userId         : id,
						organizationId : organization?.id,
						transitMode    : type === 'Ocean' ? 'SEA' : type.toUpperCase(),
						billingType    : billingtype,
						policyType     : countryCode === 'IN' ? 'INLAND' : activeTab,
						premium        : +premium,
						policyId       : policyIdDraft || policyId || policyIdPost,
						gstAmount      : taxAmount,
						netPremium,
						[addressKey]   : organizationAddressId,
						platformCharges,
						convenienceFee,
						sumInsured,
						totalApplicableCharges,
						policyForSelf  : insuranceType[0] === 'SELF',
					},
				});
				if (res?.data) {
					setPolicyIdPost(res?.data?.id);
					payment(res?.data);
				}
			} catch (error) {
				Toast.error(error?.error?.message);
			}
		},
		[activeTab, addressKey, billingtype, convenienceFee,
			countryCode, id, insuranceType, netPremium, organization?.id,
			organizationAddressId, payment, platformCharges, policyId, policyIdDraft,
			policyIdPost, premium, profile?.email, sumInsured, taxAmount, totalApplicableCharges, trigger, type],
	);

	return { resp, insuranceLoading: loading };
};

export default useInsurance;
