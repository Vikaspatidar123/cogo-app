import { Button, cl } from '@cogoport/components';
import { IcMTicket } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

const translationKey = 'common:components_header_tickets_list';

function EmptyStateTicketStructure({
	setModalData,
	listType = '',
	emptyText = '',
}) {
	const { t } = useTranslation(['common']);

	const listEmptyText = emptyText || t(`${translationKey}_empty_text`);

	return (
		<div
			className={cl`${styles.container} ${
				listType === 'create' ? styles.create_raise_box : ''
			}`}
		>
			<IcMTicket className={styles.icm_tag} />
			<div className={styles.ticket_label}>{listEmptyText}</div>
			{listType !== 'create' && (
				<Button
					themeType="secondary"
					className={styles.ticket_raise_button}
					onClick={() => setModalData({ type: 'raise_a_ticket' })}
				>
					{t(`${translationKey}_create_ticket`)}
				</Button>
			)}
		</div>
	);
}

export default EmptyStateTicketStructure;
