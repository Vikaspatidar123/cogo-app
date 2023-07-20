import { cl } from '@cogoport/components';
import React, { useMemo } from 'react';

import IconMapping from '../../constant/icon-mapping';
import getwidth from '../../utils/getWidth';

import PortPair from './PortPair';
import styles from './styles.module.css';

const mapping = { fcl_freight: 'FCL', lcl_freight: 'LCL', air_freight: 'AIR' };

const getErrorData = ({ totalCount = 0, errorKey = '' }) => {
	const errorMapping = {
		fcl_freight: `Your current total containers count is ${totalCount}. Total containers count should 
			 be greater than 50 .`,
		fcl_freight_min_count : 'Container count less than 1',
		lcl_freight           : 'Less than 50 cbm',
		air_freight           : 'Less than 50 kgs',
	};

	return errorMapping[errorKey];
};

const getEligibilityData = ({ watch = () => {} }) => {
	let totalCount = 0;

	(watch('search_rate_card_details') || []).forEach((item) => {
		if (item?.max_containers_count) { totalCount += Number(item?.max_containers_count); }
	});

	return { hasEligibleCount: totalCount >= 50, totalCount };
};

const getErrorsNumber = ({ errorArray = [], formData = [] }) => {
	let number = 0;
	formData.forEach(({ idx }) => {
		if (errorArray[idx]) number += 1;
	});

	return number;
};

function ErrorComponent({
	errors = [],
	formData = [],
	serviceType = '',
	watch = () => {},
}) {
	const errorsCount = getErrorsNumber({
		errorArray: errors?.search_rate_card_details || [],
		formData,
	});

	if (!errorsCount && serviceType !== 'fcl_freight') {
		return null;
	}

	if (serviceType === 'fcl_freight') {
		const { hasEligibleCount, totalCount } = getEligibilityData({
			errorArray: errors?.search_rate_card_details,
			watch,
		});

		const errorKey = hasEligibleCount && errorsCount ? 'fcl_freight_min_count' : serviceType;

		if (hasEligibleCount && !errorsCount) {
			return null;
		}

		return (
			<div className={cl`${styles.error} ${styles.port_pair_errors}`}>
				Not eligible
				<div className={styles.error_details}>
					(
					{getErrorData({ errorKey, totalCount })}
					)
				</div>
			</div>
		);
	}

	return (
		<div className={cl`${styles.error} ${styles.port_pair_errors}`}>
			{errorsCount}
			{' '}
			Not eligible
			<div className={styles.error_details}>
				(
				{getErrorData({ errorKey: serviceType })}
				)
			</div>
		</div>
	);
}

function FreightMap({
	formData,
	errors,
	fields,
	watch,
	control,
	serviceType = 'fcl_freight',
	portType = 'port',
}) {
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

							<ErrorComponent
								errors={errors}
								formData={formData}
								serviceType={serviceType}
								watch={watch}
							/>

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
