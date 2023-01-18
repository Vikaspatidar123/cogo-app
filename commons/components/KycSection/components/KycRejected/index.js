import { Button } from '@cogoport/front/components/admin';
import { Container, Heading, Content, MainContainer } from './styles';
import KycRejectedIcon from '../../icons/kyc-rejected.svg';

function KycCompleted() {
	return (
		<MainContainer>
			<Container>
				<KycRejectedIcon
					style={{ width: 145, height: 145, marginBottom: 24 }}
				/>
				<Heading>KYC Rejected!</Heading>
				<Content>
					We could not approve your KYC due to the following reason: Please
					update the details in order to get your account KYC verified.
				</Content>
				<Button style={{ marginTop: 24 }}>UPDATE DETAILS</Button>
			</Container>
		</MainContainer>
	);
}

export default KycCompleted;
