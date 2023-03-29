import { cl } from '@cogoport/components';
import React from 'react';

import ContainerInfo from '../../../../../common/ContainerInfo';
import PortDetails from '../../../../../common/PortDetails';
import SearchType from '../../../../../common/SearchType';

import QuickSearch from './QuickSearch';
import styles from './styles.module.css';

function Section({ data, mobile }) {
	const className = `${mobile ? 'mobile' : ''}`;

	return (
		<div className={styles.container}>
			<div className={cl`${styles[className]}${styles.icon_cection}`}>
				<SearchType search_type={data.search_type} mobile={mobile} />
			</div>
			<div className={cl`${styles[className]}${styles.content}`}>
				<div className={cl`${styles[className]}${styles.cox}`}>
					<PortDetails data={data} />
					<div style={{ maxWidth: !mobile ? 180 : '' }}>
						<ContainerInfo detail={data} />
					</div>
				</div>
				<div className={cl`${styles.column}${styles.box}`}>
					<QuickSearch
						data={data}
						mobile={mobile}
						extraParams={{
							importer_exporter_id        : data.importer_exporter_id,
							importer_exporter_branch_id : data?.importer_exporter_branch_id,
							user_id                     : data?.user_id,
						}}
					/>
				</div>
			</div>
		</div>
	);
}

export default Section;
