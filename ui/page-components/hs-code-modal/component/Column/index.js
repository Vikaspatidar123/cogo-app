// import Grid from '@cogoport/front/components/Grid';

import { cl } from '@cogoport/components';

import GetCountriesFilter from '../Countries';

// import {
// 	SelectRow, DivHscode, EndAlignDiv, StyledTag,
// } from './style';

import styles from './styles.module.css';

const hsColumn = ({
	isMobile = false,
	selectedCountry,
	setSelectedCountry,
	setCountryforHsCode,
}) => {
	// const { Row, Col } = Grid;

	const sectionColumn = [
		{
			id     : 'sectionDescription',
			Header : (
				<div className={styles.select_row}>
					{!isMobile ? (
						<div>
							<GetCountriesFilter
								setCountryforHsCode={setCountryforHsCode}
								setSelectedCountry={setSelectedCountry}
							/>
						</div>
					) : (
						<div>
							<GetCountriesFilter
								setCountryforHsCode={setCountryforHsCode}
								setSelectedCountry={setSelectedCountry}
							/>
						</div>
					)}
				</div>
			),
			key      : 'sectionDescription',
			accessor : (record) => (
				<div className={styles.row}>
					<div>
						<div className={cl`${styles.div_hs_code} ${styles.rowcss}`}>
							<div className={styles.code}>{record?.sectionCode}</div>
							<div className={styles.desc}>{record?.sectionDescription}</div>
						</div>
					</div>
				</div>
			),
		},
	];

	const chapterColumns = [
		{
			id       : 'chapterDescription',
			Header   : '',
			key      : 'chapterDescription',
			accessor : (record) => (
				<div className={cl`${styles.div_hs_code} ${styles.rowcss}`}>
					<div className={styles.code}>{record?.chapterCode}</div>
					<div className={styles.desc}>{record?.chapterDescription}</div>
				</div>
			),
		},
	];
	const headersColumns = [
		{
			id       : 'headingDescription',
			Header   : '',
			key      : 'headingDescription',
			accessor : (record) => (
				<div className={cl`${styles.div_hs_code} ${styles.rowcss}`}>
					<div className={styles.code}>{record?.headingCode}</div>
					<div className={styles.desc}>{record?.headingDescription}</div>
				</div>
			),
		},
	];

	const hsCodeColumns = [
		{
			id     : 'hscodeDescription',
			Header : (
				<div className={styles.select_row}>
					<div className={styles.end_align_div}>
						<div className={styles.style_tag}>{selectedCountry || 'INDIA'}</div>
					</div>
				</div>
			),
			key      : 'description',
			accessor : (record) => (
				<div className={cl`${styles.div_hs_code} ${styles.rowcss}`}>
					<div className={cl`${styles.hs_code} ${styles.code}`}>{record?.displayHsCode}</div>
					<div className={styles.hs_desc}>{record?.description}</div>
				</div>
			),
		},
	];

	return {
		sectionColumn,
		headersColumns,
		chapterColumns,
		hsCodeColumns,
	};
};

export default hsColumn;
