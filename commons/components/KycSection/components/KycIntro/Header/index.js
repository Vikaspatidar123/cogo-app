import { Button } from '@cogoport/front/components/admin';
import { useSelector } from '@cogoport/front/store';
import useKycIntro from '../useKycIntro';
import {
	BackgroundImage,
	BackgroundImageContainer,
	ButtonContainer,
	Container,
	Content,
	HeaderText,
	KycSubText,
	KycText,
} from './styles';

function Header({ kycDetails = {}, setKycDetails = () => {} }) {
	const {
		general: { isMobile },
	} = useSelector((state) => state);

	const { handleStartKYC, startKYCVerificationLoading } = useKycIntro({
		setKycDetails,
		kycDetails,
	});

	const backgroundImageUrl =
		'https://cogoport-production.sgp1.digitaloceanspaces.com/88a94b52ad7d017883e6328102d48e3d/kyc-icon.svg';

	return (
		<Container>
			<Content>
				<HeaderText>
					Thank you for choosing Cogoport as a partner. We strive to help you
					grow your business.
				</HeaderText>

				<KycText>
					Complete your <span className="kyc">KYC!</span>
				</KycText>

				<KycSubText>
					Final step to unlocking your potential with{' '}
					<span className="bold">COGOPORT.</span>
				</KycSubText>

				<ButtonContainer>
					<Button
						onClick={handleStartKYC}
						disabled={startKYCVerificationLoading}
						style={{ fontWeight: 700, fontSize: 14, color: '#113B51' }}
						className={isMobile ? 'secondary sm' : 'secondary lg'}
					>
						COMPLETE KYC NOW
					</Button>
				</ButtonContainer>
			</Content>

			<BackgroundImageContainer>
				<BackgroundImage backgroundImageUrl={backgroundImageUrl} />
			</BackgroundImageContainer>
		</Container>
	);
}

export default Header;
