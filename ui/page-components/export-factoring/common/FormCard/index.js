import React from 'react';

import styles from './styles.module.css';

function FormCard(props) {
	const {
		componentMapping,
		active = {},
		getCreditRequestResponse = { },
		refetch = () => {},
	} = props;
	return (
		<div className={styles.container}>
			{(componentMapping.map(({ title, description, Component, leftChildern, hidden }) => (
				<div className={styles.flex_div} key={title}>
					<div>
						<div className={styles.title}>
							{title}
						</div>
						<div className={styles.description}>
							{description}
						</div>
						<div>
							{leftChildern}
						</div>
					</div>
					<div className={styles.content_div}>
						<Component
							active={active}
							getCreditRequestResponse={getCreditRequestResponse}
							refetch={refetch}
							hidden={hidden}
							{...props}
						/>
					</div>
				</div>
			)))}
		</div>
	);
}

export default FormCard;
