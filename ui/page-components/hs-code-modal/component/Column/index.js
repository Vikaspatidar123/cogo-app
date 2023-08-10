import { cl } from '@cogoport/components';

import GetCountriesFilter from '../Countries';

import styles from './styles.module.css';

const hsColumn = ({
	isMobile = false,
	selectedCountry,
	setSelectedCountry,
	setCountryforHsCode,
}) => {
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
				<div className={cl`${styles.div_hs_code} ${styles.rowcss}`}>
					<div className={styles.code}>{record?.sectionCode}</div>
					<div className={styles.desc}>{record?.sectionDescription}</div>
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
					<div className={cl`${styles.code} 
					${isMobile ? styles.hs_code_mobile : styles.hs_code}`}
					>
						{record?.displayHsCode}

					</div>
					<div className={isMobile ? styles.hs_desc_mobile : styles.hs_desc}>
						{record?.description}

					</div>
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
