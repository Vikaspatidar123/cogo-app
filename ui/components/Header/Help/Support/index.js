import { isEmpty } from '@cogoport/front/utils';

import { useSelector } from '@cogoport/front/store';
import {
	Container,
	Title,
	Name,
	Label,
	Contact,
	Section,
	LinkText,
} from './styles';

function Support({ agent = {} }) {
	const {
		profile: { partner = {} },
		general: { query = {} },
	} = useSelector((state) => state);

	const { tnc_accepted } = partner;
	const { partner_id } = query;

	const default_agent = {
		name: 'Ayushi Mishra',
		email: 'support@cogoport.com',
		mobile_country_code: '+91',
		mobile_number: '8976761462',
		mobile_number_eformat: '918976761462',
	};

	const agentKey = isEmpty(agent) ? default_agent : agent;

	return (
		<Container>
			<Title>Need some personal assistance?</Title>

			<Section>
				<Name>{agentKey.name}</Name>
				<Label>
					{!isEmpty(agent) ? 'Key Relationship Manager' : 'Onboarding Expert'}
				</Label>
			</Section>
			<Section>
				<Contact href={`mailto:${agentKey.email}`}>{agentKey.email}</Contact>
			</Section>
			<Section>
				<Contact
					href={`tel:${
						agentKey.mobile_number || agentKey.mobile_number_eformat
					}`}
				>
					{`${agentKey.mobile_country_code} ${agentKey.mobile_number}`}
				</Contact>
			</Section>
			{tnc_accepted ? (
				<LinkText href={`/${partner_id}/faqs`}>FAQs</LinkText>
			) : null}
		</Container>
	);
}

export default Support;
