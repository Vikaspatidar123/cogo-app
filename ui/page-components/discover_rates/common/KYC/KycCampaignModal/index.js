import { Modal } from '@cogoport/components';
import React, { useState } from 'react';

import FormBody from './FormBody';
import styles from './styles.module.css';

import { useSelector } from '@/packages/store';

export function KycCampaign({
	onFinalSubmit = () => { },
	trackAnalytics = false,
}) {
	const { agent_id, organization, user_profile } = useSelector(
		({ profile }) => ({
			agent_id     : profile?.id,
			organization : profile?.organization,
			countryId:
				profile?.organization?.country_id || profile?.partner?.country_id,
			user_profile: profile,
		}),
	);
	const { country } = organization || {};
	const {
		organization:user_organization, preferred_languages,
		mobile_country_code, mobile_number, partner,
	} = user_profile || {};
	const initialValues = {
		preferred_languages,
		registration_number : user_organization?.registration_number,
		mobile              : {
			mobile_country_code,
			mobile_number,
		},
		country_id:
		user_organization?.country_id
			|| partner?.country_id,
		country_code: country?.country_code,
	};
	const head = () => (
		<div>
			<div className={styles.head}>Get Additional Sport Searches for free!</div>
			<text className={styles.text}>
				We just need some additional details from you
			</text>
		</div>
	);
	return (
		<div className={styles.flex} style={{ padding: '8px' }}>
			<div className={styles.flex} style={{ marginBottom: '12px' }}>
				<Modal.Header title={head()} />
			</div>
			<FormBody
				{...initialValues}
				agent_id={agent_id}
				onFinalSubmit={onFinalSubmit}
				trackAnalytics={trackAnalytics}
			/>
		</div>
	);
}

export function KycCampaignModal({ trackAnalytics = false }) {
	const { isMobile, kyc_status } = useSelector(({ general, profile }) => ({
		isMobile   : general?.isMobile,
		kyc_status : profile?.organization?.kyc_status,
	}));
	const [show, setShow] = useState(false);

	return (
		<Modal
			scroll={false}
			show={
				(kyc_status === 'rejected' || kyc_status === 'pending_from_user')
				&& show

			}
			onClose={() => {
				setShow(false);
			}}
			closable
			width={750}
			fullscreen={isMobile}
		>
			<KycCampaign
				trackAnalytics={trackAnalytics}
				onFinalSubmit={() => setShow(false)}
			/>
		</Modal>
	);
}
