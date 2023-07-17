import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function BottomContainer() {
	const { query } = useRouter();
	const { period } = query || {};
	return (
		<div className={styles.bottom_container}>
			<div className={styles.text_1}>
				We are delighted to have you as a valued member of our community.
			</div>
			<div>
				With this subscription plan, you will gain access to exclusive features and content on
				a
				{' '}
				<b>{period === 'annual' ? 'yearly' : period}</b>
				{' '}
				basis until you decide to cancel.
			</div>
			<div>
				Enjoy the convenience of automatic billing,
				which ensures uninterrupted access to our top-notch services.
			</div>
		</div>
	);
}

export default BottomContainer;
