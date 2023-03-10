import { Toast } from '@cogoport/components';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import { useRequest } from '@/packages/request';

const useInsurance = ({
	payment = () => {},
	type = '',
	uploadType = '',
	activeTab = '',
	organizationAddressId = '',
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

	const [{ loading }, trigger] = useRequest({
		method  : 'post',
		authkey : 'post_saas_insurance_checkout',
		url     : '/saas/insurance/checkout',
	}, { manual: true });

	const {
		convenienceFee = 0,
		platformCharges = 0,
		netPremium = 0,
		totalApplicableCharges = 0,
		taxAmount = 0,
		premium = 0,
		sumInsured = 0,
	} = ratesResponse || {};

	const resp = async (item) => {
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
					organizationAddressId,
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
	};

	return { resp, insuranceLoading: loading };
};

export default useInsurance;
