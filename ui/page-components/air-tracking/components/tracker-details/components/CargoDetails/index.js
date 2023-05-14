import { Placeholder } from '@cogoport/components';
import { IcMArrowBack, IcMArrowNext } from '@cogoport/icons-react';
import { useState } from 'react';

import styles from './styles.module.css';

function CargoDetails({ loading, trackerDetails }) {
	const { airway_bill_details = {} } = trackerDetails || {};
	const cargoList = [airway_bill_details];
	const [selected, setSelected] = useState(0);
	const handlePrevious = () => {
		if (selected > 0) setSelected(selected - 1);
	};
	const handleNext = () => {
		if (selected < cargoList.length - 1) setSelected(selected + 1);
	};
	const item = cargoList[0] || {};
	return (
		<div className={styles.card} key={item?.container_number}>
			{!loading
				? (
					<>
						<div className={styles.heading}>Cargo Details</div>
						{cargoList.length > 1 && (
							<div className="icons-container">
								<IcMArrowBack size={1} onClick={handlePrevious} />
								<IcMArrowNext size={1} onClick={handleNext} />
							</div>
						)}
						<div
							role="presentation"
							className={styles.dash_button}
						>
							<div className={styles.details}>
								<span className={styles.text_head}>weight:</span>
								<div>
									{cargoList[0]?.weight}
									{' '}
									Kg
								</div>
							</div>
							<div className={styles.details}>
								<span className={styles.text_head}>Piece:</span>
								<div>{cargoList[0]?.piece}</div>
							</div>
						</div>
					</>
				) : (<Placeholder height="50px" width="324px" margin="0px 0px 20px 0px" />)}
		</div>
	);
}

export default CargoDetails;
