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

	const addDocument = async (val) => {
		console.log(val, 'val');
		try {
			await trigger({
				data: {
					...documentDetails,
					...(val || {}),
				},
			});
			setDocumentDetails({ name: '' });

			refetch();
		} catch (e) {
			console.log(e);
		}
	};

	return { addDocument, loading, data };
};

export default useAddDocuments;
