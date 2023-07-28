import { Toast } from '@cogoport/components';
import { useEffect } from 'react';

import { useRouter } from '@/packages/next';
import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const SHORT_URL_PATHS = ['/url/[token]'];

function EmptyPage() {
	const { pathname } = useSelector(({ general }) => general);
	const { query } = useRouter();

	const [, trigger] = useRequest(
		{
			url    : '/get_link',
			method : 'get',
		},
		{ manual: true },
	);

	useEffect(() => {
		(async () => {
			if (SHORT_URL_PATHS.includes(pathname)) {
				try {
					const response = await trigger({
						params: { in_url: query.token },
					});
					const { out_url } = response?.data || {};
					if (out_url) window.location.href = out_url;
					else {
						Toast.error('Something went wrong, Please try again');
					}
				} catch (error) {
					Toast.error(
						error?.message || 'Something went wrong, we are working on it!',
					);
				}
			}
		})();
	}, [pathname, query.token, trigger]);

	return null;
}

export default EmptyPage;
