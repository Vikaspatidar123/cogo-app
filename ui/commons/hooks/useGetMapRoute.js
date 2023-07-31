import { useRequest } from '@/packages/request';

const getInfo = (info) => ({
	coordinates  : [info?.latitude, info?.longitude],
	location_id  : info?.id,
	continent_id : info?.continent_id,
	display_name : info?.display_name,
	type         : info?.type,
	is_icd       : info?.is_icd,
	region_id    : info?.region_id || '',
});

const getPayload = ({ originInfo = {}, destinationInfo = {} }) => {
	const originPayload = getInfo(originInfo);
	const destinationPayload = getInfo(destinationInfo);

	return [originPayload, destinationPayload];
};

const useGetMapRoute = () => {
	const [{ loading, data }, trigger] = useRequest({
		method : 'get',
		url    : '/get_multimodal_shortest_path',
	}, { manual: true });

	const getAirOceanRoute = async ({ originInfo, destinationInfo }) => {
		const payload = getPayload({ originInfo, destinationInfo });
		try {
			const resp = await trigger({
				params: {
					points: payload,
				},
			});
			return resp.data;
		} catch (err) {
			console.error(err, 'err');
			return null;
		}
	};

	return { getAirOceanRoute, loading, data };
};

export default useGetMapRoute;
