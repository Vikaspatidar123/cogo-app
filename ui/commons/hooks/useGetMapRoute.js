import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

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

const getPayload = ({ originInfo = {}, destinationInfo = {}, id }) => {
	const originPayload = getInfo(originInfo);
	const destinationPayload = getInfo(destinationInfo);

	return {
		points  : [originPayload, destinationPayload],
		user_id : id,
	};
};

const useGetMapRoute = () => {
	const { id } = useSelector((state) => state.profile);
	const [{ loading, data }, trigger] = useRequest({
		method : 'get',
		url    : '/get_multimodal_shortest_path',
	}, { manual: true });

	const getAirOceanRoute = async ({ originInfo, destinationInfo }) => {
		const payload = getPayload({ originInfo, destinationInfo, id });
		try {
			const resp = await trigger({
				params: payload,

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
