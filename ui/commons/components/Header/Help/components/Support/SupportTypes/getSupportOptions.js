import { IcMHelp, IcMTicket } from '@cogoport/icons-react';

import styles from './styles.module.css';

const getSupportOptions = () => [
	{
		name     : 'help_center',
		icon     : <IcMHelp className={styles.comments_icon} />,
		label    : 'Help Center',
		navigate : true,
	},
	{
		name  : 'raise_a_ticket',
		icon  : <IcMTicket className={styles.ticket_icon} />,
		label : 'Raise a ticket',
	},
];

export default getSupportOptions;
