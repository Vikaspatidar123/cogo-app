// import Skeleton from '@cogoport/front/components/admin/Skeleton';
import { Placeholder } from '@cogoport/components';
import { IcMArrowDown } from '@cogoport/icons-react';
import { useEffect, useState } from 'react';

import styles from '../../styles.module.css';

import HScode from './HScode';

function HeadingList({
	headingData,
	chapterToggle,
	setHead,
	hsCodeObj,
	refetchHsCode,
	pageObj,
	setPageObj,
	headingLoading,
	hsloading,
}) {
	// const { isMobile } = useSaasState();
	const isMobile = false;
	const [headingToggle, setHeadingToggle] = useState(false);
	const { headingCode, headingDescription } = headingData || {};
	useEffect(() => {
		if (chapterToggle === false) {
			setHeadingToggle(false);
			setHead(false);
		}
	}, [chapterToggle]);

	useEffect(() => {
		if (headingToggle) {
			refetchHsCode(headingData.headingCode);
			setHead(true);
		} else setHead(false);
	}, [headingToggle]);

	const addLoader = (mobileWidth, desktopWidth) => {
		if (isMobile) {
			return <Placeholder width={mobileWidth} height="15px" />;
		}
		return <Placeholder height="15px" width={desktopWidth} />;
	};

	const description = () => {
		if (headingLoading) return addLoader('150px', '800px');
		if (headingToggle) return headingDescription;
		if (headingDescription?.length > 40 && isMobile) {
			return `${headingData?.headingDescription?.substring(0, 40)}....`;
		}
		if (headingDescription?.length > 96) {
			return `${headingData?.headingDescription?.substring(0, 95)}....`;
		}
		return headingDescription;
	};
	return (
		<div>
			<div
				className={`${styles.card} ${styles.heading}`}
				onClick={() => {
					setHeadingToggle(!headingToggle);
				}}
			>
				<div className={`${styles.name} ${headingToggle && styles.selected}`}>
					{headingLoading ? addLoader('40px', '130px') : `Heading ${headingCode}`}
				</div>
				<div className={`${styles.desc} ${headingToggle && styles.selected}`}>
					{description()}
				</div>
				<div>
					{headingLoading ? (
						addLoader('30px', '100px')
					) : (
						<IcMArrowDown className={styles.headingarrow} toggleDropdown={headingToggle} />
					)}
				</div>
			</div>
			{/* {headingToggle && ( */}
			<div className={styles.main_container}>
				<div
					className={`${styles.accordion} ${styles.hs_container} ${headingToggle && styles.hsTable}`}
					aria-expanded={headingToggle}
				>
					<HScode
						headCode={headingData?.headingCode}
						hscodeData={hsCodeObj[headingData.headingCode]}
						hsloading={hsloading}
						pageObj={pageObj[headingData.headingCode]}
						setPageObj={setPageObj}
						refetchHsCode={refetchHsCode}
						headingToggle={headingToggle}
					/>
				</div>
			</div>
			{/* )} */}
		</div>
	);
}
export default HeadingList;
