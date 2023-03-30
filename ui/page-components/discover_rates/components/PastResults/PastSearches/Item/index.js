import { cl } from '@cogoport/components';

import ContainerInfo from '../../../../common/ContainerInfo';
import PortDetails from '../../../../common/PortDetails';
import SearchType from '../../../../common/SearchType';

import Status from './Status';
import styles from './styles.module.css';

function ReceivedRevert({ data, mobile }) {
	const className = `${mobile ? styles.mobile : ''}`;

	return (
		<div
			className={cl`${styles.container} ${
      	data.expired ? styles.disabled : styles.enabled
			}`}
		>
			<div className={styles.section}>
				<div className={cl`${styles[className]} ${styles.icon_section}`}>
					<SearchType
						search_type={data.search_type}
						mobile={mobile}
						width="90px"
					/>
				</div>
				<div className={cl`${styles[className]} ${styles.main}`}>
					<div className={cl`${styles[className]} ${styles.section}`}>
						<PortDetails data={data} mobile={mobile} />
						<div
							style={{
              	maxWidth: !mobile ? 180 : '',
							}}
						>
							<ContainerInfo detail={data} />
						</div>
					</div>
					{(mobile && <Status data={data} mobile={mobile} />) || null}
				</div>
				{(!mobile && <Status data={data} mobile={mobile} />) || null}
			</div>
		</div>
	);
}

export default ReceivedRevert;
