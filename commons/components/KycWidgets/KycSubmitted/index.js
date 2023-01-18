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

function KycSubmitted() {
	const { push } = useRouter();

	const handleDiscoverRates = () => {
		push('/discover-rates');
	};

	const getMainContent = () => {
		return (
			<>
				<Header>KYC Verification Pending,</Header>
				<ContentText>Please wait till our team verifies your KYC</ContentText>
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
					<InfoText>Your KYC is yet to be verified.</InfoText>
				</TextContainer>
			</InfoContainer>

			<ButtonContainer>
				<Button onClick={handleDiscoverRates}>Discover Rates</Button>
			</ButtonContainer>
		</Container>
	);
}

export default KycSubmitted;
