import { useRouter } from '@/temp/next';
import { Button } from '@cogoport/front/components/admin';
import {
	Container,
	IconContainer,
	Header,
	ButtonContainer,
	ContentText,
	InfoContainer,
	SvgContainer,
	TextContainer,
	InfoText,
} from './styles';
import NewRibbonIcon from '../assets/new-ribbon-icon.svg';
import DocumentIcon from '../assets/document-icon2.svg';

function CompleteKyc() {
	const { push } = useRouter();

	const handleCompleteKyc = () => {
		push('/submit-kyc');
	};

	const getMainContent = () => {
		return (
			<>
				<Header>KYC Submission Pending,</Header>
				<ContentText>
					Please fill all the details to complete your KYC
				</ContentText>
			</>
		);
	};

	return (
		<Container>
			<IconContainer>
				<NewRibbonIcon style={{ width: 100, height: 50, marginTop: 8 }} />
			</IconContainer>

			{getMainContent()}

			<InfoContainer>
				<SvgContainer>
					<DocumentIcon style={{ width: 24, height: 24 }} />
				</SvgContainer>

				<TextContainer>
					<InfoText>Your KYC is yet to be completed.</InfoText>
				</TextContainer>
			</InfoContainer>

			<ButtonContainer>
				<Button onClick={handleCompleteKyc}>Complete kyc submission</Button>
			</ButtonContainer>
		</Container>
	);
}

export default CompleteKyc;
