// import IconsMapping from '@cogo/product/contract-rates/common/IconsMapping';

import ContainerInfo from '../ContainerInfo';
import PortsInfo from '../PortsInfo';

import styles from './styles.module.css';

function Header({ data, source = '' }) {
	const {
		origin_location,
		destination_location,
		trip_type = '',
		service_type = '',
	} = data || {};

	const service = service_type.split('_');
	return (
		<div className={styles.container}>
			<div style={{ width: '108%', display: 'flex' }}>
				<div style={{ borderRight: '1px solid #F2F2F2', display: 'flex', flexDirection: 'column' }}>
					<div className={styles.icon_div}>
						{/* {IconsMapping[service_type]} */}
						<div className={styles.service_name}>{service[0]}</div>
					</div>
				</div>
				<div className={styles.styled_col}>
					<PortsInfo
						originPort={origin_location}
						trip={trip_type}
						destinationPort={destination_location}
						separator={(
							<img
								src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/union-2.svg"
								alt="union-icon"
								className="ports-direction-svg"
							/>
						)}
					/>
				</div>

				<div className={`${styles.col} ${styles.space_top}`}>
					<ContainerInfo data={data} source={source} />
				</div>
			</div>
		</div>
	);
}

export default Header;
