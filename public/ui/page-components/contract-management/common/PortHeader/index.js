import { Tooltip, cl } from '@cogoport/components';
import { IcMPortArrow } from '@cogoport/icons-react';

import { ICON_MAPPING, SERVICE_TYPE } from '../../constants';

import styles from './styles.module.css';

function PortHeader({
	originPort,
	destinationPort,
	originPortCode,
	destinationPortCode,
	originFullName,
	destinationFullName,
	service_type,
}) {
	const SERVICE_ICON = ICON_MAPPING[service_type] || null;
	const SERVICE_LABEL = SERVICE_TYPE[service_type] || null;
	return (
		<div className={styles.row}>
			<div className={styles.col} style={{ display: 'flex', alignItems: 'center' }}>
				<div className={cl`${styles[service_type]} ${styles.icon_wrap}`}>
					{SERVICE_ICON}
					<text style={{ color: '#fff', marginLeft: '8px' }}>
						{SERVICE_LABEL}
					</text>
				</div>
			</div>

			<div className={styles.col}>
				<div className={styles.port_container}>
					<div className={styles.port_detail_container}>
						<Tooltip placement="top" content={originFullName}>
							<div>
								<div className={styles.port_name_div}>{originPort}</div>
								<div className={styles.port_code_section}>{originPortCode}</div>
							</div>
						</Tooltip>
					</div>

					<div>
						<IcMPortArrow size={1.8} />
					</div>

					<div className={styles.port_detail_container}>
						<Tooltip placement="top" content={destinationFullName}>
							<div>
								<div className={styles.port_name_div}>{destinationPort}</div>
								<div className={styles.port_code_section}>{destinationPortCode}</div>
							</div>
						</Tooltip>
					</div>
				</div>
			</div>
		</div>
	);
}

export default PortHeader;
