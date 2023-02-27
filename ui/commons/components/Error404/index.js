import { Button } from '@cogoport/components';

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function Error404() {
	const router = useRouter();

	return (
		<div className={styles.component}>
			<div className={styles.container}>
				<div className={styles.title}>404</div>
				<div className={styles.description}>Looks like you are off course</div>
				<div className={styles.button_container}>
					<Button onClick={() => router.back()}>Get back to base</Button>
				</div>
			</div>
		</div>
	);
}

export default Error404;
