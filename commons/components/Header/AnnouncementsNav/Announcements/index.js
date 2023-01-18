import Text from '@cogoport/front/components/Text';

import YoutubeEmbed from './YoutubeEmbed';

import {
	Container,
	Close,
	Header,
	MainContainer,
	Ship,
	Content,
	Line,
} from './styles';

function Announcements({ show, onClose = () => {} }) {
	return (
		<Container show={show}>
			<Header>
				<Text size="16px" font-weight="bold">
					Announcements
				</Text>
				<Close width="12px" height="12px" onClick={onClose} />
			</Header>
			<Line />
			<MainContainer>
				<Content>
					<Ship />
					<Text size="16px" color="#828282" margin="-4px 0px 0px 20px">
						Real Time Cargo Tracking and Monitoring
					</Text>
				</Content>
				<YoutubeEmbed />
				<Text size="12px" margin="16px 0px 0px 48px" color="#647596">
					It provides the exact location of a transport vehicle or goods
					shipment at the present moment (or close to it). Real-time location
					data is repeatedly pulled and uploaded to a server after a set number
					of minutes, hours, or days.
				</Text>
			</MainContainer>
		</Container>
	);
}

export default Announcements;
