import { Button } from '@cogoport/components';
import { IcMAppAddAccount } from '@cogoport/icons-react';

import styles from './styles.module.css';

function InviteTeam() {
	return (
		<div className={styles.container}>
			<div className={styles.main_box}>
				<div className={styles.box}>
					<IcMAppAddAccount />
					<div className={styles.text_box}>
						<span className={styles.text}>Invite Team Member</span>
						<div>Add Another user to your Team. Could be your Employee, Agent, Partner etc.</div>
					</div>
				</div>

				<Button>Login to Invite</Button>

			</div>
		</div>
	);
}
export default InviteTeam;
