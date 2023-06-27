import React from 'react';

import styles from './styles.module.css';

function FormCard({
	componentMapping,
	active,
	getCreditRequestResponse,
	refetch,
	rest,
}) {
	return (
		<div className={styles.container}>
			{(componentMapping.map(({ title, description, Component, leftChildern }) => (
				<div className={styles.flex_div}>
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
							{...rest}
						/>
					</div>
				</div>
			)))}
		</div>
	);
}

export default FormCard;
