import { cl } from '@cogoport/components';

import ContainerInfo from '../../../../common/ContainerInfo';
import PortDetails from '../../../../common/PortDetails';
import SearchType from '../../../../common/SearchType';

import Status from './Status';
import styles from './styles.module.css';

function ReceivedRevert({ data, mobile }) {
	return (
		<div
			className={cl`${styles.container} ${data.expired ? styles.disabled : styles.enabled}`}
		>
			<div className={styles.section}>
				<div className={cl`${styles.icon_section} ${styles.mobile} `}>
					<SearchType
						search_type={data.search_type}
						width="90px"
					/>
				</div>
				<div className={cl`${styles.mobile} ${styles.main}`}>
					<div className={cl`${styles.mobile} ${styles.section}`}>
						<PortDetails data={data} />
						<div
							style={{ maxWidth: !mobile ? 180 : '' }}
						>
							<ContainerInfo detail={data} />
						</div>
					</div>
					<div className={styles.mobile_web}><Status data={data} /></div>
				</div>
				<div className={styles.web}>
					<Status data={data} />
				</div>
			</div>
		</div>
	);
}

export default ReceivedRevert;
