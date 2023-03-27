import React from 'react';
import { useSelector } from '@cogo/store';
import { Container, Title, Description, Action, ActionContainer } from './styles';

const Card = () => {
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
			{showRmDetails ? (
				<Container>
					<Title>
						<span style={{ fontWeight: 'normal' }}>Can’t find the right fit?</span> Contact Your Key Account Manager Now.
					</Title>

					<Description>
						For extra destination free days, specific carrier, or a better rate.
					</Description>

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
				</Container>
			) : null}
		</>
	);
};

export default Card;
