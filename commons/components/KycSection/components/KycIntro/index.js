import Body from './Body';
import Header from './Header';
import PlatformDemo from '../PlatformDemo';

function KycIntro({ setKycDetails = () => {}, kycDetails = {} }) {
	return (
		<>
			<Header kycDetails={kycDetails} setKycDetails={setKycDetails} />
			<Body />
			<PlatformDemo />
		</>
	);
}

export default KycIntro;
