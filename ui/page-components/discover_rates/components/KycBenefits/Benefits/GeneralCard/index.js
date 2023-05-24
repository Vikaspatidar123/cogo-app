import { cl } from '@cogoport/components';
import React from 'react';

import Icons from './Icons';
import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function FeatureCard({
	title = 'title of card (title)',
	description = 'description for card(description)',
	icon = null,
	style,
	...rest
}) {
	const Router = useRouter();
	return (
		<div
			style={style}
			className={cl`${styles.container}${styles.featurecard_container} ${
				!icon ? styles.no_icon : ''
			}`}
			role="presentation"
			onClick={rest.href && rest.as
				? () => {
					Router.push(rest?.href, rest?.as);
				}
				: undefined}
		>
			<div className={styles.flex}>
				{icon ? <Icons icon={icon} /> : null}
				<div
					className={cl`${styles.content}${styles.featurecard_container} ${!icon ? styles.no_icon : ''
					}`}
				>
					<p className={cl`${styles.heading}${styles.featurecard_container}`}>
						{title}
					</p>
					<p className={cl`${styles.description}${styles.featurecard_container}`}>
						{description}
					</p>
				</div>
			</div>
		</div>
	);
}
export default FeatureCard;
