import { useQuery } from '@/packages/request';
import { getShipmentDownloadList } from '@/ui/api/get';

const useDownload = () => {
	const {
		data,
		refetch,
		isLoading,
	} =	useQuery({
		queryKey : 'shipment_download_list',
		queryFn  : getShipmentDownloadList,
		options  : {
			enabled: false,
		},
	});

	return { data, refetch, downloadLoading: isLoading };
};
export default useDownload;
