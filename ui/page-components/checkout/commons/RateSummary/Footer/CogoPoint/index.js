import { useState } from 'react';

import EditCogoPoints from './EditCogoPoints';
import styles from './styles.module.css';
import ViewCogoPoints from './ViewCogoPoints';

function CogoPoint({ cogopoint_data = {}, refetch }) {
	const [editPoints, setEditPoints] = useState(
		!cogopoint_data.redeemed_cogopoints?.cogopoints > 0,
	);

	return (
		cogopoint_data.max_redeemable_cogopoints?.cogopoints !== 0 && (
			<div className={styles.container}>
				<EditCogoPoints
					cogopoint_data={cogopoint_data}
					refetch={refetch}
					setEditPoints={setEditPoints}
					editPoints={editPoints}
				/>
				<ViewCogoPoints
					cogopoint_data={cogopoint_data}
					setEditPoints={setEditPoints}
					editPoints={editPoints}
				/>
			</div>
		)
	);
}

export default CogoPoint;
