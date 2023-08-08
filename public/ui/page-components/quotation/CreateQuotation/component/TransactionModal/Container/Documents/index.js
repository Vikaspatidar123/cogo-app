import { cl, Toggle } from '@cogoport/components';
import { useEffect, useState } from 'react';

import iconUrl from '../../../../../utils/iconUrl.json';
import styles from '../Controls/styles.module.css';

import DrillDown from './DrillDown';

function Docuemnts({ documents = [], hsNumber = '' }) {
	const [labeledValue, setLabeledValue] = useState('Import');
	const [importDoc, setImportDoc] = useState([]);
	const [exportDoc, setExportDoc] = useState([]);

	useEffect(() => {
		setImportDoc((documents || []).filter((x) => x.tradeType === 'IMPORT'));
		setExportDoc((documents || []).filter((x) => x.tradeType === 'EXPORT'));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>

			<div className={cl`${styles.flex_box} ${styles.title_container}`}>
				<div className={styles.flex_box}>
					<img
						className={styles.image}
						src={iconUrl?.iedoc}
						alt="icon"
					/>
					Import/Export Documents
				</div>
				<div className={styles.toggle}>
					<Toggle
						offLabel="Import"
						onLabel="Export"
						value={labeledValue}
						onChange={(e) => {
							if (e.target.checked) setLabeledValue('Export');
							else setLabeledValue('Import');
						}}
					/>
				</div>
			</div>
			<div className={styles.container}>
				{documents?.length > 0 ? (
					<>
						<div className={cl`${styles.flex_box} ${styles.doc_row} `}>
							<div className={styles.col} style={{ width: '30%' }}>
								<div className={`${styles.col_info} ${styles.col_info_name}`}>Name</div>
							</div>
							<div className={styles.col} style={{ width: '30%' }}>
								<div className={styles.col_info}>DESCRIPTION</div>
							</div>
							<div className={styles.col} style={{ width: '8%' }}>
								<div className={styles.col_info}>SOURCE</div>
							</div>
							<div className={styles.col} style={{ width: '12%' }}>
								<div className={styles.col_info}>PDF LINK</div>
							</div>
						</div>
						<div className={styles.doc_section}>
							{((labeledValue === 'Import' ? importDoc : exportDoc) || []).map((item) => (
								<DrillDown item={item} hsNumber={hsNumber} />
							))}
						</div>
					</>
				) : (
					<div className={styles.flex_box} style={{ height: '180px' }}>
						<div className={styles.sorry}>Not Subscribed</div>
					</div>
				)}
			</div>
		</>
	);
}

export default Docuemnts;
