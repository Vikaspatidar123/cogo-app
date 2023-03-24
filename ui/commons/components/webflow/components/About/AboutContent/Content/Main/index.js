import { IcMTick } from '@cogoport/icons-react';
import React from 'react';

import Actions from '../../Actions';
import Video from '../../Video';

import styles from './styles.module.css';

function Main({ data }) {
	return (
		<>
			{data.title && <div className={`${styles.title}${data.slug}`}>{data.title}</div>}
			{data.subtitle && (
				<div className={`${styles.sub_title} ${data.slug}`}>{data.subtitle}</div>
			)}
			{data['cover-video'] && (
				<div className={styles.main_video}>
					<Video videos={[data['cover-video']]} showDescription />
					{data['cover-video-image'] && (
						<div className={`${styles.video_caption} ${styles.video_caption}`}>
							{data['cover-video-image']}
						</div>
					)}
				</div>
			)}
			{data.list_items && (
				<div>
					<div className={styles.description}>{data.list_items.heading}</div>
					<div className={styles.ul}>
						{(data.list_items.points || []).map((item, i) => (
							<div className={styles.item} key={`list_items_${i + 1}`}>
								<IcMTick size={1.6} color="#adadad" />
								<div className={styles.label}>{item}</div>
							</div>
						))}
					</div>
				</div>
			)}
			{data['description1-2'] && (
				<div
					className={`${styles.description} ${data.slug} first`}
					dangerouslySetInnerHTML={{ __html: data['description1-2'] }}
				/>
			)}
			{data['related-images'] && (
				<div
					className={styles.related_videos}
					length={data['related-images'].length}
				>
					<Video
						videos={data['related-images'].map((item) => ({
							thumbnail: item.url,
						}))}
						showVideo={false}
						showThumbNail
					/>
				</div>
			)}
			{data['description2-2'] && (
				<div
					className={`${styles.description} ${styles.second}`}
					dangerouslySetInnerHTML={{ __html: data['description2-2'] }}
				/>
			)}
			{data['action-text'] && (
				<div className={styles.action_container}>
					<Actions
						actions={[
							{
								link         : { href: data['action-url'], as: data['action-url'] },
								display_text : data['action-text'],
								type         : data['action-url'] ? 'link' : null,
							},
						]}
						className={data.slug}
					/>
				</div>
			)}
		</>
	);
}

export default Main;
