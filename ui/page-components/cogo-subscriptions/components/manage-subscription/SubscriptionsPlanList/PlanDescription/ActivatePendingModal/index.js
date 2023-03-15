import { Modal } from '@cogoport/components';

import styles from './styles.module.css';

function ActivatePendingModal({ activateLoading }) {
	return (
		<Modal className="primary md" show={activateLoading} closable={false}>
			<div className={styles.container}>
				<img src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/loading-banner.svg" alt="cogo" />
				<div className={styles.title}>Hang on! Activating your plan ...</div>
				<img src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/loading.svg" alt="cogo" />
			</div>
		</Modal>
	);
}

export default ActivatePendingModal;
