import { cl, Button } from '@cogoport/components';
import { IcCFtick } from '@cogoport/icons-react';

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function SuccessModal() {
	const { push } = useRouter();

	const redirectToContract = () => {
		push('/contract-management?activetab=pending_approval');
	};

	return (
		<div className={styles.container}>
			<div className={styles.success_icon}>
				<IcCFtick />
			</div>
			<div className={styles.title}>
				Your Contract Request Created Succesfully
			</div>

			<div className={cl`${styles.title} ${styles.sub_title}`}>
				Check the status of Contracts in contract management
			</div>

			<div className={styles.action}>
				<Button onClick={redirectToContract}>
					Go to Contracts
				</Button>

			</div>
		</div>
	);
}

export default SuccessModal;
