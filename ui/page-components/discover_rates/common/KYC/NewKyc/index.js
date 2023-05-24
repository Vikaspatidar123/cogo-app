import React from 'react';

import FormBody from './components/FormBody';
import styles from './styles.module.css';

import { useSelector } from '@/packages/store';

function NewKyc({ onFinalSubmit, showMobile = true, text, ...rest }) {
	const { scope, agent_id, organization, user_profile } = useSelector(({ general, profile }) => ({
		scope        : general?.scope,
		agent_id     : profile?.id,
		organization : profile?.organization,
		countryId    : profile?.organization?.country_id || profile?.partner?.country_id,
		user_profile : profile,
	}));

	const initialValues = {
		preferred_languages : user_profile?.preferred_languages,
		registration_number : user_profile?.organization?.registration_number,
		mobile              : {
			mobile_country_code : user_profile?.mobile_country_code,
			mobile_number       : user_profile?.mobile_number,
		},
		country_id   : user_profile?.organization?.country_id || user_profile?.partner?.country_id,
		country_code : organization?.country?.country_code,
	};

	return (
		<div className={styles.container}>
			<FormBody
				{...rest}
				{...initialValues}
				scope={scope}
				agent_id={agent_id}
				onFinalSubmit={onFinalSubmit}
				showMobile={showMobile}
				text={text}
			/>
		</div>
	);
}
export default NewKyc;
