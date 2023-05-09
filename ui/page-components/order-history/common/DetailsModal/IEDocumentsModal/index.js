import { TabPanel, Tabs } from '@cogoport/components';
import { useState } from 'react';

import Document from './Document';
import styles from './styles.module.css';

function IEDocumentsModal({ tradeEngineResponse = {} }) {
	const [activeTab, setActiveTab] = useState('IMPORT');

	const { modeOfTransport = '', lineItem = [] } = tradeEngineResponse;
	const { hsNumber = '', documents = [] } = lineItem?.[0] || {};

	const importDoc = documents.filter((doc) => doc?.tradeType === 'IMPORT');
	const exportDoc = documents.filter((doc) => doc?.tradeType === 'EXPORT');

	return (
		<div className={styles.container}>
			{documents.length > 0 ? (
				<>
					<div className={styles.modal_header}>
						<div className={styles.tabs}>
							<Tabs
								activeTab={activeTab}
								themeType="primary"
								onChange={setActiveTab}
							>
								<TabPanel name="IMPORT" title="Import" />
								<TabPanel name="EXPORT" title="Export" />
							</Tabs>
						</div>
						<div className={styles.tag_container}>
							<div className={`${styles.tag} ${styles.transport_mode}`}>
								Mode of Transport:
								{' '}
								{modeOfTransport}
							</div>
							<div className={styles.tag}>
								Hs Code:
								{' '}
								{hsNumber}
							</div>
						</div>
					</div>
					<div>
						{activeTab === 'IMPORT'
							&& (
								<div>
									{importDoc?.length > 0 ? (importDoc.map((doc) => (
										<Document key={doc?.docLink} doc={doc} hsNumber={hsNumber} />
									))) : (
										<div>
											<img
												className={styles.empty_state}
												src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/empty_icon 1.svg"
												alt="No Data Found"
											/>
										</div>
									)}
								</div>
							) }
						{activeTab === 'EXPORT'
							&& (
								<div>
									{exportDoc?.length > 0 ? (exportDoc.map((doc) => (
										<Document key={doc?.docLink} doc={doc} hsNumber={hsNumber} />
									))) : (
										<div>
											<img
												className={styles.empty_state}
												src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/empty_icon 1.svg"
												alt="No Data Found"
											/>
										</div>
									)}
								</div>
							) }
					</div>
				</>
			) : (
				<div>
					<img
						src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/empty_icon 1.svg"
						alt="loading"
						className={styles.empty_state}
					/>
				</div>
			)}
		</div>
	);
}

export default IEDocumentsModal;
