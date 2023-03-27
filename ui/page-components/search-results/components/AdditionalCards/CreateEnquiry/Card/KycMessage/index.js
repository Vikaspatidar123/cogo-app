import React from 'react';
import { Link } from '@cogo/next';
import { Container, Title, Description, Action } from './styles';

const KycMessage = () => (
	<Container>
		<Title>KYC Pending</Title>

		<Description>
			<span>
				Before you can create your request, we need some basic information about company. Don’t
				worry, you’ll also be able to update this information later.
			</span>

			<Link href="/kyc" passHref>
				<Action>Complete KYC</Action>
			</Link>
		</Description>
	</Container>
);

export default KycMessage;
