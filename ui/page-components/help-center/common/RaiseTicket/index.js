import { Button, cl } from '@cogoport/components';

import styles from './styles.module.css';

import { useSelector } from '@/packages/store';

function RaiseTicket({ setModalData = () => {}, isDashboard = false }) {
	const { isMobile } = useSelector((state) => state.general);

	if (isMobile) {
		return null;
	}

	return (
		<div
			className={cl`${styles.container} ${
				isDashboard ? styles.dashboard_styles : ''
			}`}
		>
			<div className={styles.text_container}>
				<div className={styles.sub_header}>Still can&apos;t find an answer?</div>
				<div className={styles.label}>
					<span>Submit a ticket</span>
					and we&apos;ll get back to you.
				</div>
			</div>

			<div className={styles.ticket_container}>
				<Button
					size="lg"
					themeType="primary"
					className={styles.button_container}
					onClick={() => setModalData({ type: 'raise_a_ticket' })}
				>
					Raise A Tickets
				</Button>
			</div>
		</div>
	);
}

export default RaiseTicket;
