import { Placeholder } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function CargoDetails({ loading, trackerDetails }) {
	const cargoDetails = trackerDetails?.commodity_details;

	return (
		<div className={styles.cargo_details}>
			{!loading
				? (
					<div
						role="presentation"
						className={styles.dash_button}
					>
						<div className={styles.heading}>Cargo Details</div>
						<div className={styles.details}>
							weight:
							<div>{cargoDetails?.weight}</div>
						</div>
						<div className={styles.details}>
							Piece:
							<div>{cargoDetails?.piece}</div>
						</div>
					</div>
				) : (<Placeholder height="50px" width="324px" margin="0px 0px 20px 0px" />)}
		</div>
	);
}

export default CargoDetails;
