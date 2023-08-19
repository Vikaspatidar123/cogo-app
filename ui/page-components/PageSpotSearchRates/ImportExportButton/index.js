import { useState } from 'react';

import styles from './styles.module.css';

// import { useTranslation } from '@/ui/components/LocaleTranslationContext';

function ImportExportButton({ activetab }) {
	// const { t } = useTranslation(['insurance']);
	const [activeTab, setActiveTab] = useState('Import');

	const handleTabClick = (tab) => {
		activetab(tab);
		setActiveTab(tab);
	};

	return (
		<div className={styles.main_container}>
			<div
				className={styles.border_button}
			>
				<div className={styles.gtp_container_button}>
					<button
						onClick={() => handleTabClick('Import')}
						className={activeTab === 'Import' ? styles.active : styles.inactive}
					>
						<span style={{ fontSize: 12 }}>
							Import
						</span>
					</button>
					<button
						onClick={() => handleTabClick('Export')}
						className={activeTab === 'Export' ? styles.active : styles.inactive}
					>
						<span style={{ fontSize: 12 }}>
							Export
						</span>
					</button>
				</div>
			</div>
		</div>
	);
}

export default ImportExportButton;
