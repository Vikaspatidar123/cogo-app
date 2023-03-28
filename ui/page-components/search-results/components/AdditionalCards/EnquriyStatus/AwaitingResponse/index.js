import React, { useState } from 'react';

import MultiServiceEnquiry from '../../MultiService';

import styles from './styles.module.css';

function AwaitingResponse({
	data = {},
	refetch = () => {},
	enquiryQuota = {},
}) {
	const {
		negotiation_revert_time_remaning,
		rates_count,
		negotiation_reverts_count,
		negotiation_status,
	} = data;

	const [showEdit, setEdit] = useState(false);

	const dt = new Date();
	dt.setSeconds(dt.getSeconds() + negotiation_revert_time_remaning);
	const closeReason =		data?.spot_negotiation?.skip_remarks?.[0]?.close_reason
		|| 'Auto Closed by system';

	let title =		negotiation_status === 'completed'
		? 'Enquiry revert has been completed by supply team'
		: 'Waiting for more reverts';
	const desc =		negotiation_status === 'completed'
		? closeReason
		: 'Your request is now processing and you should receive more reverts shortly';
	const description = <div>{desc}</div>;

	if (rates_count === 0) {
		title = 'You have successfully requested a rate.';
	}

	return (
		<div className={styles.container}>
			<div className={styles.Main}>
				{rates_count > 0 ? null : <Title>Success!!!</Title>}
				<div className={styles.Description}>{title}</div>
				<div className={styles.Description}>{description}</div>

				{rates_count > 0 ? (
					<div>
						<div className={styles.title}>
							Total Reverts :
							{negotiation_reverts_count || 0}
						</div>
					</div>
				) : null}
			</div>

			<div style={{ marginBottom: 15, marginTop: 30 }}>
				<Button onClick={() => setEdit(true)}>View Enquiry</Button>
			</div>

			{rates_count <= 0 ? (
				<div className={styles.bg} src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/person-with-phone.svg" />
			) : null}

			<MultiServiceEnquiry
				detail={data}
				enquiryQuota={enquiryQuota}
				show={showEdit}
				onClose={() => {
					setEdit(false);
					refetch();
				}}
				refetch={refetch}
			/>
		</div>
	);
}

export default AwaitingResponse;
