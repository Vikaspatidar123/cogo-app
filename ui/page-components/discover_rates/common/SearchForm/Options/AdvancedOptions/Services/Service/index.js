// import Icon from '@cogo/deprecated_legacy/icons/Icon';
import { Checkbox } from '@cogoport/components';
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
		fcl_freight            : 'ic-fcl',
		import_transportation  : 'ic-trailer',
		export_fcl_customs     : 'ic-customs',
		import_fcl_customs     : 'ic-customs',
		import_haulage_freight : 'ic-dryport',
		export_haulage_freight : 'ic-dryport',
		export_transportation  : 'ic-trailer',
		import_fcl_cfs         : 'ic-customs',
		export_fcl_cfs         : 'ic-customs',
		export_lcl_customs     : 'ic-customs',
		import_lcl_customs     : 'ic-customs',
		import_air_customs     : 'ic-customs',
		export_air_customs     : 'ic-customs',
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
			className={selected ? `${styles.selected}${styles.container}` : `${styles.container}`}
			// service={service}
			role="presentation"
			onClick={handleChange}
		>
			<div className={styles.service_name}>
				{/* <Icon
					type={MAPPING?.[service]}
					style={{ height: 30, width: 30, marginRight: 10 }}
				/> */}
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
