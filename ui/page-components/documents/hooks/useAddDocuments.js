import { useRequest } from '@/packages/request';

const useAddDocuments = ({
	documentDetails = {},
	refetch = () => {},
	setDocumentDetails = () => {},
}) => {
	const [{ loading, data }, trigger] = useRequest({
		method : 'post',
		url    : 'create_organization_document',
	}, { manual: true, autoCancel: false });

	const addDocument = async () => {
		try {
			await trigger({
				data: {
					...documentDetails,
				},
			});
			setDocumentDetails({
				name: '',
			});
			refetch();
		} catch (e) {
			console.error(e);
		}
	};

	return { addDocument, loading, data };
};

export default useAddDocuments;
