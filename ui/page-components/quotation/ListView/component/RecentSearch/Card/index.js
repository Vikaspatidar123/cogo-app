import { cl } from '@cogoport/components';

import searchTypeMapping from '../../../utils/searchTypeMapping';

import BtnContainer from './BtnContainer';
import ContainerInfo from './ContainerInfo';
import PortDetails from './PortDetails';
import styles from './styles.module.css';

function Card({ data }) {
	const { expired = false, search_type = 'air_freight' } = data || {};
	const mapped = searchTypeMapping[search_type];

	return (
		<>
			<div className={styles.mobile_view}>
				<div className={cl`${styles.container} ${expired ? styles.disabled : styles.enabled}`}>
					<div className={`${styles.port_details}`}>
						<PortDetails data={data} />
					</div>
					<div className={styles.container_info}>
						<ContainerInfo data={data} />
					</div>
					<div className={styles.tag}>
						<div className={styles.tags}>
							{mapped.icon}
							<p className={styles.tag_name}>{mapped.tag}</p>
						</div>
						<div>
							<BtnContainer data={data} />
						</div>
					</div>
				</div>

			</div>
			<div className={styles.desktop_view}>
				<div className={cl`${styles.container} ${expired ? styles.disabled : styles.enabled}`}>
					<div className={styles.row}>
						<div className={cl`${styles.icon_container} ${styles[mapped.cssLabel]}`}>
							<div className={styles.container2}>{mapped.icon}</div>
							<div className={styles.container2}>{mapped.tag}</div>
						</div>
						<div className={`${styles.port_detail}`}>
							<PortDetails data={data} />
						</div>
					</div>

					<div className={cl`${styles.row} ${styles.info}`}>
						<div className={styles.container2}>
							<ContainerInfo data={data} />
						</div>
						<div className={styles.container2}>
							<BtnContainer data={data} />
						</div>

					</div>
				</div>
			</div>
		</>

	);
}

export default Card;
