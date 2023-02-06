import React, { useState } from 'react';

import LeftPanel from '../common/LeftPanel';

import BillingAddress from './components/BillingAddressForm';
import InviteTeam from './components/InviteTeam';
import Organization from './components/Organization';
import SetTimeForCall from './components/SetTimeForCall';
import styles from './styles.module.css';

function GetStarted() {
	const [billingAddressDetails, setBillingAddressDetails] = useState(true);
	const [inviteTeam, setInviteTeam] = useState(true);
	const [timeForCall, setTimeForCall] = useState(true);
	const [orgId, setOrgId] = useState('');

	return (
		<div className={styles.container}>
			<div className={styles.left_container}>
				<LeftPanel />
			</div>
			<div className={styles.right_container}>
				{!billingAddressDetails && !inviteTeam && !timeForCall && (
					<Organization
						setBillingAddressDetails={setBillingAddressDetails}
						setOrgId={setOrgId}
					/>
				)}
				{billingAddressDetails && !inviteTeam
				&& !timeForCall && <BillingAddress orgId={orgId} setInviteTeam={setInviteTeam} />}
				{inviteTeam && !timeForCall && <InviteTeam orgId={orgId} setTimeForCall={setTimeForCall} />}
				{timeForCall && <SetTimeForCall />}
			</div>
		</div>
	);
}

export default GetStarted;
