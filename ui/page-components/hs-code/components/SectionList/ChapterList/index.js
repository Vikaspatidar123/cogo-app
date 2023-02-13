import { IcMArrowDown } from '@cogoport/icons-react';
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
	}, [chapterToggle]);

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
				onClick={() => {
					setChapterToggle(!chapterToggle);
				}}
			>
				<div className={`${styles.name} ${chapterToggle && styles.selected}`}>
					Chapter
					{chapterCode}
				</div>
				<div className={`${styles.desc} ${chapterToggle && styles.selected}`}>
					{description()}
				</div>
				<div>
					<IcMArrowDown className={styles.chapterarrow} toggleDropdown={chapterToggle} />
				</div>
			</div>
			<div className={styles.main_container}>
				<div
					className={`${styles.accordion} ${styles.heading} ${head && styles.accordionHead}`}
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
