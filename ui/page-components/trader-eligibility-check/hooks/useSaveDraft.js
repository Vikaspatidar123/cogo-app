import { Toast } from '@cogoport/components';
import { useState } from 'react';

// import { useSaasState } from '../../../common/context';

import useGetProductCode from './useGetProductCodes';

import { useRouter } from '@/packages/next';
import { useRequestBf } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useSaveDraft = () => {
	const { getProductCode } = useGetProductCode();

	const { profile } = useSelector((s) => s);
	const { id, organization } = profile;
	const [draftId, setDraftId] = useState('');
	const { push } = useRouter();
	// const { trigger, loading } = useRequest('post', false, 'saas', {
	// 	authkey: 'post_saas_trade_engine_screening_draft',
	// })('/saas/trade-engine/screening/draft');

	const [{ loading }, trigger] = useRequestBf({
		url     : '/saas/trade-engine/screening/draft',
		authKey : 'post_saas_trade_engine_screening_draft',
		method  : 'post',
	}, { manual: true });

	const createDraft = async ({ formDetails = {}, value = '', services = {} }) => {
		const { formValues, countryDetails } = formDetails || {};
		try {
			const res = await trigger({
				data: {
					performedBy    : id,
					organizationId : organization?.id,
					source         : 'SAAS',
					header         : {
						tradeEngineInputId : draftId || '',
						sellerDeatils      : {},
						buyerDetails       : {
							...formValues,
							...countryDetails,
						},
					},
				},
			});
			if (res?.data) {
				setDraftId(res?.data?.id);
				// eslint-disable-next-line no-unused-expressions
				value === 'directPayment'
					? getProductCode({ draftResponse: res, services })
					: push(
						`/saas/premium-services/trader-eligibility-check/result?draftIdFromAddon=${res?.data?.id}`,
					);
			}
		} catch (error) {
			Toast.error(error);
		}
	};

	return { createDraft, loading };
};

export default useSaveDraft;
