import { cl } from '@cogoport/components';

import BtnContainer from './BtnContainer';
import ContainerInfo from './ContainerInfo';
import PortDetails from './PortDetails';
import styles from './styles.module.css';

import searchTypeMapping from '@/ui/page-components/new-dashboard/utils/searchTypeMapping';

function Card({ item }) {
	const { search_type = 'air_freight' } = item || {};

	const mapped = searchTypeMapping[search_type] || {};

	return (
		<div>
			<div className={styles.desktop_view}>
				<div className={cl`${styles.container}`}>
					<div className={styles.row}>
						<div className={cl`${styles.icon_container} ${styles[mapped?.cssLabel]}`}>
							<span className={styles.tag_icon}>{mapped.icon}</span>
							<div className={styles.tag_text}>{mapped.tag}</div>
						</div>
						<div className={`${styles.port_detail}`}>
							<PortDetails data={item} />
						</div>
					</div>

					<div className={cl`${styles.row} ${styles.info}`}>
						<div className={styles.container_info}>
							<ContainerInfo data={item} />
						</div>
						<div>
							<BtnContainer data={item} />
						</div>

					</div>
				</div>
			</div>
		</div>
	);
}
export default Card;
