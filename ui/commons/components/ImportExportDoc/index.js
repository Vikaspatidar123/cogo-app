import { TabPanel, Tabs, cl } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import Documents from './Documents';
import styles from './styles.module.css';

function ImportExportDoc({ documents = [], EmptyState, hsNumber, modeOfTransport, isModal = false }) {
	const [activeTab, setActiveTab] = useState('IMPORT');

	const [docVal, setDocVal] = useState({
		importDocs : [],
		exportDocs : [],
	});

	const TAB_MAPPING = {
		IMPORT : docVal.importDocs,
		EXPORT : docVal.exportDocs,
	};

	useEffect(() => {
		if (!isEmpty(documents)) {
			const impDoc = [];
			const expDoc = [];

			documents.forEach((doc) => {
				if (doc?.tradeType === 'IMPORT') {
					impDoc.push(doc);
				} else {
					expDoc.push(doc);
				}
			});

			setDocVal({
				importDocs : impDoc,
				exportDocs : expDoc,
			});
		}
	}, [documents]);

	return (
		<>
			<div className={styles.flex_box}>
				<div className={styles.tabs}>
					<Tabs
						activeTab={activeTab}
						themeType="tertiary"
						onChange={setActiveTab}
					>
						{/* <TabPanel name="IMPORT" title={t('importExportDoc:result_tab_1')} />
					<TabPanel name="EXPORT" title={t('importExportDoc:result_tab_2')} /> */}
						<TabPanel name="IMPORT" title="Import" />
						<TabPanel name="EXPORT" title="Export" />
					</Tabs>
				</div>
				<div className={styles.tag_container}>
					<div className={cl`${styles.tag} ${styles.transport_mode}`}>
						{/* {t('importExportDoc:document_control_transport_label')} */}
						Mode of Transport:
						:
						{' '}
						{modeOfTransport}
					</div>
					{hsNumber && (
						<div className={styles.tag}>
							{/* {t('importExportDoc:document_control_hscode_label')} */}
							Hs Code:
							:
							{' '}
							{hsNumber}
						</div>
					)}
				</div>
			</div>
			<div className={cl`${styles.doc_container} ${isModal ? styles.scroll : ''}`}>
				{!isEmpty(TAB_MAPPING[activeTab])
					? TAB_MAPPING[activeTab].map((doc, index) => (
						<Documents key={`${doc?.docLink}_${index + 1}`} doc={doc} hsNumber={hsNumber} />
					))
					: <EmptyState />}
			</div>

		</>
	);
}

export default ImportExportDoc;
