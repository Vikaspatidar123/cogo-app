import { Checkbox, cl } from '@cogoport/components';
import {
	IcCAirCustoms,
	IcASurfaceFttRail,
	IcAOceanFclLcl,
	IcATransporters,
	IcCLclCustoms,
} from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function Service({
	service = '',
	selected = false,
	onChange = () => {},
	details = {},
}) {
	const mainServices = ['freight'];
	const MAPPING = {
		fcl_freight            : <IcAOceanFclLcl width={30} height={30} />,
		import_transportation  : <IcASurfaceFttRail width={30} height={30} />,
		export_fcl_customs     : <IcCAirCustoms width={30} height={30} />,
		import_fcl_customs     : <IcCAirCustoms width={30} height={30} />,
		import_haulage_freight : <IcATransporters width={30} height={30} />,
		export_haulage_freight : <IcATransporters width={30} height={30} />,
		export_transportation  : <IcASurfaceFttRail width={30} height={30} />,
		import_fcl_cfs         : <IcCLclCustoms width={30} height={30} />,
		export_fcl_cfs         : <IcCLclCustoms width={30} height={30} />,
		export_lcl_customs     : <IcCLclCustoms width={30} height={30} />,
		import_lcl_customs     : <IcCLclCustoms width={30} height={30} />,
		import_air_customs     : <IcCLclCustoms width={30} height={30} />,
		export_air_customs     : <IcCLclCustoms width={30} height={30} />,
	};

	const isMainService = mainServices.includes(service);
	const isHaulage = service === 'import_haulage_freight'
    || service === 'export_haulage_freight';

	const handleChange = () => {
		if (!isMainService) {
			onChange(service);
		}
	};

	return (
		<div
			className={
        selected ? cl`${styles.selected} ${styles.container}` : cl`${styles.container}`
      }
      // service={service}
			role="presentation"
			onClick={handleChange}
		>
			<div className={styles.service_name}>
				{MAPPING?.[service]}

				{details?.title || ''}
			</div>

			<Checkbox
				checked={selected}
				disabled={isMainService || isHaulage}
				themeType="white"
			/>
		</div>
	);
}

export default React.memo(Service);
