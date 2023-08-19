import { Modal } from '@cogoport/components';

import styles from './styles.module.css';

import LoginTabs from '@/ui/page-components/authentication/components/Login/LoginTabs';

function LoginModal({ setShow, show, titleType }) {
	const title = (
		<div className={styles.head_box}>
			<div className={styles.title}>
				Login to
				{' '}
				{titleType}
			</div>
			<div>Download, View and Edit Preference after Login</div>
		</div>
	);
	return (
		<div className={styles.main_container}>
			<Modal
				show={show}
				onClose={() => setShow(false)}
				closeOnOuterClick={() => setShow(false)}
				size="sm"
			>
				<div className={styles.container}>
					<div>
						<LoginTabs title={title} />
					</div>
				</div>
			</Modal>
		</div>
	);
}

export default LoginModal;
