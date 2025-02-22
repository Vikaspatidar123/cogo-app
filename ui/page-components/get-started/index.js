import React, { useState } from 'react';

import LeftPanel from '../../commons/components/LeftPanel';

import BillingAddress from './components/BillingAddressForm';
import InviteTeam from './components/InviteTeam';
import Organization from './components/Organization';
import SetTimeForCall from './components/SetTimeForCall';
import styles from './styles.module.css';

function GetStarted() {
	const [billingAddressDetails, setBillingAddressDetails] = useState(false);
	const [inviteTeam, setInviteTeam] = useState(false);
	const [timeForCall, setTimeForCall] = useState(false);
	const [org, setOrg] = useState('');
	const [orgBranchId, setOrgBranchId] = useState('');
	return (
		<div className={styles.container}>
			<div className={styles.left_container}>
				<LeftPanel />
			</div>
			<div className={styles.right_container}>
				{!billingAddressDetails && !inviteTeam && !timeForCall && (
					<Organization
						setBillingAddressDetails={setBillingAddressDetails}
						setOrg={setOrg}
						setOrgBranchId={setOrgBranchId}
					/>
				)}
				{billingAddressDetails && !inviteTeam
					&& !timeForCall && <BillingAddress orgId={org?.id} setInviteTeam={setInviteTeam} />}
				{inviteTeam && !timeForCall && <InviteTeam org={org} setTimeForCall={setTimeForCall} />}
				{timeForCall && <SetTimeForCall orgBranchId={orgBranchId} orgId={org?.id} />}
			</div>
		</div>
	);
}

export default GetStarted;
