import { cl } from '@cogoport/components';
import { IcMArrowDown } from '@cogoport/icons-react';
import { t } from 'i18next';
import { useEffect, useState } from 'react';

import EmptyState from '../../../common/EmptyState';
import styles from '../styles.module.css';

import HeadingList from './HeadingList';

function ChapterList({
	chapterData,
	sectionToggle,
	headingObj,
	refetchHeading,
	hsCodeObj,
	refetchHsCode,
	pageObj,
	setPageObj,
	headingLoading,
	hsloading,
}) {
	const isMobile = false;
	const [chapterToggle, setChapterToggle] = useState(false);
	const [head, setHead] = useState(false);
	const { chapterCode, chapterDescription, headings = false } = chapterData;
	useEffect(() => {
		if (sectionToggle === false) {
			setChapterToggle(false);
		}
	}, [sectionToggle]);

	useEffect(() => {
		if (chapterToggle && headings.length === 0) {
			refetchHeading(chapterCode);
		}
	}, [chapterCode, chapterToggle, headings.length, refetchHeading]);

	const description = () => {
		if (chapterToggle) return chapterDescription;
		if (chapterDescription?.length > 40 && isMobile) {
			return `${chapterData?.chapterDescription?.substring(0, 40)}....`;
		}
		if (chapterDescription?.length > 110) {
			return `${chapterData?.chapterDescription?.substring(0, 110)}....`;
		}
		return chapterDescription;
	};

	return (
		<div>
			<div
				className={`${styles.card} ${styles.chapter}`}
				role="presentation"
				onClick={() => {
					setChapterToggle(!chapterToggle);
				}}
			>
				<div className={cl`${styles.name} ${chapterToggle && styles.selected}`}>
					<span>
						{t('hsClassification:hs_code_classification_chapter_label')}
					</span>
					<span>
						{' '}
						{chapterCode}
					</span>
				</div>
				<div className={`${styles.desc} ${chapterToggle && styles.selected}`}>
					{description()}
				</div>
				<div className={`${styles.dropdown_symbol2}`}>
					<IcMArrowDown className={styles.chapterarrow} toggleDropdown={chapterToggle} />
				</div>
			</div>
			<div className={cl`${styles.main_container} ${chapterToggle && styles.heading_container}`}>
				<div
					className={`${styles.accordion} ${styles.heading} ${head && styles.accordion_head}`}
					aria-expanded={chapterToggle}
				>
					{headingObj[chapterData.chapterCode]?.length === 0 && <EmptyState drillDwn />}
					{(headings.length !== 0 ? headings : headingObj[chapterData.chapterCode])?.map(
						(headingData) => (
							<HeadingList
								key={headingData?.headingCode}
								headingData={headingData}
								chapterToggle={chapterToggle}
								setHead={setHead}
								hsCodeObj={hsCodeObj}
								refetchHsCode={refetchHsCode}
								pageObj={pageObj}
								setPageObj={setPageObj}
								headingLoading={headingLoading}
								hsloading={hsloading}
							/>
						),
					)}
				</div>
			</div>
		</div>
	);
}
export default ChapterList;
