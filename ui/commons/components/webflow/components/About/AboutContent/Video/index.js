import React from 'react';

import SingleVideo from './SingleVideo';
import styles from './styles.module.css';

function Video({ videos, showDescription, showThumbNail, showVideo }) {
	return (
		<div className={`${styles.container} ${showThumbNail ? 'flex' : ''}`}>
			{(videos || []).map((video, i) => (
				<SingleVideo
					key={`single_video_${i + 1}`}
					video={video}
					showDescription={showDescription}
					showThumbNail={showThumbNail}
					showVideo={showVideo}
					index={i + 1}
				/>
			))}
		</div>
	);
}

export default Video;
