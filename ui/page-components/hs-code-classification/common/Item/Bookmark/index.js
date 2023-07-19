import { Tooltip } from '@cogoport/components';
import { IcMStar, IcCStar } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import { useState, useEffect } from 'react';

import useBookmark from '../../../hooks/useBookmark';

import styles from './styles.module.css';

function Bookmark({ data }) {
	const { t } = useTranslation(['common', 'hsClassification']);
	const [addBookmark, setAddBookmark] = useState();
	const [removeBookmark, setRemoveBookmark] = useState(true);
	const { refetchAddBookmark, refetchRemoveBookmark } = useBookmark({
		setAddBookmark,
		setRemoveBookmark,
	});
	useEffect(() => {
		setAddBookmark(!!data?.isBookmarked);
		setRemoveBookmark(!data?.isBookmarked);
	}, [data?.isBookmarked]);

	const showAddBookmark = () => {
		refetchAddBookmark(data?.id);
	};

	const showRemoveBookmark = () => {
		refetchRemoveBookmark(true, data?.id);
	};
	return (
		<div className={styles.container}>
			{addBookmark && data?.type === 'FINAL' && (
				<Tooltip placement="top" content={t('hsClassification:hs_code_classification_remove_bookmark_tooltip')}>
					<div>
						<IcCStar onClick={showRemoveBookmark} className={styles.add_bookmark} />
					</div>
				</Tooltip>
			)}
			{removeBookmark && data?.type === 'FINAL' && (
				<Tooltip
					placement="top"
					content={t('hsClassification:hs_code_classification_add_to_favourites_tooltip')}
				>
					<div>
						<IcMStar onClick={showAddBookmark} className={styles.remove_bookmark} />
					</div>
				</Tooltip>
			)}
		</div>
	);
}
export default Bookmark;
