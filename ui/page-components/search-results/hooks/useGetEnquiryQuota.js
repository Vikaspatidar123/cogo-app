import { useRequest } from '@/packages/request';

const useGetEnquiryQuota = () => {
	const [{ loading, data }, trigger] = useRequest(
		{
			url    : 'list_store_quota',
			method : 'get',
			params : { filters: { service: 'spot_negotiation' } },
		},
		{ manual: true },
	);

	const object =	(data?.list || []).find((item) => item?.service === 'spot_negotiation')
		|| {};

	const onPayment = () => {
		trigger();
	};

	return { loading, ...object, onPayment };
};
export default useGetEnquiryQuota;
