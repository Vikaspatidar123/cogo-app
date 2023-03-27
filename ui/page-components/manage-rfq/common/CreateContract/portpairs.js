import { cl } from '@cogoport/components';
import React, { useMemo } from 'react';

import IconMapping from '../../constant/icon-mapping';
import getwidth from '../../utils/getWidth';

import PortPair from './PortPair';
import styles from './styles.module.css';

const mapping = { fcl_freight: 'FCL', lcl_freight: 'LCL', air_freight: 'AIR' };

const errorMapping = {
	fcl_freight : 'Less than 50 container count',
	lcl_freight : 'Less than 50 cbm',
	air_freight : 'Less than 50 kgs',
};

function FreightMap({
	formData,
	errors,
	fields,
	watch,
	control,
	serviceType = 'fcl_freight',
	portType = 'port',
}) {
	const getErrorsNumber = (array) => {
		let number = 0;
		formData.forEach(({ idx }) => {
			if (array[idx]) number += 1;
		});

		return number;
	};

	return (
		<>
			<div className={styles.row}>
				<div className={styles.col} style={{ width: getwidth(8) }}>
					<div className={cl`${styles.subtitle} ${styles.port_pairs}`}>
						<div>{IconMapping[serviceType]}</div>
						<div className={styles.port_title}>
							<div>
								{mapping[serviceType]}
								{' '}
								Port Pairs(
								{formData.length}
								)
							</div>
							{getErrorsNumber(errors?.search_rate_card_details || []) ? (
								<div className={cl`${styles.error} ${styles.port_pair_errors}`}>
									{getErrorsNumber(errors?.search_rate_card_details || [])}
									{' '}
									Not eligible
									<div className={styles.error_details}>
										(
										{errorMapping[serviceType]}
										)
									</div>
								</div>
							) : null}
						</div>
					</div>
				</div>
			</div>
			<PortPair
				{...fields[3]}
				fields={fields}
				control={control}
				watch={watch}
				portType={portType}
				serviceType={serviceType}
				formData={formData}
				error={errors?.search_rate_card_details}
				key="details"
			/>
		</>
	);
}

function PortPairs({ formData, errors, fields, watch, control }) {
	const freightPairs = useMemo(() => {
		let fclPortPairs = [];
		let lclPortPairs = [];
		let airPortPairs = [];
		formData.forEach((itm, index) => {
			if (itm.service_type === 'fcl_freight') {
				fclPortPairs = [...fclPortPairs, { ...itm, idx: index }];
			}
			if (itm.service_type === 'lcl_freight') {
				lclPortPairs = [...lclPortPairs, { ...itm, idx: index }];
			}
			if (itm.service_type === 'air_freight') {
				airPortPairs = [...airPortPairs, { ...itm, idx: index }];
			}
		});
		return {
			fcl_freight : fclPortPairs,
			lcl_freight : lclPortPairs,
			air_freight : airPortPairs,
		};
	}, [formData]);

	return (
		<>
			{Object.keys(freightPairs || {}).map((itm) => (
				<div key={`${itm}`}>
					{(freightPairs?.[itm] || []).length > 0 ? (
						<FreightMap
							formData={freightPairs[itm]}
							errors={errors}
							fields={fields}
							control={control}
							watch={watch}
							serviceType={itm}
							portType={itm === 'air_freight' ? 'airport' : 'port'}
						/>
					) : null}
				</div>
			))}
		</>
	);
}

export default PortPairs;
