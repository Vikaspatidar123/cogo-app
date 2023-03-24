import React from 'react';

import styles from './styles';

function SingleVideo({
	video,
	showThumbNail,
	showDescription,
	showVideo,
	index,
}) {
	return (
		<div className={styles.content}>
			{showVideo && (
				<div
					className={styles.player_frame}
					src={`${video.url}?rel=0&modestbranding=1`}
					allowFullScreen="allowFullScreen"
					mozAllowFullScreen="mozAllowFullScreen"
					msAllowFullScreen="msAllowFullScreen"
					oAllowFullScreen="oAllowFullScreen"
					webkitAllowFullScreen="webkitAllowFullScreen"
				/>
			)}
			{showThumbNail && <div className={styles.thumbnail} src={video.thumbnail} index={index} />}
			{showDescription && <div className={styles.description}>{video.description}</div>}
		</div>
	);
}

export default SingleVideo;
