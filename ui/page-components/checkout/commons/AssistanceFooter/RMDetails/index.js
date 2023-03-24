import { IcMAgentManagement } from '@cogoport/icons-react';

import ContactDetails from './ContactDetails';
import styles from './styles.module.css';

import { useSelector } from '@/packages/store';

function CheckoutRMDetails() {
	const { agent } = useSelector(({ profile }) => ({
		agent: profile.organization.agent,
	}));

	return (
		<div className={styles.container}>
			<div className={styles.label}>
				<IcMAgentManagement height={20} width={24} className="icon" />
				For any assistance contact your RM
			</div>
			<ContactDetails manager={agent} />
		</div>
	);
}

export default CheckoutRMDetails;
