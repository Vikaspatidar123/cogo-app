import DemoIcon from './demoIcon.svg';
import CustomTooltip from '../CustomTooltip';

import { Container, A } from './styles';

function DemoVideos() {
	return (
		<CustomTooltip message="Platform Demo">
			<Container>
				<A href="/demo">
					<DemoIcon width="18px" height="18px" />
				</A>
			</Container>
		</CustomTooltip>
	);
}

export default DemoVideos;
