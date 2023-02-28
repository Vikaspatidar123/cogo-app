import React from 'react';

import styles from './styles.module.css';

function Card({ teamMembers }) {
	return (
		<div className={styles.main_container}>
			{teamMembers.map((val) => (
				<div className={styles.container}>
					Name :
					{' '}
					{val?.contact_name}
					<div>
						Email :
						{' '}
						{val?.email}
					</div>
				</div>
			))}
		</div>
	);
}

export default Card;
