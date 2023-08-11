import { useQuery } from '@/packages/request';
import { getShipmentDownloadList } from '@/ui/api/get';
import showErrorsInToast from '@/ui/commons/utils/showErrorsInToast';

const useDownload = () => {
	const {
		refetch,
		isLoading,
	} =	useQuery({
		queryKey     : 'shipment_download_list',
		queryFn      : getShipmentDownloadList,
		renderOption : ['shipment_download_list'],
		options      : {
			enabled : false,
			retry   : false,
			onError : (err) => {
				showErrorsInToast(err?.response?.data);
			},
			onSuccess: (data) => {
				window.open(data?.file_url);
			},
		},

	});
	return { refetch, downloadLoading: isLoading };
};
export default useDownload;
