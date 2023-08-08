import { Placeholder } from '@cogoport/components';
import { IcMPortArrow } from '@cogoport/icons-react';

import styles from './styles.module.css';

function Route({ originDetails, destinationDetails, index, loading }) {
	function LocationCard({
		name,
		port_code: portCode,
		display_name: displayName,
	}) {
		return (
			<div className={styles.location}>
				{loading ? (
					<Placeholder width="150px" height="37px" />
				) : (
					<>
						<div className={styles.name}>
							<div className={styles.port}>{name}</div>
							<div className={styles.code}>
								(
								{portCode}
								)
							</div>
						</div>
						<div className={styles.country}>{(displayName || '').split(',')[2]}</div>
					</>
				)}
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.index_list}>{index + 1}</div>
			<LocationCard {...originDetails} />
			<IcMPortArrow className={styles.styled_arrow} />
			<LocationCard {...destinationDetails} />
		</div>
	);
}

export default Route;
