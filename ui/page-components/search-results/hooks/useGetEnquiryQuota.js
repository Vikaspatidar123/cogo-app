import { useRequest, usePartnerEntityType } from '@cogo/commons/hooks';
import { useSelector } from '@cogo/store';

const useGetEnquiryQuota = () => {
	const { isChannelPartner } = usePartnerEntityType();
	const { scope } = useSelector(({ general }) => ({ scope: general.scope }));

	const { loading, data, trigger } = useRequest(
		'get',
		scope === 'partner' && isChannelPartner,
		scope,
	)('/list_store_quota', {
		params: { filters: { service: 'spot_negotiation' } },
	});

	const object =		(data?.list || []).find((item) => item?.service === 'spot_negotiation')
		|| {};

	const onPayment = () => {
		trigger();
	};

	return { loading, ...object, onPayment };
};
export default useGetEnquiryQuota;
