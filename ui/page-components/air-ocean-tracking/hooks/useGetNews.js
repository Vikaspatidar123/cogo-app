import { useRequestPublic } from '@/packages/request';

const useGetNews = () => {
	const [{ loading, data }] = useRequestPublic({
		method : 'get',
		url    : '/datastore/tables/Notifications/rows',
		params : {
			published : true,
			limit     : 3,
		},
	}, { manual: false });

	return {
		loading, data: data?.rows || [],
	};
};

export default useGetNews;
