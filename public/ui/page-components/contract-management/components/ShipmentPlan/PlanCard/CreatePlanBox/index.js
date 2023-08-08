import { IcMPlusInCircle } from '@cogoport/icons-react';
import React from 'react';

import CardLoader from '../../CardLoader';

import styles from './styles.module.css';

function CreatePlanBox({ setShowModal = () => { }, loading = false }) {
	return (
		<>
			{' '}
			{loading ? (
				<CardLoader />
			) : (
				<div className={styles.container}>
					<div className={styles.card}>
						<div className={styles.title}>Create a Plan</div>
						<IcMPlusInCircle
							className={styles.button}
							onClick={() => {
								setShowModal(true);
							}}
							width={40}
							height={40}
							fill="green"
						/>
					</div>
					<div className={styles.empty_component} />
				</div>
			)}
		</>
	);
}

export default CreatePlanBox;
