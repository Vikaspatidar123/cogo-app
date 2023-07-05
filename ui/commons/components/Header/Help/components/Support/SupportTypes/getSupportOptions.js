import { IcMHelp, IcMTicket } from '@cogoport/icons-react';

import styles from './styles.module.css';

const translationKey = 'common:components_header_tickets_support';

const getSupportOptions = ({ t }) => [
	{
		name     : 'help_center',
		icon     : <IcMHelp className={styles.comments_icon} />,
		label    : t(`${translationKey}_helpcenter`),
		navigate : true,
	},
	{
		name  : 'raise_a_ticket',
		icon  : <IcMTicket className={styles.ticket_icon} />,
		label : t(`${translationKey}_raise`),
	},
];

export default getSupportOptions;
