import { Button } from '@cogoport/components';
import { IcMPlusInCircle } from '@cogoport/icons-react';
import React from 'react';

import CardLoader from '../../CardLoader';

import styles from './styles.module.css';

function CreatePlanBox({ setShowModal = () => {}, loading = false }) {
	return (
		<>
			{' '}
			{loading ? (
				<CardLoader />
			) : (
				<div className={styles.container}>
					<div className={styles.card}>
						<div className={styles.title}>Create a Plan</div>
						<Button
							className="primary md"
							onClick={() => {
								setShowModal(true);
							}}
						>
							<IcMPlusInCircle />
						</Button>
					</div>
					<div className={styles.empty_component} />
				</div>
			)}
		</>
	);
}

export default CreatePlanBox;
