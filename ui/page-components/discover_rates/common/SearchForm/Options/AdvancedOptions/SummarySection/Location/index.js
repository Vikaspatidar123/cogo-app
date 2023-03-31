import {
	IcMTransaction,
	IcMPortArrow,
	IcAFreeOnBoard,
	IcATransporters,
	IcADomesticAir,
} from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

import { AsyncSelectController } from '@/packages/forms';

function Location({
	type,
	value,
	fields,
	setLocation,
	location,
	control,
	mode,
	errors,
}) {
	if (!value) {
		return null;
	}
	const icon = {
		origin_fcl_freight      : IcAFreeOnBoard,
		destination_fcl_freight : IcATransporters,
		origin_lcl_freight      : IcAFreeOnBoard,
		destination_lcl_freight : IcATransporters,
		origin_air_freight      : IcADomesticAir,
		destination_air_freight : IcADomesticAir,
	};
	const IconText = type === 'origin' ? IcMPortArrow : IcMPortArrow;

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
				<IcAFreeOnBoard />
				<div style={{ marginLeft: 10, flexGrow: 1 }}>
					<AsyncSelectController
						{...fields.find((x) => x.name === value.formName)}
						handleChange={handleChange}
						style={{}}
						control={control}
						style={{
							width: '250px',
						}}
					/>
					{errors[origin.name] ? (
						<div className={styles.error}>
							{errors[value.formName]?.message}
						</div>
					) : null}
				</div>
			</div>
		</div>
	);
}

export default Location;
