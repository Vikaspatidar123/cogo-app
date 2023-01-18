import { useSelector } from '@cogoport/front/store';
import {
	BottomCirclesContainer,
	Container,
	Content,
	ImageContainer,
	LeftLinesContainer,
	RightLinesContainer,
	HeaderText,
	ContentContainer,
} from './styles';
import KycIcon from '../../../icons/submit-kyc-phone.svg';
import LeftLines from '../../../icons/left-lines.svg';
import RightLines from '../../../icons/right-lines.svg';
import BottomCircles from '../../../icons/bottom-circles.svg';

function Header() {
	const {
		general: { isMobile },
	} = useSelector((state) => state);

	return (
		<Container>
			<LeftLinesContainer>
				<LeftLines
					style={{ width: isMobile ? 35 : 56, height: isMobile ? 35 : 62 }}
				/>
			</LeftLinesContainer>

			<RightLinesContainer>
				<RightLines
					style={{ width: isMobile ? 50 : 74, height: isMobile ? 50 : 74 }}
				/>
			</RightLinesContainer>

			<BottomCirclesContainer>
				<BottomCircles style={{ width: 156, height: 156 }} />
			</BottomCirclesContainer>

			<ContentContainer>
				<HeaderText>KYC Under Approval</HeaderText>

				<Content>
					Your information has been submitted with us. We will be finishing your
					<span className="bold"> KYC soon</span>, after which you can search
					rates and book shipments from the platform.
				</Content>
			</ContentContainer>

			<ImageContainer>
				<KycIcon
					style={{ width: isMobile ? 100 : 400, height: isMobile ? 100 : 400 }}
				/>
			</ImageContainer>
		</Container>
	);
}

export default Header;
