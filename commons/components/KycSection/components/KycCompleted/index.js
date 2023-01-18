import Blogs from '@/components/Dashboard/widgets/Blog';
import { MainContainer, BgImageContainer, BlogsContainer } from './styles';
import Header from './Header';
import PlatformDemo from '../PlatformDemo';

function KycCompleted() {
	return (
		<MainContainer>
			<BgImageContainer className="bg-kyc" />
			<Header />
			<PlatformDemo />

			<BlogsContainer>
				<Blogs />
			</BlogsContainer>
		</MainContainer>
	);
}

export default KycCompleted;
