import { IcMTransaction, IcMBookmark, IcMMarketing } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

import { SelectController } from '@/packages/forms';

function Location({
	type,
	value,
	fields,
	setLocation,
	location,
	mode,
	errors,
}) {
	if (!value) {
		return null;
	}

	const icon = {
		origin_fcl_freight      : 'ic-dryport',
		destination_fcl_freight : 'ic-port',
		origin_lcl_freight      : 'ic-dryport',
		destination_lcl_freight : 'ic-port',
		origin_air_freight      : 'ic-air',
		destination_air_freight : 'ic-air',
	};

	const IconText = type === 'origin' ? IcMBookmark : IcMMarketing;

	const handleChange = (obj) => {
		setLocation({ ...location, [type]: { ...obj, formName: value.formName } });
	};

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<IconText size={2.1} />
				<div className={styles.title}>{`${startCase(type)} of Shipment`}</div>
			</div>
			<div className={styles.main}>
				<IcMTransaction />
				<div style={{ marginLeft: 10, flexGrow: 1 }}>
					<SelectController
						{...fields[value.formName]}
						handleChange={handleChange}
						style={{}}
					/>
					{errors[origin.name] ? (
						<div className={styles.error}>{errors[value.formName]?.message}</div>
					) : null}
				</div>
			</div>
		</div>
	);
}

export default Location;
