import React from 'react';

import styles from './styles.module.css';

import { useSelector } from '@/packages/store';

function Card() {
	const { scope, organization, agent, skippable_checks } = useSelector(({ general, profile }) => ({
		scope            : general.scope,
		organization     : profile?.organization || {},
		skippable_checks : profile?.organization?.skippable_checks,
		agent            : profile?.organization?.agent,
	}));

	const goTo = (href) => {
		if (typeof window !== 'undefined') {
			window.open(href);
		}
	};

	if (scope === 'app' && !organization?.agent_id) {
		return null;
	}

	const showRmDetails = Object.keys(agent || {}).length && !(skippable_checks || []).includes('hide_rm_detail');

	return (
		<>
			{' '}
			{showRmDetails ? (
				<div className={styles.container}>
					<div className={styles.title}>
						<span style={{ fontWeight: 'normal' }}>Can’t find the right fit?</span>
						Contact Your Key Account Manager Now.
					</div>

					<div className={styles.description}>
						For extra destination free days, specific carrier, or a better rate.
					</div>

					<div className={styles.action_container}>
						<div
							className={styles.action}
							role="presentation"
							onClick={() => goTo(`mailto:${organization?.agent?.email}`)}
							style={{ display: 'inline' }}
						>
							{`Name : ${organization?.agent?.name},`}
							{' '}
							{`Email : ${organization?.agent?.email},`}
						</div>

						{organization?.agent?.mobile_number && (
							<div
								role="presentation"
								className={styles.action}
								onClick={() => goTo(`tel:${organization?.agent?.mobile_number}`)}
								style={{ display: 'inline', paddingLeft: 0 }}
							>
								{`Phone/WhatsApp :
								 ${organization?.agent?.mobile_country_code} ${organization?.agent?.mobile_number}`}
							</div>
						)}
					</div>
				</div>
			) : null}
		</>
	);
}

export default Card;
