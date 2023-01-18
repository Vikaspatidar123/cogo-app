import {
	Container,
	Content,
	ContentContainer,
	Heading,
	Text,
	VideoResponsive,
} from './styles';

function PlatformDemo() {
	return (
		<Container>
			<ContentContainer>
				<VideoResponsive>
					<iframe
						width="532"
						height="300"
						src="https://www.youtube.com/embed/-4pFI8psSI0"
						frameBorder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen
						title="Embedded youtube"
					/>
				</VideoResponsive>

				<Content>
					<Heading>Know the Platform</Heading>
					<Text>
						Cogoport Partner Platform will have a host of features unlocked
						after KYC. Get a glimpse of what is to come and utilize it to the
						fullest once your KYC is approved.
					</Text>
				</Content>
			</ContentContainer>
		</Container>
	);
}

export default PlatformDemo;
