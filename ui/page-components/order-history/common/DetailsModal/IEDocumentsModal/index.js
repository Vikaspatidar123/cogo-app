import { Modal, TabPanel, Tabs } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useMemo, useState } from 'react';

import EmptyState from '../../EmptyState';

import Document from './Document';
import styles from './styles.module.css';

const importDoc = [];
const exportDoc = [];

const TAB_MAPPING = {
	IMPORT : importDoc,
	EXPORT : exportDoc,
};

function IEDocumentsModal({ tradeEngineResponse = {} }) {
	const [activeTab, setActiveTab] = useState('IMPORT');

	const { modeOfTransport = '', lineItem = [] } = tradeEngineResponse;
	const { hsNumber = '', documents = [] } = lineItem?.[0] || {};

	useMemo(() => {
		(documents || []).forEach((doc) => {
			if (doc?.tradeType === 'IMPORT') {
				importDoc.push(doc);
			} else {
				exportDoc.push(doc);
			}
		});
	}, [documents]);

	return (
		<div className={styles.container}>
			{!isEmpty(documents) ? (
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
							<div
								className={`${styles.tag} ${styles.transport_mode}`}
							>
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
					<Modal.Body>
						<div>
							<div>
								{isEmpty(TAB_MAPPING?.[activeTab]) ? (
									<EmptyState />
								) : (
									TAB_MAPPING?.[activeTab].map((doc) => (
										<Document key={doc?.docLink} doc={doc} hsNumber={hsNumber} />
									))
								)}
							</div>
						</div>
					</Modal.Body>
				</>
			) : (
				<EmptyState />
			)}
		</div>
	);
}

export default IEDocumentsModal;
