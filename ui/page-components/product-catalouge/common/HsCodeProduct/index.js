import styles from './styles.module.css';

export const ChapterColumns = [
	{
		id       : 'chapterDescription',
		Header   : '',
		key      : 'chapterDescription',
		accessor : (record) => (
			<div className={styles.dihvs_code}>
				{record?.chapterCode}
				{record?.chapterDescription}
			</div>
		),
	},
];
export const HeadersColumns = [
	{
		id       : 'headingDescription',
		Header   : '',
		key      : 'headingDescription',
		accessor : (record) => (
			<div className={styles.dihvs_code}>
				{record?.headingCode}
				{record?.headingDescription}
			</div>
		),
	},
];
