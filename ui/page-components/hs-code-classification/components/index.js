import {
	IcMCross, IcMMinusInCircle, IcMStar, IcCBookmark,
} from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import React, { useState, useCallback } from 'react';

import EmptyState from '../common/EmptyState';
import useBookmark from '../hooks/useBookmark';
import useHSCode from '../hooks/useHSCode';

import Favourites from './Favourites';
import Header from './Header';
import SectionList from './SectionList';
import styles from './styles.module.css';

function HsClassification() {
	const { t } = useTranslation(['common', 'hsClassification']);

	const [searchTag, setSearchTag] = useState('');
	const [resetDrillDown, setResetDrillDown] = useState(true);
	const [openSelectedModal, setOpenSelectedModal] = useState(false);
	const resetDrillDownHandler = useCallback(() => {
		setResetDrillDown(false);
	}, []);

	const {
		refetch,
		apiData,
		refetchSearch,
		headingObj,
		refetchHeading,
		hsCodeObj,
		refetchHsCode,
		pageObj,
		setPageObj,
		loading,
		headingLoading,
		hsloading,
		searchLoading,
	} = useHSCode();

	const list = loading ? [1, 2, 3, 4, 5, 6] : apiData;

	const {
		bookmarkData, refetchGetBookmark, refetchRemoveBookmark, getBookmarkLoading,
	} = useBookmark({ refetchHsCode });

	return (
		<div>
			<Header
				refetch={refetch}
				refetchSearch={refetchSearch}
				loading={searchLoading}
				resetDrillDownHandler={resetDrillDownHandler}
				setSearchTag={setSearchTag}
			/>
			<div className={styles.container}>
				<div className={styles.tag}>
					<div className={styles.title}>List of HS Codes</div>
					{searchTag && <div>{searchTag}</div>}
				</div>

				<div className={styles.button_div}>
					<div
						className={`${styles.styled_button} ${styles.secondary}`}
						onClick={resetDrillDownHandler}
						role="presentation"
					>
						<IcMMinusInCircle />
						Collaspse all
					</div>
					<div
						onClick={() => {
							setOpenSelectedModal(true);
							refetchGetBookmark();
						}}
						className={`${styles.styled_button} ${styles.primary}`}
						role="presentation"
					>
						<IcMStar />
						Favourites
					</div>
				</div>

				<div className={styles.button_mobile}>
					<div className={styles.icon_container}>
						<IcCBookmark
							size={2}
							onClick={() => {
								setOpenSelectedModal(true);
								refetchGetBookmark();
							}}
						/>
						<div className={styles.icon_text}>Favourites</div>
					</div>

					<div className={styles.icon_container}>
						<IcMCross width={30} height={30} onClick={resetDrillDownHandler} />
						<div className={styles.icon_text}>Collaspse all</div>
					</div>
				</div>
			</div>

			{list?.length === 0 && <EmptyState />}

			{(list || []).map((data) => (
				<SectionList
					key={data?.sectionCode}
					data={data}
					headingObj={headingObj}
					refetchHeading={refetchHeading}
					hsCodeObj={hsCodeObj}
					refetchHsCode={refetchHsCode}
					pageObj={pageObj}
					setPageObj={setPageObj}
					loading={loading || searchLoading}
					headingLoading={headingLoading}
					hsloading={hsloading}
					resetDrillDown={resetDrillDown}
					setResetDrillDown={setResetDrillDown}
				/>
			))}
			<Favourites
				openSelectedModal={openSelectedModal}
				bookmarkData={bookmarkData}
				setOpenSelectedModal={setOpenSelectedModal}
				refetchGetBookmark={refetchGetBookmark}
				refetchRemoveBookmark={refetchRemoveBookmark}
				loading={getBookmarkLoading}
			/>
		</div>
	);
}
export default HsClassification;
