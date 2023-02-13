import { IcMCross, IcMMinusInCircle, IcMStar } from '@cogoport/icons-react';
import React, { useState } from 'react';

import Bookmark from '../assets/bookmark.svg';
import EmptyState from '../common/EmptyState';
import useBookmark from '../hooks/useBookmark';
import useHSCode from '../hooks/useHSCode';

import Favourites from './Favourites';
import Header from './Header';
import SectionList from './SectionList';
import styles from './styles.module.css';

function HsClassification() {
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
	const [searchTag, setSearchTag] = useState('');
	const [resetDrillDown, setResetDrillDown] = useState(true);
	const [openSelectedModal, setOpenSelectedModal] = useState(false);
	const resetDrillDownHandler = () => {
		setResetDrillDown(false);
	};
	const {
		bookmarkData, refetchGetBookmark, refetchRemoveBookmark, getBookmarkLoading, isMobile,
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
				{!isMobile && (
					<div className={styles.button_div}>
						<div className={styles.styled_button} onClick={resetDrillDownHandler}>
							<IcMMinusInCircle />
							Collaspse all
						</div>
						<div
							onClick={() => {
								setOpenSelectedModal(true);
								refetchGetBookmark();
							}}
							className={styles.styled_button}
						>
							<IcMStar />
							Favourites
						</div>
					</div>
				)}

				{isMobile && (
					<div className={styles.button_div}>
						<div className={styles.icon_container}>
							<Bookmark
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
				)}
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
