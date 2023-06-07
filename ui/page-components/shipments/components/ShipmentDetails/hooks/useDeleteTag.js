import { Toast } from '@cogoport/components';

import { useRequest } from '@/packages/request';

const useDeleteTag = ({
	shipment_data = {},
	tags = [],
	setTags = () => {},
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : 'update_shipment',
		method : 'post',
	}, { manual: true });

	const onDelete = async (deleted_tag) => {
		const filteredTags = (tags || []).filter((tag) => tag !== deleted_tag);

		setTags(filteredTags);

		const payload = {
			id   : shipment_data?.id || undefined,
			tags : filteredTags,
		};

		try {
			await trigger({
				data: {
					...payload,
				},
			});

			Toast.success('Tag Deleted!');
		} catch (err) {
			Toast.error(err?.data);
		}
	};

	return {
		onDelete,
		loading,
	};
};

export default useDeleteTag;
