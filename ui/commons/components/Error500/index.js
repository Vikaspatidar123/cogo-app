import { Button } from '@cogoport/components';

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function Error500() {
	const router = useRouter();

	return (
		<div className={styles.component}>
			<div className={styles.lighthouse} />
			<div className={styles.text_container}>
				<div className={styles.title}>Something went wrong</div>
				<div className={styles.description}>500 Internal Server Error</div>
				<div className={styles.button_container}>
					<Button onClick={() => router.back()} themeType="accent">
						Get back to base
					</Button>
				</div>
			</div>
		</div>
	);
}

export default Error500;
