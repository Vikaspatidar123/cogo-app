import { Toast } from '@cogoport/components';
import { useState, useEffect } from 'react';

import { useRequest } from '@/packages/request';

function useGetMediaFileUrl() {
	const [{ loading, data: promotionData }, trigger] = useRequest({
		url    : '/get_media_upload_url',
		method : 'get',
	}, { manual: true });

	const getPromotionData = async (file_name) => {
		try {
			await trigger({ params: file_name });
		} catch (err) {
			Toast.error(
				err?.message || ' Please try again.',
			);
		}
	};

	useEffect(() => {
		getPromotionData();
	}, []);
	return { loading, promotionData };
}
export default useGetMediaFileUrl;
