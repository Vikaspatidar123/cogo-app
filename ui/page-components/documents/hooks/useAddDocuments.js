import { useRequest } from '@/packages/request';

const useAddDocuments = ({
	documentDetails = {},
	refetch = () => {},
	setDocumentDetails = () => {},
	serviceType = '',
}) => {
	const [{ loading, data }, trigger] = useRequest({
		method : 'post',
		url    : 'create_organization_document',
	}, { manual: true, autoCancel: false });

	const addDocument = async (val) => {
		try {
			await trigger({
				data: {
					...documentDetails,
					...(val || {}),
					service_type: serviceType || undefined,
				},
			});

			setDocumentDetails({ name: '' });
			refetch(serviceType ? { service_type: serviceType } : {});
		} catch (e) {
			console.error(e);
		}
	};

	return { addDocument, loading, data };
};

export default useAddDocuments;
