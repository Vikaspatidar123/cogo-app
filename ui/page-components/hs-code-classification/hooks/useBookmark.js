import { Toast } from '@cogoport/components';
import { useState } from 'react';

import { useRequestBf } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useBookmark = ({ setAddBookmark, setRemoveBookmark, refetchHsCode }) => {
	const { profile } = useSelector((s) => s);
	const [bookmarkData, setBookmarkData] = useState([]);
	const { id, organization } = profile || {};

	const [{ loading: getBookmarkLoading }, trigger] = useRequestBf({
		url     : '/saas/hs-code/favourites',
		authKey : 'get_saas_hs_code_favourites',
		method  : 'get',
	}, { manual: true });

	const [{ loading: postHsCodeFav }, triggerAdd] = useRequestBf({
		url     : '/saas/hs-code/favourites',
		authKey : 'post_saas_hs_code_favourites',
		method  : 'post',
	}, { manual: true });

	const [{ loading: removeBookmarkLoading }, triggerDelete] = useRequestBf({
		url     : '/saas/hs-code/favourites',
		authKey : 'delete_saas_hs_code_favourites',
		method  : 'delete',
	}, { manual: true });

	const refetchGetBookmark = async () => {
		try {
			const response = await trigger({
				params: {
					userId: id,
				},
			});
			setBookmarkData(response.data);
		} catch (err) {
			console.log(err);
		}
	};

	const refetchAddBookmark = async (hsCode_ID = undefined) => {
		try {
			const response = await triggerAdd({
				data: {
					userId         : id,
					hsCodeId       : hsCode_ID,
					organizationId : organization?.id,
				},
			});

			if (response.data === 'Success') {
				setRemoveBookmark(false);
				setAddBookmark(true);
			}
			Toast.success('Successfully Add In Favourites List');
		} catch (err) {
			Toast.error(err?.err?.message);
		}
	};

	const refetchRemoveBookmark = async (
		flag,
		hsCode_ID = undefined,
		getRefetch = undefined,
		chapterCode = '',
	) => {
		try {
			const response = await triggerDelete({
				data: {
					userId   : id,
					hsCodeId : hsCode_ID,
				},
			});
			if (response.data === 'Success' && flag) {
				setAddBookmark(false);
				setRemoveBookmark(true);
				Toast.success('Successfully Remove From Favourites List');
			} else if (response.data === 'Success') {
				getRefetch();
				if (chapterCode) {
					refetchHsCode(chapterCode);
				}
				Toast.success('Successfully Remove From Favourites List');
			}
		} catch (err) {
			Toast.error(err?.err?.message);
		}
	};
	return {
		refetchGetBookmark,
		refetchAddBookmark,
		refetchRemoveBookmark,
		bookmarkData,
		getBookmarkLoading,
		postHsCodeFav,
		removeBookmarkLoading,
	};
};
export default useBookmark;
