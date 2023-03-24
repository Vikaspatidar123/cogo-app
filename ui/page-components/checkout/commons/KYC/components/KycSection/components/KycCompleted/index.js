import KycCompletedIcon from '../../icons/kyc-completed.svg';

// import { Container, Heading, Content, MainContainer } from './styles';
import styles from './styles.module.css';

function KycCompleted() {
	return (
		<MainContainer>
			<Container>
				<KycCompletedIcon
					style={{ width: 145, height: 145, marginBottom: 24 }}
				/>
				<Heading>KYC Submission Completed!</Heading>
				<Content>
					Your information has been submitted with us. We will be finishing your
					KYC soon, after which you can search rates and book shipments from the
					platform.
				</Content>
			</Container>
		</MainContainer>
	);
}

export default KycCompleted;
