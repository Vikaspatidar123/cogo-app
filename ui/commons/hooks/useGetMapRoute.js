import { useRequest } from '@/packages/request';

const getInfo = (info) => {
	const {
		latitude = '', longitude = '', id = '', continent_id = '', display_name = '', type = '', is_icd = '',
		region_id = '',
	} = info || {};

	return ({
		coordinates : [latitude, longitude],
		location_id : id,
		continent_id,
		display_name,
		type,
		is_icd,
		region_id   : region_id || '',
	}
	);
};

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
