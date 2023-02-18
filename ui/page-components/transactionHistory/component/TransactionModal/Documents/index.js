import { useState, useEffect } from 'react';

// import styles from '../Controls/styles.module.css';

import DrillDown from './DrillDown';

function Document({ documents = [], hsNumber = '' }) {
	const [labeledValue, setLabeledValue] = useState('IMPORT');
	const [importDoc, setImportDoc] = useState([]);
	const [exportDoc, setExportDoc] = useState([]);
	useEffect(() => {
		setImportDoc((documents || []).filter((x) => x.tradeType === 'IMPORT'));
		setExportDoc((documents || []).filter((x) => x.tradeType === 'EXPORT'));
	}, []);

	return (
		<>23</>

	// <div className={styles.container}>
	// 	<div className={styles.title_container}>
	// 		<div className="name">Import/Export Documents</div>
	// 		<div className="toggle">
	// 			<Toggle
	// 				offLabel={{ label: 'Import', value: 'IMPORT' }}
	// 				onLabel={{ label: 'Export', value: 'EXPORT' }}
	// 				value={labeledValue}
	// 				onChange={setLabeledValue}
	// 			/>
	// 		</div>
	// 	</div>
	// 	{documents?.length > 0 ? (
	// 		<div className={styles.section}>
	// 			{(labeledValue === 'IMPORT' ? importDoc : exportDoc).map((item) => (
	// 				<DrillDown item={item} hsNumber={hsNumber} />
	// 			))}
	// 		</div>
	// 	) : (
	// 		<div className={styles.section4}>
	// 			<div className={styles.text_total}>Not Subscribed</div>
	// 		</div>
	// 	)}
	// </div>
	);
}
export default Document;
