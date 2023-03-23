import { Toast } from '@cogoport/components';
import { useState, useEffect } from 'react';

import { useRequest } from '@/packages/request';

function Blogs() {
	const [{ loading, data: blogs_data }, trigger] = useRequest({
		url    : '{process.env.APP_URL}/api/get-blogs}',
		method : 'get',
	}, { manual: true });

	const blogsData = async () => {
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
	};

	useEffect(() => {
		blogsData();
	}, []);
	console.log(blogs_data, 'blog');
	return { loading, blogsData, blogs_data };
}
export default Blogs;
