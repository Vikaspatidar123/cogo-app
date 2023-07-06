import { Button, cl } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

import { useSelector } from '@/packages/store';

const translationKey = 'helpCenter:raise_ticket_component';

function RaiseTicket({ setModalData = () => {}, isDashboard = false }) {
	const { t } = useTranslation(['helpCenter']);

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
				<div className={styles.sub_header}>{t(`${translationKey}_cant_find_answer`)}</div>
				<div className={styles.label}>
					<span>{t(`${translationKey}_submit_ticket`)}</span>
					{t(`${translationKey}_submit_after_text`)}
				</div>
			</div>

			<div className={styles.ticket_container}>
				<Button
					size="lg"
					themeType="primary"
					className={styles.button_container}
					onClick={() => setModalData({ type: 'raise_a_ticket' })}
				>
					{t(`${translationKey}_raise_ticket`)}
				</Button>
			</div>
		</div>
	);
}

export default RaiseTicket;
