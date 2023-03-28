// import { usePartnerEntityType } from '@cogo/commons/hooks';
import React from 'react';

import EnquiryPlan from '../../MultiService/EnquiryPlan';

// import KycMessage from './KycMessage';
import styles from './styles.module.css';

import { useSelector } from '@/packages/store';

function Card({ onClick = () => {}, enquiryQuota = {} }) {
	const { scope, organization, skippable_checks, agent } = useSelector(({ general, profile }) => ({
		scope            : general.scope,
		organization     : profile?.organization || {},
		skippable_checks : profile?.organization?.skippable_checks,
		agent            : profile?.organization?.agent,
	}));
	const { isChannelPartner } = usePartnerEntityType();

	const handleClick = () => {
		onClick();
	};

	const goTo = (href) => {
		if (typeof window !== 'undefined') {
			window.open(href);
		}
	};

	if (scope === 'app' && !organization?.agent_id) {
		return null;
	}

	const showEnquiryBtn = (!isChannelPartner || enquiryQuota?.left_limit > 0);

	const showRmDetails = Object.keys(agent || {}).length && !(skippable_checks || []).includes('hide_rm_detail');

	return (
		<>
			{' '}
			{showRmDetails ? (
				<div className={styles.container}>
					<div className={styles.title}>
						<span style={{ fontWeight: 'normal' }}>
							Can’t find the right fit?
						</span>
						{scope === 'app' ? 'Contact Your Key Account Manager Now.' : ''}
					</div>

					<div className={styles.description}>
						For extra destination free days, specific carrier, or a better rate.
					</div>

					{(scope === 'partner' && (
						showEnquiryBtn
							? (
								<div
									role="presentation"
									className={styles.action}
									onClick={handleClick}
								>
									+ Place Enquiry
								</div>
							)
							: <EnquiryPlan enquiryQuota={enquiryQuota} />
					)) || (
						<div className={styles.action_container}>
							<div
								role="presentation"
								className={styles.action}
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
					)}

					{/* {showKycMessage && <KycMessage />} */}
				</div>
			) : null}
		</>
	);
}

export default Card;
