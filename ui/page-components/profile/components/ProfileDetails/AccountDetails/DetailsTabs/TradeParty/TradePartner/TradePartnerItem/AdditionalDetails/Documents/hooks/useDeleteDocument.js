import { Toast } from '@cogoport/components';
import { getApiErrorString } from '@cogoport/utils';

import { useRequest } from '@/packages/request';

const useDeleteDocument = (props) => {
	const { data, onCloseModal, getOrganizationDocuments } = props;

	const { loading, trigger } = useRequest(
		'post',
		false,
		'partner',
	)('/update_organization_document');

	const handleUpdateBankDetails = async () => {
		try {
			await trigger({
				data: {
					id     : data.id,
					status : data.status === 'active' ? 'inactive' : 'active',
				},
			});

			getOrganizationDocuments();

			onCloseModal();
		} catch (e) {
			Toast.error(getApiErrorString(e.data));
		}
	};

	return { handleUpdateBankDetails, loading };
};

export default useDeleteDocument;
