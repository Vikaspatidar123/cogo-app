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
		<div className={cl`${styles.container} ${expired ? styles.disabled : styles.enabled}`}>

			<div className={styles.row}>
				<div className={cl`${styles.icon_container} ${styles[mapped.tag]}`}>
					{mapped.icon}
					<div>{mapped.tag}</div>
				</div>
				<div className={`${styles.portDetail}`}>
					<PortDetails data={data} />
				</div>
			</div>

			<div className={cl`${styles.row} ${styles.info}`}>
				<ContainerInfo data={data} />
				<BtnContainer data={data} />
			</div>
		</div>

	);
}

export default Card;
