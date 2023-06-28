import CustomFileDiv from './CustomFileDiv';
import styles from './styles.module.css';

const FILE_TYPE_MAPPING = {
	image : ({ mediaUrl }) => <img className={styles.styled_image} src={mediaUrl} alt="attachment" />,
	audio : ({ mediaUrl, extension }) => (
		<audio controls className={styles.styled_audio}>
			<source src={mediaUrl} type={`audio/${extension}`} />
			<track src="" kind="captions" />
		</audio>
	),
	video: ({ mediaUrl, extension }) => (
		<video controls className={styles.styled_video}>
			<source src={mediaUrl} type={`video/${extension}`} />
			<track src="" kind="captions" />
		</video>
	),
	document: ({ mediaUrl }) => <CustomFileDiv mediaUrl={mediaUrl} />,
};

function FileViewMapping({
	mediaUrl = '',
	extension = '',
	messageType = '',
}) {
	const Media = FILE_TYPE_MAPPING[messageType] || null;

	if (!Media) {
		return null;
	}

	return (
		<div
			onClick={() => {
				window.open(mediaUrl, '_blank', 'noreferrer');
			}}
			className={styles.media_container}
			role="presentation"
		>
			<Media mediaUrl={mediaUrl} extension={extension} />
		</div>
	);
}

export default FileViewMapping;
