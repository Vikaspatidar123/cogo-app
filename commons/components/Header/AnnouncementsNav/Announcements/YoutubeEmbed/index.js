import { VideoResponsive } from './styles';

function YoutubeEmbed() {
	return (
		<VideoResponsive>
			<iframe
				width="853"
				height="480"
				src="https://www.youtube.com/embed/-4pFI8psSI0"
				frameBorder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowFullScreen
				title="Embedded youtube"
			/>
		</VideoResponsive>
	);
}

export default YoutubeEmbed;
