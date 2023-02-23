import { Modal } from '@cogoport/components';

import LoadingBanner from '../../../../../asset/loading-banner.svg';
import Loading from '../../../../../asset/loading.svg';

import styles from './styles.module.css';

function ActivatePendingModal({ activateLoading }) {
	return (
		<Modal className="primary md" show={activateLoading} closable={false}>
			<div className={styles.container}>
				<LoadingBanner width="300px" height="auto" />
				<div className={styles.title}>Hang on! Activating your plan ...</div>
				<Loading />
			</div>
		</Modal>
	);
}

export default ActivatePendingModal;
