/* eslint-disable react-hooks/exhaustive-deps */
import { cl, Placeholder } from '@cogoport/components';
import { IcMArrowDown } from '@cogoport/icons-react';
import React, { useEffect, useState } from 'react';

import EmptyState from '../../common/EmptyState';
import IconMaping from '../../common/icons';

import ChapterList from './ChapterList';
import styles from './styles.module.css';

function SectionList({
	data,
	headingObj,
	refetchHeading,
	hsCodeObj,
	refetchHsCode,
	pageObj,
	setPageObj,
	loading,
	headingLoading,
	hsloading,
	resetDrillDown,
	setResetDrillDown,
}) {
	const isMobile = false;
	const [sectionToggle, setSectionToggle] = useState(false);
	useEffect(() => {
		if (resetDrillDown === false) {
			setSectionToggle(false);
			setResetDrillDown(true);
		}
	}, [resetDrillDown]);
	const { Mapping } = IconMaping();
	const { sectionCode, sectionDescription, chapters } = data || {};

	const addLoader = (mobileWidth, desktopWidth) => (
		<div>
			<Placeholder width={mobileWidth} height="15px" className={styles.mobile} />
			<Placeholder className={styles.loader} height="15px" width={desktopWidth} />
		</div>
	);

	const description = () => {
		if (loading) return addLoader('150px', '800px');
		if (sectionToggle) return sectionDescription;
		if (sectionDescription?.length > 40 && isMobile) {
			return (
				<div>
					{ `${data?.sectionDescription?.substring(0, 40)}....`}
					{' '}
				</div>
			);
		}
		if (sectionDescription?.length > 96) {
			return `${data?.sectionDescription?.substring(0, 95)}....`;
		}
		return sectionDescription;
	};

	return (
		<div className={styles.main_card}>
			<div
				className={cl`${styles.card} ${styles.section}`}
				role="presentation"
				onClick={() => {
					setSectionToggle(!sectionToggle);
				}}
			>
				<div className={cl`${styles.name} ${sectionToggle && styles.selected}`}>
					<div className={cl`${styles.section_styles}`}>
						{!loading && <span className={cl`${styles.icon_svg}`}>{Mapping[sectionCode]}</span>}
						{loading ? addLoader('40px', '140px') : `SECTION ${sectionCode}`}
					</div>
				</div>
				<div className={`${styles.desc}  ${sectionToggle && styles.selected}`}>
					{description()}
				</div>
				<div className={`${styles.dropdown_symbol}`}>
					{loading ? (
						addLoader('30px', '100px')
					) : (
						<IcMArrowDown toggleDropdown={sectionToggle} />
					)}
				</div>
			</div>

			<div className={styles.main_container}>
				<div className={`${styles.accordion} ${styles.chapter} `} aria-expanded={sectionToggle}>
					{chapters?.length === 0 && <EmptyState drillDwn />}
					{chapters?.map((chapterData) => (
						<ChapterList
							key={chapterData?.chapterCode}
							chapterData={chapterData}
							sectionToggle={sectionToggle}
							headingObj={headingObj}
							refetchHeading={refetchHeading}
							hsCodeObj={hsCodeObj}
							pageObj={pageObj}
							setPageObj={setPageObj}
							refetchHsCode={refetchHsCode}
							headingLoading={headingLoading}
							hsloading={hsloading}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
export default SectionList;
