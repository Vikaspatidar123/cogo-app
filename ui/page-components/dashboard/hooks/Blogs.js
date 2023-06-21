import { Toast } from '@cogoport/components';
import { useCallback, useEffect } from 'react';

import { useRequest } from '@/packages/request';

function Blogs() {
	const [{ loading, data: blogs_data }, trigger] = useRequest({
		url    : `${process.env.NEXT_PUBLIC_APP_URL}/api/get-blogs}`,
		method : 'get',
	}, { manual: true });

	const blogsData = useCallback(async () => {
		try {
			const res = await trigger();
			const { datas } = res;
			return datas;
		} catch (err) {
			Toast.error(
				err?.message || ' Please try again.',
			);
			return null;
		}
	}, [trigger]);

	useEffect(() => {
		blogsData();
	}, [blogsData]);
	return { loading, blogsData, blogs_data };
}
export default Blogs;
