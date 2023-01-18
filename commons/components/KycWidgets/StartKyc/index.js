import { Text } from '@cogoport/front/components';
import { useRouter } from '@/temp/next';
import { Button } from '@cogoport/front/components/admin';
import {
	Container,
	IconContainer,
	Header,
	InfoContainer,
	SvgContainer,
	ButtonContainer,
} from './styles';
import NewRibbonIcon from '../assets/new-ribbon-icon.svg';
import DocumentIcon from '../assets/document-icon.svg';

function StartKyc() {
	const { push } = useRouter();

	const handleStartKyc = () => {
		push('/submit-kyc');
	};

	return (
		<Container>
			<IconContainer>
				<NewRibbonIcon
					style={{
						width: 100,
						height: 50,
						marginTop: 8,
					}}
				/>
			</IconContainer>
			<Header>
				Submit your <span className="blue">KYC </span>
				easily, apply online in just a few minutes
			</Header>

			<InfoContainer>
				<SvgContainer>
					<DocumentIcon style={{ width: 24, height: 24 }} />
				</SvgContainer>

				<Text size={12}>
					After verification, you can search rates, book shipments, offer
					services & explore other exciting features.
				</Text>
			</InfoContainer>

			<ButtonContainer>
				<Button onClick={handleStartKyc}>Apply for kyc now</Button>
			</ButtonContainer>
		</Container>
	);
}
export default StartKyc;
