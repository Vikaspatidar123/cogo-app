// import Grid from '@cogoport/front/components/Grid';
import { IcMArrowRight } from '@cogoport/icons-react';

import MobileViewStepper from './MobileViewStepper';
// import {
// 	StyledRow,
// 	StyledColumnHeading,
// 	SelectTxt,
// 	FlexDiv,
// 	LabelTxt,
// 	SelectLabel,
// } from './style';

import styles from './styles.module.css';

function Stepper({
	isMobile = false,
	activeSection = '',
	activeChapter = '',
	activeHeading = '',
	showhscode,
	showCategoryTable,
	showChapterTable,
	showHeadingTable,
	setPreviousStepper,
	setActiveChapter,
	setActiveHeading,
	activeStepper,
}) {
	// const { Col } = Grid;

	return (
		<>
			{!isMobile && (
				<div className={styles.row}>
					<div>
						<div className={styles.select_txt}>Select:</div>
					</div>
					<div className={styles.column_heading}>
						{showCategoryTable ? (
							<div className={styles.flex_div}>
								<div className={styles.label_txt}>Description </div>
								<IcMArrowRight />
							</div>
						) : (
							activeSection && (
								<div className={styles.flex_div}>
									<div
										className={styles.select_label}
										onClick={() => {
											setPreviousStepper({
												showCategoryTable : true,
												showChapterTable  : false,
												showHeadingTable  : false,
												showhscode        : false,
											});
											setActiveChapter();
											setActiveHeading();
										}}
										role="presentation"
									>
										Description
									</div>
									<IcMArrowRight />
								</div>
							)
						)}
					</div>
					<div className={styles.column_heading}>
						{showChapterTable ? (
							<div className={styles.flex_div}>
								<div className={styles.label_txt}>Section </div>
								<IcMArrowRight />
							</div>
						) : (
							activeChapter && (
								<div className={styles.flex_div}>
									<div
										className={styles.select_label}
										onClick={() => {
											setPreviousStepper({
												showCategoryTable : false,
												showChapterTable  : true,
												showHeadingTable  : false,
												showhscode        : false,
											});
											setActiveHeading();
										}}
										role="presentation"
									>
										Section
									</div>
									<IcMArrowRight />
								</div>
							)
						)}
					</div>
					<div className={styles.column_heading}>
						{showHeadingTable ? (
							<div className={styles.flex_div}>
								<div className={styles.select_label}>Chapter </div>
								<IcMArrowRight />
							</div>
						) : (
							activeHeading && (
								<div className={styles.flex_div}>
									<div
										className={styles.select_label}
										onClick={() => {
											setPreviousStepper({
												showCategoryTable : false,
												showChapterTable  : false,
												showHeadingTable  : true,
												showhscode        : false,
											});
										}}
										role="presentation"
									>
										Chapter
									</div>
									<IcMArrowRight />
								</div>
							)
						)}
					</div>
					<div className={styles.column_heading}>
						{showhscode && (
							<div className={styles.flex_div}>
								<div className={styles.select_label}>HS Code </div>
								<IcMArrowRight />
							</div>
						)}
					</div>
				</div>
			)}
			{isMobile && <MobileViewStepper activeStepper={activeStepper} />}
		</>
	);
}

export default Stepper;
