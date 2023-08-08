import { Toast } from '@cogoport/components';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import { useRequestBf } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useBookmark = ({ setAddBookmark, setRemoveBookmark, refetchHsCode }) => {
	const { t } = useTranslation(['common', 'hsClassification']);
	const { profile } = useSelector((s) => s);
	const [bookmarkData, setBookmarkData] = useState([]);
	const { id, organization } = profile || {};

	const [{ loading: getBookmarkLoading }, trigger] = useRequestBf(
		{
			url     : '/saas/hs-code/favourites',
			authKey : 'get_saas_hs_code_favourites',
			method  : 'get',
		},
		{ manual: true },
	);

	const [{ loading: postHsCodeFav }, triggerAdd] = useRequestBf(
		{
			url     : '/saas/hs-code/favourites',
			authKey : 'post_saas_hs_code_favourites',
			method  : 'post',
		},
		{ manual: true },
	);

	const [{ loading: removeBookmarkLoading }, triggerDelete] = useRequestBf(
		{
			url     : '/saas/hs-code/favourites',
			authKey : 'delete_saas_hs_code_favourites',
			method  : 'delete',
		},
		{ manual: true },
	);

	const refetchGetBookmark = async () => {
		try {
			const response = await trigger({
				params: {
					userId         : id,
					organizationId : organization.id,
				},
			});
			setBookmarkData(response.data);
		} catch (err) {
			console.error(err);
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
			Toast.success(t('hsClassification:hs_code_classification_add_bookmark_toast_1'));
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
					userId         : id,
					hsCodeId       : hsCode_ID,
					organizationId : organization?.id,

				},
			});
			if (response.data === 'Success' && flag) {
				setAddBookmark(false);
				setRemoveBookmark(true);
				Toast.success(t('hsClassification:hs_code_classification_remove_bookmark_toast_1'));
			} else if (response.data === 'Success') {
				getRefetch();
				if (chapterCode) {
					refetchHsCode(chapterCode);
				}
				Toast.success(t('hsClassification:hs_code_classification_remove_bookmark_toast_1'));
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
