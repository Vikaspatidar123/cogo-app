import { IcCCogoCoin } from '@cogoport/icons-react';

import styles from './styles.module.css';

function NewCogoPoint({ cogopoint_data }) {
	if (!cogopoint_data?.earnable_cogopoints?.cogopoints) {
		return null;
	}

	return (
		<div className={styles.container}>
			<div style={{ position: 'relative', width: 16, height: 16 }}>
				<IcCCogoCoin height={16} width={16} />
			</div>

			<div className={styles.points}>
				{cogopoint_data.earnable_cogopoints?.cogopoints}
			</div>
			<div className={styles.text}>
				CogoPoints will be added

			</div>
		</div>
	);
}

export default NewCogoPoint;
