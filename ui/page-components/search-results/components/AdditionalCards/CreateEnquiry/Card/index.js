import React from 'react';
import {  usePartnerEntityType } from '@cogo/commons/hooks';
import { useSelector } from '@cogo/store';
import EnquiryPlan from '../../MultiService/EnquiryPlan';
// import KycMessage from './KycMessage';
import { Container, Title, Description, Action, ActionContainer } from './styles';

const Card = ({ onClick = () => {}, enquiryQuota = {} }) => {
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
			{showRmDetails ? (
				<Container>
					<Title>
						<span style={{ fontWeight: 'normal' }}>
							Can’t find the right fit?
						</span>
						{scope === 'app' ? 'Contact Your Key Account Manager Now.' : ''}
					</Title>

					<Description>
						For extra destination free days, specific carrier, or a better rate.
					</Description>

					{(scope === 'partner' && (
						showEnquiryBtn
							? <Action onClick={handleClick}>+ Place Enquiry</Action>
							: <EnquiryPlan enquiryQuota={enquiryQuota} />
					)) || (
						<>
							<ActionContainer>
								<Action
									onClick={() => goTo(`mailto:${organization?.agent?.email}`)}
									style={{ display: 'inline' }}
								>
									{`Name : ${organization?.agent?.name},`} {`Email : ${organization?.agent?.email},`}
								</Action>

								{organization?.agent?.mobile_number && (
									<Action
										onClick={() => goTo(`tel:${organization?.agent?.mobile_number}`)}
										style={{ display: 'inline', paddingLeft: 0 }}
									>
										{`Phone/WhatsApp : ${organization?.agent?.mobile_country_code} ${organization?.agent?.mobile_number}`}
									</Action>
								)}
							</ActionContainer>
						</>
					)}

					{/* {showKycMessage && <KycMessage />} */}
				</Container>
			) : null}
		</>
	);
};

export default Card;
