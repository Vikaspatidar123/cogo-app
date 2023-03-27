import React from 'react';
import { useSelector } from '@cogo/store';
import { IcCSendWhatsapp, IcMEmail } from '@cogoport/icons-react';
import {
	Container,
	UserName,
	Line,
	Description,
	SpaceBetween,
	IconsContainer,
} from './styles';

const RM = () => {
	const { agent, kyc_status } = useSelector(({ profile }) => ({
		account_type: profile?.organization?.account_type,
		agent: profile?.organization?.agent,
		user_name: profile.name,
		kyc_status: profile?.organization?.kyc_status,
	}));

	const goTo = (href) => {
		if (typeof window !== 'undefined') {
			window.open(href);
		}
	};

	if (!agent || kyc_status !== 'verified') {
		return null;
	}

	return (
		<Container>
			<div style={{ padding: '0px 12px' }}>
				<UserName className="assistance">
					Do you need some personal assistance?
				</UserName>
			</div>

			<Line />

			<div style={{ padding: '0px 12px' }}>
				<UserName className="rm-name">{agent?.name}</UserName>

				<UserName className="rm-designation">Key Relationship Manager</UserName>

				{agent?.mobile_country_code ? (
					<SpaceBetween onClick={() => goTo(`mailto:${agent?.email}`)}>
						<Description className="link">{agent?.email}</Description>

						<IconsContainer>
							<IcMEmail />
						</IconsContainer>
					</SpaceBetween>
				) : null}

				{agent?.mobile_country_code ? (
					<SpaceBetween onClick={() => goTo(`tel:${agent?.mobile_number}`)}>
						<Description className="link">
							{agent?.mobile_country_code} {agent?.mobile_number}
						</Description>

						<IconsContainer>
							<IcCSendWhatsapp />
						</IconsContainer>
					</SpaceBetween>
				) : null}
			</div>
		</Container>
	);
};

export default RM;
