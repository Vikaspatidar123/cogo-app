import { Toast } from '@cogoport/components';

import { useRequest } from '@/packages/request';

const formatTags = (values, tags) => {
	if ((tags || []).includes(values?.tag)) {
		return false;
	}

	return [...tags, values?.tag];
};
const useAddTag = ({
	shipment_data = {},
	setOpen = () => {},
	setTags = () => {},
	tags,
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : 'update_shipment',
		method : 'post',
	}, { manual: true });

	const onCreate = async (values) => {
		const finalTags = formatTags(values, tags);

		if (!finalTags) {
			Toast.error('You have already used this tag, Please use new tag');
			return;
		}

		setTags(finalTags);

		try {
			await trigger({
				data: {
					id   : shipment_data?.id || undefined,
					tags : finalTags,
				},
			});

			setOpen(false);
			Toast.success('Tag Added Successfully!');
		} catch (err) {
			Toast.error(err?.data);
		}
	};

	return {
		onCreate,
		loading,
	};
};

export default useAddTag;
